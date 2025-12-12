import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return accessToken;
}

export async function handleRequest(
  request: NextRequest,
  pathname: string,
  requiresAuth: boolean = true
) {
  const searchParams = request.nextUrl.searchParams.toString();
  const accessToken = requiresAuth ? getAccessToken() : undefined;

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return new Response(
      'NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.',
      { status: 500 }
    );
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const proxyURL = new URL(`api/${pathname}?${searchParams}`, baseURL);

  const proxyRequest = new Request(proxyURL, {
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
