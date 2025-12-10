import { http, HttpResponse } from 'msw';
import { reviews, users } from '../db';
import { path } from '../utils';

export const userHandlers = [
  // 내 정보 조회
  http.get(path('/api/user'), ({ request }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = authHeader.replace('Bearer ', '');

    const user = users.findFirst((q) => q.where({ id: Number(userId) }));

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const ret = {
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

    return HttpResponse.json(ret, { status: 200 });
  }),

  // 내 정보 수정
  http.patch(path('/api/user'), async ({ request }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = authHeader.replace('Bearer ', '');

    const body = (await request.json()) as Partial<{
      name: string;
      image: string | null; // 프로필 이미지 URL
      introduction: string | null;
      city: string | null;
      pace: number | null;
      styles: string[] | null;
    }>;

    const user = users.findFirst((q) => q.where({ id: Number(userId) }));

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    users.update((q) => q.where({ id: Number(userId) }), {
      data(user) {
        if (body.name !== undefined) user.name = body.name;
        if (body.image !== undefined) user.image = body.image;
        if (body.introduction !== undefined)
          user.introduction = body.introduction;
        if (body.city !== undefined) user.city = body.city;
        if (body.pace !== undefined) user.pace = body.pace;
        if (body.styles !== undefined) user.styles = [];
        user.updatedAt = new Date().toISOString();
      },
    });

    const updatedUser = users.findFirst((q) => q.where({ id: Number(userId) }));

    const ret = {
      id: updatedUser!.id,
      name: updatedUser!.name,
      email: updatedUser!.email,
      image: updatedUser!.image || null,
      introduction: updatedUser!.introduction || null,
      city: updatedUser!.city || null,
      pace: updatedUser!.pace || null,
      styles: updatedUser!.styles || [],
      createdAt: updatedUser!.createdAt,
      updatedAt: updatedUser!.updatedAt,
    };

    return HttpResponse.json(ret, { status: 200 });
  }),

  // 특정 유저 정보 조회
  http.get(path('/api/users/:id'), ({ params }) => {
    if (!params.id || typeof params.id !== 'string') {
      return HttpResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const userId = parseInt(params.id, 10);

    const user = users.findFirst((q) => q.where({ id: userId }));

    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
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

  // 내가 작성한 리뷰 목록
  http.get(path('/api/user/me/reviews'), ({ request }) => {
    const headers = request.headers;
    const authHeader = headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const userId = authHeader.replace('Bearer ', '');

    const user = users.findFirst((q) => q.where({ id: Number(userId) }));
    if (!user) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userReviews = reviews.all().filter((review) => {
      const reviewUser = review.user;
      if (
        !reviewUser ||
        typeof reviewUser !== 'object' ||
        !('id' in reviewUser)
      ) {
        return false;
      }
      return reviewUser.id === user.id;
    });

    return HttpResponse.json(userReviews, { status: 200 });
  }),
];
