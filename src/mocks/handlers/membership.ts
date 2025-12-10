import { http, HttpResponse } from 'msw';
import { crews, memberships, users } from '../db';
import { path } from '../utils';

export const membershipHandlers = [
  // 크루 가입
  http.post(path('/api/crews/:crewId/join'), ({ request, params }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = authHeader.replace('Bearer ', '');

    const { crewId } = params;
    const crew = crews.findFirst((q) => q.where({ id: Number(crewId) }));
    const user = users.findFirst((q) => q.where({ id: Number(userId) }));

    if (!crew) {
      return HttpResponse.json({ message: 'Crew not found' }, { status: 404 });
    }

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    memberships.create({
      id: 999,
      crew: crew,
      user: user,
      role: 'MEMBER',
      joinedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return HttpResponse.json(
      {
        message: `Successfully joined crew with ID: ${crewId}`,
      },
      { status: 200 }
    );
  }),

  // 크루 탈퇴
  http.post(path('/api/crews/:crewId/leave'), ({ request, params }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = authHeader.replace('Bearer ', '');

    const { crewId } = params;
    const membership = memberships.findFirst((q) =>
      q.where({
        crew: { id: Number(crewId) },
        user: { id: Number(userId) },
      })
    );

    if (!membership) {
      return HttpResponse.json(
        { message: 'Membership not found' },
        { status: 404 }
      );
    }

    memberships.delete((q) => q.where({ id: membership.id }));

    return HttpResponse.json(
      {
        message: `Successfully left crew with ID: ${crewId}`,
      },
      { status: 200 }
    );
  }),
];
