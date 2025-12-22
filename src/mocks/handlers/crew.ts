import { http, HttpResponse } from 'msw';
import { requireAuth, type AuthMode } from '../core/auth';
import type { PathFn } from '../core/path';
import { crews, faker } from '../data';
import { parseIdParam, successResponse } from '../utils';

interface CreateCrewRequest {
  name: string;
  description: string;
  city: string;
  image?: string | null;
}

export function createCrewHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 크루 생성
    http.post(
      p('/api/crews'),
      requireAuth(authMode, async ({ request }) => {
        const reqBody = (await request.json()) as CreateCrewRequest;
        const { name, description, city, image } = reqBody;

        const data = {
          id: 1,
          name: name,
          description: description,
          city: city,
          image: image ?? null,
          createdAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 201 });
      })
    ),

    // 크루 목록 조회
    http.get(p('/api/crews'), ({ request }) => {
      const url = new URL(request.url);

      const page = parseInt(url.searchParams.get('page') || '0', 10);
      const size = parseInt(url.searchParams.get('size') || '20', 10);
      const city = url.searchParams.get('city'); // 복수 선택 가능
      const keyword = url.searchParams.get('keyword') || '';
      const sort = url.searchParams.get('sort') || 'createdAtDesc'; // createdAtDesc, lastSessionDesc, memberCountDesc, nameAsc, nameDesc

      let filteredCrews = [...crews];

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
      }

      if (sort === 'memberCountDesc') {
        // 멤버 수 기준 정렬
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

      const content = paginatedCrews.map((crew) => {
        return {
          id: crew.id,
          name: crew.name,
          description: crew.description,
          city: crew.city,
          image: crew.image,
          memberCount: faker.number.int({ min: 2, max: 100 }),
          createdAt: crew.createdAt,
        };
      });

      const data = {
        content: content,
        hasNext: hasNext,
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 크루 상세 조회
    http.get(p('/api/crews/:id'), ({ params }) => {
      const id = parseIdParam(params.id);

      const data = {
        id: id,
        name: faker.company.name() + ' 러닝 크루',
        description: faker.lorem.paragraph(),
        city: '서울',
        image: faker.image.avatar(),
        memberCount: faker.number.int({ min: 2, max: 100 }),
        createdAt: new Date().toISOString(),
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 크루 멤버 목록 조회
    http.get(p('/api/crews/:id/members'), () => {
      const data = {
        members: [
          {
            userId: 1,
            name: '일멤버',
            profileImage: faker.image.avatar(),
            role: 'LEADER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-11-20T12:00:00+09:00',
          },
          {
            userId: 2,
            name: '이멤버',
            profileImage: faker.image.avatar(),
            role: 'STAFF',
            introduction: faker.lorem.sentence(),

            joinedAt: '2025-11-20T12:00:00+09:00',
          },
          {
            userId: 3,
            name: '삼멤버',
            profileImage: faker.image.avatar(),
            role: 'MEMBER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-11-20T12:00:00+09:00',
          },
          {
            userId: 4,
            name: '사멤버',
            profileImage: faker.image.avatar(),
            role: 'MEMBER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-11-20T12:00:00+09:00',
          },
          {
            userId: 5,
            name: '오멤버',
            profileImage: faker.image.avatar(),
            role: 'MEMBER',
            introduction: faker.lorem.sentence(),
            joinedAt: '2025-11-20T12:00:00+09:00',
          },
        ],
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 크루 멤버 역할별 카운트 조회
    http.get(p('/api/crews/:id/members/count'), () => {
      const data = {
        leaderCount: 1,
        staffCount: 3,
        memberCount: 24,
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 크루 내 특정 사용자 역할 조회
    http.get(p('/api/crews/:crewId/members/:userId/role'), ({ params }) => {
      const userId = parseIdParam(params.userId);

      const data = {
        userId: userId,
        role: faker.helpers.arrayElement(['LEADER', 'STAFF', 'MEMBER']),
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 크루장 변경 (리더 위임)
    http.patch(
      p('/api/crews/:crewId/leader'),
      requireAuth(authMode, async ({ request }) => {
        const body = (await request.json()) as { newLeaderId: number };
        const newLeaderId = body.newLeaderId;

        const data = { oldLeaderId: 1, newLeaderId: newLeaderId };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 운영진(Staff) 등록/해제
    http.patch(
      p('/api/crews/:crewId/members/:userId/role'),
      requireAuth(authMode, async ({ params, request }) => {
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
      })
    ),

    // 크루 멤버 강퇴
    http.delete(
      p('/api/crews/:crewId/members/:userId'),
      requireAuth(authMode, ({ params }) => {
        const userId = parseIdParam(params.userId);

        const data = {
          message: '해당 사용자가 크루에서 제거되었습니다.',
          userId: userId,
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 크루 정보 수정
    http.patch(
      p('/api/crews/:id'),
      requireAuth(authMode, async ({ params, request }) => {
        const crewId = parseIdParam(params.id);
        const body = (await request.json()) as Partial<CreateCrewRequest>;

        const data = {
          id: crewId!,
          name: body.name || '기존 크루 이름',
          description: body.description || '기존 크루 설명',
          city: body.city || '기존 크루 도시',
          image: body.image || null,
          createdAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 크루 삭제
    http.delete(
      p('/api/crews/:id'),
      requireAuth(authMode, () => {
        const data = {
          message: '크루가 삭제되었습니다.',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 크루 가입
    http.post(
      p('/api/crews/:crewId/join'),
      requireAuth(authMode, () => {
        const data = {
          crewId: 1,
          userId: 1,
          role: 'MEMBER',
          joinedAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 201 });
      })
    ),

    // 크루 탈퇴
    http.post(
      p('/api/crews/:crewId/leave'),
      requireAuth(authMode, () => {
        const data = {
          message: '크루를 탈퇴했습니다.',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),
  ];
}
