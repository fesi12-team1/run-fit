import { http, HttpResponse } from 'msw';
import { crews, memberships, users } from '../db';
import { path, successResponse } from '../utils';

export const membershipHandlers = [
  // 크루 가입
  http.post(path('/api/crews/:crewId/join'), ({ request, params }) => {
    const data = {
      crewId: 3,
      userId: 1,
      role: 'MEMBER',
      joinedAt: '2025-11-30T12:00:00+09:00',
    };

    return HttpResponse.json(successResponse(data), { status: 201 });
  }),

  // 크루 탈퇴
  http.post(path('/api/crews/:crewId/leave'), ({ request, params }) => {
    const data = {
      message: '크루를 탈퇴했습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),
];
