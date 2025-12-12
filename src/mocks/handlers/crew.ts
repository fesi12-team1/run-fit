import { http, HttpResponse } from 'msw';
import { crews, memberships, sessions } from '../db';
import {
  errorResponse,
  getAuthenticatedUser,
  parseIdParam,
  path,
  successResponse,
} from '../utils';

interface CreateCrewRequest {
  name: string;
  description: string;
  city: string;
}

export const crewHandlers = [
  // 크루 생성
  http.post(path('/api/crews'), async ({ request }) => {
    const body = (await request.json()) as CreateCrewRequest;
    const { name, description, city } = body;

    if (!name || !description || !city) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '필수 입력값이 누락되었습니다.',
        }),
        { status: 400 }
      );
    }

    const newCrew = await crews.create({
      id: crews.all().length + 1,
      name,
      description,
      city,
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const data = {
      id: newCrew.id,
      name: newCrew.name,
      description: newCrew.description,
      city: newCrew.city,
      image: newCrew.image,
      createdAt: newCrew.createdAt,
    };

    return HttpResponse.json(successResponse(data), { status: 201 });
  }),

  // 크루 목록 조회
  http.get(path('/api/crews'), ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const url = new URL(request.url);

    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);
    const city = url.searchParams.get('city'); // 복수 선택 가능
    const keyword = url.searchParams.get('keyword') || '';
    const sort = url.searchParams.get('sort') || 'createdAtDesc'; // createdAtDesc, lastSessionDesc, memberCountDesc, nameAsc, nameDesc

    let filteredCrews = crews.all();

    if (city) {
      filteredCrews = filteredCrews.filter((c) => c.city === city);
    }

    if (keyword) {
      filteredCrews = filteredCrews.filter((c) =>
        c.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // 정렬
    if (sort === 'createdAtDesc') {
      filteredCrews.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (sort === 'lastSessionDesc') {
      // 마지막 세션 날짜 기준 정렬
      filteredCrews.sort((a, b) => {
        // 각 크루의 세션들 가져오기
        const aCrewSessions = sessions.all().filter((s) => s.crewId === a.id);
        const bCrewSessions = sessions.all().filter((s) => s.crewId === b.id);

        // 가장 최근 세션의 createdAt 찾기
        const aLatestSession =
          aCrewSessions.length > 0
            ? Math.max(
                ...aCrewSessions.map((s) => new Date(s.createdAt).getTime())
              )
            : 0;
        const bLatestSession =
          bCrewSessions.length > 0
            ? Math.max(
                ...bCrewSessions.map((s) => new Date(s.createdAt).getTime())
              )
            : 0;

        return bLatestSession - aLatestSession;
      });
    }

    if (sort === 'memberCountDesc') {
      // 멤버 수 기준 정렬
      filteredCrews.sort((a, b) => {
        const aMemberCount = memberships
          .all()
          .filter((m) => m.crewId === a.id).length;
        const bMemberCount = memberships
          .all()
          .filter((m) => m.crewId === b.id).length;
        return bMemberCount - aMemberCount;
      });
    }

    if (sort === 'nameAsc') {
      filteredCrews.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === 'nameDesc') {
      filteredCrews.sort((a, b) => b.name.localeCompare(a.name));
    }

    // 무한스크롤
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedCrews = filteredCrews.slice(startIndex, endIndex);
    const hasNext = endIndex < filteredCrews.length;

    const data = paginatedCrews.map((crew) => {
      const memberCount = memberships
        .all()
        .filter((m) => m.crewId === crew.id).length;

      return {
        id: crew.id,
        name: crew.name,
        description: crew.description,
        city: crew.city,
        image: crew.image,
        memberCount,
        createdAt: crew.createdAt,
      };
    });

    return HttpResponse.json(
      successResponse({
        data: data,
        hasNext: hasNext,
      }),
      { status: 200 }
    );
  }),

  // 크루 상세 조회
  http.get(path('/api/crews/:id'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        {
          status: 404,
        }
      );
    }

    const data = {
      id: crew.id,
      name: crew.name,
      description: crew.description,
      city: crew.city,
      image: crew.image,
      createdAt: crew.createdAt,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 멤버 목록 조회
  http.get(path('/api/crews/:id/members'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        { status: 404 }
      );
    }

    const data = {
      leader: {
        userId: 1,
        name: '홍길동',
        profileImage: 'https://.../leader.jpg',
        role: 'LEADER',
        joinedAt: '2025-11-10T12:00:00+09:00',
      },
      staff: [
        {
          userId: 2,
          name: '김운영',
          profileImage: null,
          role: 'STAFF',
          joinedAt: '2025-11-15T12:00:00+09:00',
        },
      ],
      members: [
        {
          userId: 3,
          name: '이멤버',
          profileImage: 'https://.../member.jpg',
          role: 'MEMBER',
          joinedAt: '2025-11-20T12:00:00+09:00',
        },
      ],
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 멤버 역할별 카운트 조회
  http.get(path('/api/crews/:id/members/count'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        { status: 404 }
      );
    }

    const data = {
      leaderCount: 1,
      staffCount: 3,
      memberCount: 24,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 내 특정 사용자 역할 조회
  http.get(path('/api/crews/:crewId/members/:userId/role'), ({ params }) => {
    const crewId = parseIdParam(params.crewId);
    const userId = parseIdParam(params.userId);

    if (crewId === null || userId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const data = {
      userId: 3,
      role: 'MEMBER',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루장 변경 (리더 위임)
  http.patch(path('/api/crews/:crewId/leader'), async ({ params, request }) => {
    const crewId = parseIdParam(params.crewId);
    const body = (await request.json()) as { newLeaderId: number };
    const newLeaderId = body.newLeaderId;

    if (crewId === null || !newLeaderId) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));
    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        { status: 404 }
      );
    }

    const data = { oldLeaderId: 1, newLeaderId: 2 };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 운영진(Staff) 등록/해제
  http.patch(
    path('/api/crews/:crewId/members/:userId/role'),
    async ({ params, request }) => {
      const userId = parseIdParam(params.userId);
      const body = (await request.json()) as { role: 'STAFF' | 'MEMBER' };
      const newRole = body.role;

      const data = {
        userId: userId,
        previousRole: 'MEMBER',
        newRole: newRole,
        message: '운영진으로 등록되었습니다.',
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }
  ),

  // 크루 멤버 강퇴
  http.delete(path('/api/crews/:crewId/members/:userId'), ({ params }) => {
    const crewId = parseIdParam(params.crewId);
    const userId = parseIdParam(params.userId);

    if (crewId === null || userId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.',
        }),
        { status: 400 }
      );
    }
    const data = {
      message: '해당 사용자가 크루에서 제거되었습니다.',
      userId: 5,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 정보 수정
  http.patch(path('/api/crews/:id'), async ({ params, request }) => {
    const crewId = parseIdParam(params.id);
    const body = (await request.json()) as Partial<CreateCrewRequest>;

    if (crewId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID입니다.',
        }),
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        { status: 404 }
      );
    }

    crews.update((q) => q.where({ id: crewId }), {
      data(crew) {
        if (body.name !== undefined) crew.name = body.name;
        if (body.description !== undefined) crew.description = body.description;
        if (body.city !== undefined) crew.city = body.city;
        crew.updatedAt = new Date().toISOString();
      },
    });

    const updatedCrew = crews.findFirst((q) => q.where({ id: crewId }));

    const data = {
      id: updatedCrew!.id,
      name: updatedCrew!.name,
      description: updatedCrew!.description,
      city: updatedCrew!.city,
      image: updatedCrew!.image,
      createdAt: updatedCrew!.createdAt,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 삭제
  http.delete(path('/api/crews/:id'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        errorResponse({
          code: 'BAD_REQUEST',
          message: '유효하지 않은 크루 ID입니다.',
        }),
        { status: 400 }
      );
    }
    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        errorResponse({
          code: 'NOT_FOUND',
          message: '크루가 존재하지 않습니다.',
        }),
        { status: 404 }
      );
    }

    crews.delete((q) => q.where({ id: crewId }));

    const data = {
      message: '크루가 삭제되었습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),
];
