import { http, HttpResponse } from 'msw';
import {
  errorResponse,
  getAuthenticatedUser,
  path,
  successResponse,
} from '../utils';

export const userHandlers = [
  // 내 정보 조회
  http.get(path('/api/user'), ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Crew not found' }),
        { status: 404 }
      );
    }

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image || null,
      introduction: user.introduction || null,
      city: user.city || null,
      pace: user.pace || null,
      styles: user.styles || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 내 정보 수정
  http.patch(path('/api/user'), async ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Crew not found' }),
        { status: 404 }
      );
    }

    const data = {
      id: 1,
      email: 'user@example.com',
      name: '홍길동',
      image: 'https://.../new-profile.jpg',
      introduction: '10K 완주가 목표입니다.',
      city: '서울',
      pace: 420,
      styles: ['대회 준비 러닝', '아침 러닝'],
      createdAt: '2025-11-01T12:00:00+09:00',
      updatedAt: '2025-11-30T12:00:00+09:00',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 특정 유저 정보 조회
  http.get(path('/api/users/:id'), ({ request, params }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Crew not found' }),
        { status: 404 }
      );
    }

    if (!params.id || typeof params.id !== 'string') {
      return HttpResponse.json(
        errorResponse({ code: 'INVALID_ID', message: 'Invalid user ID' }),
        { status: 400 }
      );
    }

    const ret = {
      id: user.id,
      name: user.name,
      image: user.image || null,
      introduction: user.introduction || null,
      city: user.city || null,
      pace: user.pace || null,
      styles: user.styles || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return HttpResponse.json(ret, { status: 200 });
  }),
];
