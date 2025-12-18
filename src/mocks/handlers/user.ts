import { http, HttpResponse } from 'msw';
import { type UpdateMyProfileRequestBody } from '@/api/fetch/user';
import { AuthMode, requireAuth } from '../core/auth';
import { type PathFn } from '../core/path';
import { faker, users } from '../data';
import { parseIdParam, successResponse } from '../utils';

export function createUserHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 내 정보 조회
    http.get(
      p('/api/user'),
      requireAuth(authMode, () => {
        const user = users[1];

        return HttpResponse.json(successResponse(user), { status: 200 });
      })
    ),

    // 내 정보 수정
    http.patch(
      p('/api/user'),
      requireAuth(authMode, async ({ request }) => {
        const { name, image, introduction, city, pace, styles } =
          (await request.json()) as UpdateMyProfileRequestBody;
        const user = users[1];

        const data = {
          id: 1,
          email: user.email,
          name: name || user.name,
          image: image || user.image,
          introduction: introduction || user.introduction,
          city: city || user.city,
          pace: pace || user.pace,
          styles: styles || user.styles || [],
          createdAt: '2025-12-17T02:07:53.249Z',
          updatedAt: '2025-12-17T02:07:53.249Z',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 특정 유저 정보 조회
    http.get(
      p('/api/users/:id'),
      requireAuth(authMode, ({ params }) => {
        const userId = parseIdParam(params.id);

        const data = {
          id: userId,
          name: faker.person.fullName(),
          image: faker.image.avatar(),
          introduction: faker.lorem.sentence(),
          city: '서울',
          pace: 400,
          styles: ['조깅', '러닝크루'],
          createdAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),
  ];
}
