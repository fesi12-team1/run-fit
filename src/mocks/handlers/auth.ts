import { http, HttpResponse } from 'msw';
import { SignupRequestBody } from '@/api/fetch/auth';
import { AuthMode, requireAuth, resetAuth, setAuth } from '../core/auth';
import { PathFn } from '../core/path';
import { users } from '../data';
import { successResponse } from '../utils';

const MOCK_ACCESS_TOKEN = 'mock-access-token';
const MOCK_REFRESH_TOKEN = 'mock-refresh-token';

export function createAuthHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 회원가입
    http.post(p('/api/auth/signup'), async ({ request }) => {
      const { email, name } = (await request.json()) as SignupRequestBody;

      const data = {
        id: users.length + 1,
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      };

      return HttpResponse.json(successResponse(data), { status: 201 });
    }),

    // 로그인
    http.post(p('/api/auth/signin'), async () => {
      setAuth();

      const data = {
        token: MOCK_ACCESS_TOKEN,
      };

      return HttpResponse.json(successResponse(data), {
        headers: {
          'Set-Cookie': `refreshToken=${MOCK_REFRESH_TOKEN}; Path=/;`,
        },
      });
    }),

    // 토큰 갱신
    http.post(p('/api/auth/refresh'), () => {
      const data = { token: 'string' };
      return HttpResponse.json(successResponse(data), { status: 200 });
    }),

    // 로그아웃
    http.post(
      p('/api/auth/signout'),
      requireAuth(authMode, () => {
        resetAuth();
        const data = { message: 'Logged out successfully' };

        return HttpResponse.json(successResponse(data), {
          status: 200,
          headers: {
            'Set-Cookie': 'refreshToken=; Max-Age=0; Path=/;',
          },
        });
      })
    ),
  ];
}
