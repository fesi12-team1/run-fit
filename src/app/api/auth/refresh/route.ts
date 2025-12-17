import { NextResponse } from 'next/server';
import { proxyUrl } from '@/lib/api';
import { getRefreshToken } from '@/lib/auth';

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();
    const proxyResponse = await fetch(proxyUrl('/api/auth/refresh'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(refreshToken && { Cookie: `refreshToken=${refreshToken}` }),
      },
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      const response = NextResponse.json(
        { ...errorData },
        { status: proxyResponse.status }
      );

      return response;
    }

    const { success, data, error } = await proxyResponse.json();
    if (!data?.token) {
      return NextResponse.json(
        { code: 'INVALID_RESPONSE', message: '서버 응답에 토큰이 없습니다.' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      { success, data, error },
      { status: proxyResponse.status }
    );

    response.cookies.set('accessToken', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/api',
      maxAge: 60 * 60, // 1 hour (3600 seconds)
    });

    const proxySetCookies = proxyResponse.headers.getSetCookie();
    proxySetCookies.forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        code: 'SERVER_ERROR',
        message:
          error instanceof Error ? error.message : '서버에 연결할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}
