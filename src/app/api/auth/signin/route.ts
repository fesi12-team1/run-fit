import { NextRequest, NextResponse } from 'next/server';
import { proxyUrl } from '@/lib/constants';

export async function POST(request: NextRequest) {
  const apiUrl = proxyUrl('/auth/signin');
  const body = await request.json();

  try {
    const proxyResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      if (proxyResponse.status >= 400 && proxyResponse.status < 500) {
        const errorData = await proxyResponse.json();
        return NextResponse.json(
          { ...errorData },
          {
            status: proxyResponse.status,
          }
        );
      }
      throw new Error('서버에 연결할 수 없습니다.');
    }

    const { message, data } = await proxyResponse.json();
    const { token } = data;

    // Get Set-Cookie headers from backend (includes refreshToken)
    const proxySetCookies = proxyResponse.headers.getSetCookie();

    const response = NextResponse.json({ message });

    // Set accessToken cookie from response body
    response.cookies.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      path: 'api/auth',
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    // Forward refreshToken cookie from backend to client
    proxySetCookies.forEach((cookie) => {
      response.headers.append('Set-Cookie', cookie);
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { code: 'SERVER_ERROR', message: error },
      { status: 500 }
    );
  }
}
