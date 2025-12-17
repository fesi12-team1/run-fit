import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getRefreshToken } from './auth';

export const proxyUrl = (pathname: string) =>
  new URL(`${pathname}`, process.env.NEXT_PUBLIC_API_URL);

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

      try {
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Cookie': `refreshToken=${refreshToken}`,
          },
          cache: 'no-cache',
        });

        if (!refreshResponse.ok) {
          return NextResponse.redirect(new URL('/signin', request.url));
        }

        const { data } = await refreshResponse.json();
        if (!data?.token) {
          return NextResponse.redirect(new URL('/signin', request.url));
        }

        accessToken = data.token;
      } catch (error) {
        console.error('Token refresh failed:', error);
        return NextResponse.redirect(new URL('/signin', request.url));
      }
    }
  }

  try {
    const trimmedPathname = pathname.startsWith('/')
      ? pathname.slice(1)
      : pathname;
    const requestPath = proxyUrl(`/api/${trimmedPathname}?${searchParams}`);
    console.log('requestPath: ', requestPath);
    const proxyResponse = await fetch(requestPath, {
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
    });

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
