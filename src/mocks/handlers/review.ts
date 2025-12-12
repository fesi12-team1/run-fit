import { http, HttpResponse } from 'msw';
import { crews, memberships, reviews, sessions, users } from '../db';
import {
  errorResponse,
  getAuthenticatedUser,
  parseIdParam,
  path,
  successResponse,
} from '../utils';

export const reviewHandlers = [
  // 세션 리뷰 목록 조회
  http.get(path('/api/sessions/:id/reviews'), ({ params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    const data = {
      content: [
        {
          id: 10,
          sessionId: 12,
          crewId: 3,
          userId: 1,
          userName: '홍길동',
          userImage: 'https://.../profile.jpg',
          description: '분위기가 좋았어요!',
          ranks: 5,
          image: 'https://.../review1.jpg',
          createdAt: '2025-11-20T12:00:00+09:00',
        },
      ],
      page: 0,
      size: 10,
      totalElements: 5,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 세션 리뷰 작성
  http.post(path('/api/sessions/:id/reviews'), async ({ request, params }) => {
    const sessionId = Number(params.id);
    const session = sessions.findFirst((q) => q.where({ id: sessionId }));

    if (!session) {
      return HttpResponse.json(
        { message: 'Session not found' },
        { status: 404 }
      );
    }

    const reqBody = (await request.json()) as {
      description: string;
      ranks: number;
      image?: string;
    };

    const data = {
      success: true,
      data: {
        id: 10,
        sessionId: 12,
        crewId: 3,
        userId: 1,
        description: reqBody.description,
        ranks: reqBody.ranks,
        image: reqBody.image,
        createdAt: Date.now().toString(),
      },
      error: null,
    };

    return HttpResponse.json(successResponse(data), { status: 201 });
  }),

  // 리뷰 삭제
  http.delete(path('/api/reviews'), async ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const body = (await request.json()) as {
      reviewId: number;
    };

    const membership = memberships.findFirst((q) =>
      q.where({ userId: Number(user.id) })
    );

    if (!membership) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Membership not found' }),
        { status: 404 }
      );
    }

    const review = reviews.findFirst((q) =>
      q.where({
        id: body.reviewId,
      })
    );

    if (!review) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Review not found' }),
        { status: 404 }
      );
    }

    reviews.delete((q) => q.where({ id: review.id }));

    const data = {
      message: '리뷰가 삭제되었습니다.',
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 크루 리뷰 목록 조회
  http.get(path('/api/crews/:id/reviews'), ({ params }) => {
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
      content: [
        {
          id: 10,
          sessionId: 12,
          sessionName: '한강 야간 러닝',
          crewId: 3,
          userId: 1,
          userName: '홍길동',
          userImage: 'https://.../profile.jpg',
          description: '분위기가 좋았어요!',
          ranks: 5,
          image: 'https://.../review1.jpg',
          createdAt: '2025-11-20T12:00:00+09:00',
        },
      ],
      page: 0,
      size: 10,
      totalElements: 25,
      totalPages: 3,
      hasNext: true,
      hasPrevious: false,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),

  // 내가 작성한 리뷰 목록
  http.get(path('/api/user/me/reviews'), ({ request }) => {
    const user = getAuthenticatedUser(request);

    if (!user) {
      return HttpResponse.json(
        errorResponse({ code: 'NOT_FOUND', message: 'Crew not found' }),
        { status: 404 }
      );
    }

    const data = {
      content: [
        {
          id: 10,
          sessionId: 12,
          crewId: 3,
          userId: 1,
          userName: '홍길동',
          userImage: 'https://.../profile.jpg',
          description: '좋은 분위기에서 즐겁게 뛰었습니다.',
          ranks: 5,
          image: 'https://.../review1.jpg',
          createdAt: '2025-11-20T12:00:00+09:00',
        },
      ],
      page: 0,
      size: 4,
      totalElements: 12,
      totalPages: 3,
      hasNext: true,
      hasPrevious: false,
    };

    return HttpResponse.json(successResponse(data), { status: 200 });
  }),
];
