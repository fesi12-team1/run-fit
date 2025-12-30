import { NextRequest, NextResponse } from 'next/server';
import { getBackendUrl } from '@/server/api/utils';
import { getAccessToken } from '@/server/cookies';

export async function POST(request: NextRequest) {
  try {
    const accessToken = await getAccessToken();
    const proxyResponse = await fetch(getBackendUrl(request.nextUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      const response = NextResponse.json(
        { ...errorData },
        { status: proxyResponse.status }
      );

      if (proxyResponse.status === 401) {
        response.cookies.set('accessToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          path: '/api',
          maxAge: 0,
        });
      }

      return response;
    }

    const data = await proxyResponse.json();
    const response = NextResponse.json(data, { status: proxyResponse.status });

    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 0,
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: '/',
      maxAge: 0,
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
