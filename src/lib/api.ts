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
      } else {
        await fetch(proxyUrl('/auth/refresh'));
        accessToken = await getAccessToken();
      }
    }
  }

  const proxyRequest = new Request(proxyUrl(`${pathname}?${searchParams}`), {
    method: request.method,
    headers: {
      ...request.headers,
      ...(requiresAuth && { Authorization: `Bearer ${accessToken}` }),
    },
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : undefined,
  });

  try {
    return fetch(proxyRequest);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}
