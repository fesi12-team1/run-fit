import { http, HttpResponse } from 'msw';
import { AuthMode, requireAuth } from '../core/auth';
import type { PathFn } from '../core/path';
import { faker, reviews, sessions } from '../data';
import { parseIdParam, successResponse } from '../utils';

export function createReviewHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 세션 리뷰 목록 조회
    http.get(p('/api/sessions/:id/reviews'), ({ params, request }) => {
      const sessionId = parseIdParam(params.id);
      const url = new URL(request.url);

      const page = parseInt(url.searchParams.get('page') || '0', 10);
      const size = parseInt(url.searchParams.get('size') || '10', 10);

      let sessionReviews = reviews.filter(
        (review) => review.sessionId === sessionId
      );

      const totalElements = sessionReviews.length;
      const totalPages = Math.ceil(totalElements / size);
      const hasNext = page < totalPages - 1;
      const hasPrevious = page > 0;

      const startIndex = page * size;
      const endIndex = startIndex + size;
      sessionReviews = sessionReviews.slice(startIndex, endIndex);

      const content = sessionReviews.map((review, i) => ({
        id: review.id,
        sessionId: review.sessionId,
        crewId: i,
        userId: i,
        userName: faker.person.lastName(),
        userImage: faker.image.avatar(),
        description: review.description,
        ranks: review.ranks,
        image: review.image,
        createdAt: review.createdAt,
      }));

      const data = {
        content,
        page,
        size,
        totalElements,
        totalPages,
        hasNext,
        hasPrevious,
      };

      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 세션 리뷰 작성
    http.post(
      p('/api/sessions/:id/reviews'),
      requireAuth(authMode, async ({ request }) => {
        const reqBody = (await request.json()) as {
          description: string;
          ranks: number;
          image?: string;
        };

        const data = {
          id: 0,
          sessionId: 0,
          crewId: 0,
          userId: 0,
          userName: faker.person.lastName(),
          userImage: faker.image.avatar(),
          description: faker.lorem.paragraph(),
          ranks: reqBody.ranks || 4,
          image: reqBody.image || 'string',
          createdAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 201 });
      })
    ),

    // 리뷰 삭제
    http.delete(
      p('/api/reviews/:reviewId'),
      requireAuth(authMode, async () => {
        const data = {
          message: '리뷰가 삭제되었습니다.',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 크루 리뷰 목록 조회
    http.get(
      p('/api/crews/:id/reviews'),
      requireAuth(authMode, ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get('page') || '0', 10);
        const size = parseInt(url.searchParams.get('size') || '10', 10);

        let crewReviews = reviews;

        const totalElements = crewReviews.length;
        const totalPages = Math.ceil(totalElements / size);
        const hasNext = page < totalPages - 1;
        const hasPrevious = page > 0;

        const startIndex = page * size;
        const endIndex = startIndex + size;
        crewReviews = crewReviews.slice(startIndex, endIndex);

        const content = crewReviews.map((review, i) => {
          const session = sessions.find((s) => s.id === review.sessionId);
          return {
            id: review.id,
            sessionId: review.sessionId,
            sessionName: session ? session.name : 'Unknown Session',
            crewId: i,
            userId: review.userId,
            userName: faker.person.lastName(),
            userImage: faker.image.avatar(),
            description: review.description,
            ranks: review.ranks,
            image: review.image,
            createdAt: review.createdAt,
          };
        });

        const data = {
          content,
          page,
          size,
          totalElements,
          totalPages,
          hasNext,
          hasPrevious,
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 내가 작성한 리뷰 목록
    http.get(
      p('/api/user/me/reviews'),
      requireAuth(authMode, ({ request }) => {
        const url = new URL(request.url);

        const page = parseInt(url.searchParams.get('page') || '0', 10);
        const size = parseInt(url.searchParams.get('size') || '10', 10);

        let crewReviews = reviews;

        const totalElements = crewReviews.length;
        const totalPages = Math.ceil(totalElements / size);
        const hasNext = page < totalPages - 1;
        const hasPrevious = page > 0;

        const startIndex = page * size;
        const endIndex = startIndex + size;
        crewReviews = crewReviews.slice(startIndex, endIndex);

        const content = crewReviews.map((review, i) => {
          const session = sessions.find((s) => s.id === review.sessionId);
          return {
            id: review.id,
            sessionId: review.sessionId,
            sessionName: session ? session.name : 'Unknown Session',
            crewId: i,
            userId: 1,
            userName: faker.person.lastName(),
            userImage: faker.image.avatar(),
            description: review.description,
            ranks: review.ranks,
            image: review.image,
            createdAt: review.createdAt,
          };
        });

        const data = {
          content,
          page,
          size,
          totalElements,
          totalPages,
          hasNext,
          hasPrevious,
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),
  ];
}
