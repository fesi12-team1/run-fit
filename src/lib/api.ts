import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getRefreshToken } from './auth';

export const proxyUrl = (pathname: string) =>
  new URL(`/api${pathname}`, process.env.NEXT_PUBLIC_API_URL);

export async function handleRequest(
  request: NextRequest,
  pathname: string,
  requiresAuth: boolean = true
) {
  const searchParams = request.nextUrl.searchParams.toString();
  let accessToken: string | undefined;

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return new Response(
      'NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.',
      { status: 500 }
    );
  }

  if (requiresAuth) {
    accessToken = await getAccessToken();

    if (!accessToken) {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }

      const refreshResponse = await fetch(proxyUrl('/auth/refresh'));
      if (!refreshResponse.ok) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }

      accessToken = await getAccessToken();
      if (!accessToken) {
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    }
  }
  // if (proxyResponse.status === 401) {
  //   response.cookies.set('accessToken', '', {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  //     path: '/api',
  //     maxAge: 0,
  //   });
  // }

  try {
    const proxyResponse = await fetch(
      proxyUrl(`/${pathname}?${searchParams}`),
      {
        method: request.method,
        headers: {
          ...Object.fromEntries(request.headers),
          accept: 'application/json;charset=UTF-8',
          ...(requiresAuth &&
            accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body:
          request.method !== 'GET' && request.method !== 'HEAD'
            ? request.body
            : undefined,
        cache: requiresAuth ? 'no-cache' : 'default',
      }
    );

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      const response = NextResponse.json(
        { ...errorData },
        {
          status: proxyResponse.status,
        }
      );

      return response;
    }

    const data = await proxyResponse.json();

    const response = NextResponse.json(
      { ...data },
      { status: proxyResponse.status }
    );
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}
