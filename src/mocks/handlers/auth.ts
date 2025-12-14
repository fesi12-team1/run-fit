import { http, HttpResponse } from 'msw';
import { SigninRequestBody } from '@/api/fetch/auth';
import { users } from '../db';
import { errorResponse, findMaxId, path, successResponse } from '../utils';

const MOCK_ACCESS_TOKEN = '1';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

export const authHandlers = [
  // 회원가입
  http.post(path('/api/auth/signup'), async ({ request }) => {
    const body = await request.json();
    const { email, password, name } = body as {
      email: string;
      password: string;
      name: string;
    };

    const user = users.findFirst((q) => q.where({ email }));

    if (user) {
      return HttpResponse.json(
        errorResponse({
          code: 'ALREADY_EXISTS_EMAIL',
          message: 'A user with this email already exists',
        }),
        { status: 409 }
      );
    }

    const newUser = await users.create({
      id: findMaxId(users.findMany()) + 1,
      name: name,
      email: email,
      password: password,
      image: null,
      introduction: null,
      city: null,
      pace: null,
      styles: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const responseData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return HttpResponse.json(successResponse(responseData), { status: 201 });
  }),

  // 로그인
  http.post(path('/api/auth/signin'), async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as SigninRequestBody;

    const user = users.findFirst((q) => q.where({ email }));

    if (!user) {
      return HttpResponse.json(
        errorResponse({
          code: 'INVALID_CREDENTIALS',
          message:
            '존재하지 않은 유저입니다. 이메일과 비밀번호를 확인해주세요.',
        }),
        { status: 400 }
      );
    }

    if (user.password !== password) {
      return HttpResponse.json(
        errorResponse({
          code: 'INVALID_CREDENTIALS',
          message:
            '올바르지 않은 정보로 로그인을 시도했습니다. 이메일과 비밀번호를 확인해주세요.',
        }),
        { status: 400 }
      );
    }

    const responseData = {
      token: MOCK_ACCESS_TOKEN,
    };

    return HttpResponse.json(successResponse(responseData), {
      headers: {
        'Set-Cookie': `refreshToken=${MOCK_REFRESH_TOKEN}; Path=/; HttpOnly`,
      },
    });
  }),

  // 토큰 갱신
  http.post(path('/api/auth/refresh'), ({ request }) => {
    const cookies = request.headers.get('Cookie');
    const refreshToken = cookies
      ?.split('; ')
      .find((cookie) => cookie.startsWith('refreshToken='))
      ?.split('=')[1];

    const hasValidRefreshToken = refreshToken === MOCK_REFRESH_TOKEN;

    if (!hasValidRefreshToken) {
      return HttpResponse.json(
        errorResponse({
          code: 'REFRESH_TOKEN_INVALID',
          message: 'Invalid or missing refresh token',
        }),
        { status: 401 }
      );
    }

    const responseData = {
      token: MOCK_ACCESS_TOKEN,
    };

    return HttpResponse.json(successResponse(responseData), { status: 201 });
  }),

  // 로그아웃
  http.post(path('/api/auth/signout'), () => {
    const responseData = { message: 'Logged out successfully' };

    return HttpResponse.json(successResponse(responseData), {
      status: 200,
      headers: {
        'Set-Cookie': 'refreshToken=; Max-Age=0; Path=/; HttpOnly',
      },
    });
  }),
];
