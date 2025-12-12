import { http, HttpResponse } from 'msw';
import { path } from '../utils';

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

    // 간단한 유효성 검사
    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof name !== 'string'
    ) {
      return HttpResponse.json(
        { message: 'Invalid request payload' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        message: 'User registered successfully',
      },
      { status: 201 }
    );
  }),

  // 로그인
  http.post(path('/api/auth/signin'), async ({ request }) => {
    const body = await request.json();
    const { email, password } = body as {
      email: string;
      password: string;
    };

    // 간단한 유효성 검사
    if (typeof email !== 'string' || typeof password !== 'string') {
      return HttpResponse.json(
        { message: 'Invalid request payload' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        token: MOCK_ACCESS_TOKEN,
        user: {
          id: 1,
          name: 'Mock User',
          email,
        },
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${MOCK_REFRESH_TOKEN}; HttpOnly; Secure; SameSite=Strict; Path=/api/auth; Max-Age=604800`,
        },
      }
    );
  }),

  // 토큰 갱신
  http.post(path('/api/auth/refresh'), () => {
    return HttpResponse.json(
      {
        token: MOCK_ACCESS_TOKEN,
      },
      { status: 200 }
    );
  }),

  // 로그아웃
  http.post(path('/api/auth/signout'), () => {
    return HttpResponse.json(
      { message: 'Logged out successfully' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/api/auth; Max-Age=0`,
        },
      }
    );
  }),
];
