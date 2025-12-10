import { http, HttpResponse } from 'msw';
import { crews, memberships } from '../db';
import { parseIdParam, path } from '../utils';

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
        { message: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const newCrew = crews.create({
      id: crews.all().length + 1,
      name,
      description,
      city,
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return HttpResponse.json(newCrew, { status: 201 });
  }),

  // 크루 목록 조회
  http.get(path('/api/crews'), () => {
    const allCrews = crews.all();

    const responseBody = allCrews.map((crew) => {
      const memberCount = memberships
        .all()
        .filter((m) => m.crew === crew).length;

      return {
        id: crew.id,
        name: crew.name,
        description: crew.description,
        city: crew.city,
        image: crew.image,
        createdAt: crew.createdAt,
        memberCount,
      };
    });

    return HttpResponse.json(responseBody);
  }),

  // 크루 상세 조회
  http.get(path('/api/crews/:id'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID입니다.' },
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    const responseBody = {
      id: crew.id,
      name: crew.name,
      description: crew.description,
      city: crew.city,
      image: crew.image,
      createdAt: crew.createdAt,
    };

    return HttpResponse.json(responseBody);
  }),

  // 크루 멤버 목록 조회
  http.get(path('/api/crews/:id/members'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID입니다.' },
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    const crewMemberships = memberships
      .all()
      .filter((m) => m.crew.id === crewId);

    const responseBody = crewMemberships.map((membership) => ({
      id: membership.user.id,
      username: membership.user.name,
      role: membership.role,
      joinedAt: membership.joinedAt,
    }));

    return HttpResponse.json(responseBody);
  }),

  // 크루 멤버 역할별 카운트 조회
  http.get(path('/api/crews/:id/members/count'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID입니다.' },
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    const crewMemberships = memberships
      .all()
      .filter((m) => m.crew.id === crewId);

    const roleCounts = crewMemberships.reduce(
      (acc, membership) => {
        if (membership.role === 'LEADER') {
          acc.leaders += 1;
        } else if (membership.role === 'MEMBER') {
          acc.members += 1;
        }
        return acc;
      },
      { leaders: 0, members: 0 }
    );

    return HttpResponse.json(roleCounts);
  }),

  // 크루 내 특정 사용자 역할 조회
  http.get(path('/api/crews/:crewId/members/:userId/role'), ({ params }) => {
    const crewId = parseIdParam(params.crewId);
    const userId = parseIdParam(params.userId);

    if (crewId === null || userId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.' },
        { status: 400 }
      );
    }
    const membership = memberships.findFirst((q) =>
      q.where({
        crew: { id: crewId },
        user: { id: userId },
      })
    );

    if (!membership) {
      return HttpResponse.json(
        { message: '해당 사용자는 크루의 멤버가 아닙니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ role: membership.role });
  }),

  // 크루장 변경 (리더 위임)
  http.patch(path('/api/crews/:crewId/leader'), async ({ params, request }) => {
    const crewId = parseIdParam(params.crewId);
    const body = (await request.json()) as { newLeaderId: number };
    const newLeaderId = body.newLeaderId;

    if (crewId === null || !newLeaderId) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.' },
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));
    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    const newLeaderMembership = memberships.findFirst((q) =>
      q.where({
        crew: { id: crewId },
        user: { id: newLeaderId },
      })
    );

    if (!newLeaderMembership) {
      return HttpResponse.json(
        { message: '해당 사용자는 크루의 멤버가 아닙니다.' },
        { status: 404 }
      );
    }

    const currentLeaderMembership = memberships.findFirst((q) =>
      q.where({
        crew: { id: crewId },
        role: 'LEADER',
      })
    );

    if (currentLeaderMembership) {
      memberships.update((q) => q.where({ id: currentLeaderMembership.id }), {
        data(membership) {
          membership.role = 'MEMBER';
        },
      });

      memberships.update(
        (q) => q.where({ user: { id: newLeaderMembership.id } }),
        {
          data(membership) {
            membership.role = 'LEADER';
          },
        }
      );
    }

    return HttpResponse.json({
      message: '크루장이 성공적으로 변경되었습니다.',
    });
  }),

  // 운영진(Staff) 등록/해제
  http.patch(
    path('/api/crews/:crewId/members/:userId/role'),
    async ({ params, request }) => {
      const crewId = parseIdParam(params.crewId);
      const userId = parseIdParam(params.userId);
      const body = (await request.json()) as { role: 'STAFF' | 'MEMBER' };
      const newRole = body.role;

      if (crewId === null || userId === null || !newRole) {
        return HttpResponse.json(
          { message: '유효하지 않은 크루 ID, 사용자 ID 또는 역할입니다.' },
          { status: 400 }
        );
      }

      const membership = memberships.findFirst((q) =>
        q.where({
          crew: { id: crewId },
          user: { id: userId },
        })
      );

      if (!membership) {
        return HttpResponse.json(
          { message: '해당 사용자는 크루의 멤버가 아닙니다.' },
          { status: 404 }
        );
      }

      memberships.update((q) => q.where({ id: membership.id }), {
        data(membership) {
          membership.role = newRole;
        },
      });

      return HttpResponse.json({
        message: '멤버 역할이 성공적으로 변경되었습니다.',
      });
    }
  ),

  // 크루 멤버 강퇴
  http.delete(path('/api/crews/:crewId/members/:userId'), ({ params }) => {
    const crewId = parseIdParam(params.crewId);
    const userId = parseIdParam(params.userId);

    if (crewId === null || userId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID 또는 사용자 ID입니다.' },
        { status: 400 }
      );
    }

    const membership = memberships.findFirst((q) =>
      q.where({
        crew: { id: crewId },
        user: { id: userId },
      })
    );

    if (!membership) {
      return HttpResponse.json(
        { message: '해당 사용자는 크루의 멤버가 아닙니다.' },
        { status: 404 }
      );
    }

    memberships.delete((q) => q.where({ id: membership.id }));

    return HttpResponse.json({
      message: '멤버가 성공적으로 강퇴되었습니다.',
    });
  }),

  // 크루 정보 수정
  http.patch(path('/api/crews/:id'), async ({ params, request }) => {
    const crewId = parseIdParam(params.id);
    const body = (await request.json()) as Partial<CreateCrewRequest>;

    if (crewId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID입니다.' },
        { status: 400 }
      );
    }

    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    crews.update((q) => q.where({ id: crewId }), {
      data(crew) {
        if (body.name !== undefined) crew.name = body.name;
        if (body.description !== undefined) crew.description = body.description;
        if (body.city !== undefined) crew.city = body.city;
        crew.updatedAt = new Date();
      },
    });

    const updatedCrew = crews.findFirst((q) => q.where({ id: crewId }));

    return HttpResponse.json(updatedCrew);
  }),

  // 크루 삭제
  http.delete(path('/api/crews/:id'), ({ params }) => {
    const crewId = parseIdParam(params.id);

    if (crewId === null) {
      return HttpResponse.json(
        { message: '유효하지 않은 크루 ID입니다.' },
        { status: 400 }
      );
    }
    const crew = crews.findFirst((q) => q.where({ id: crewId }));

    if (!crew) {
      return HttpResponse.json(
        { message: '크루가 존재하지 않습니다.' },
        { status: 404 }
      );
    }

    crews.delete((q) => q.where({ id: crewId }));

    return HttpResponse.json({ message: '크루가 성공적으로 삭제되었습니다.' });
  }),
];
