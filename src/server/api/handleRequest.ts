import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getRefreshToken } from '../cookies';
import { refreshAccessToken } from './refresh';
import { getBackendUrl, getSafeHeaders } from './utils';

export default async function handleRequest(
  request: NextRequest,
  requiresAuth: boolean = true
) {
  if (!process.env.API_URL) {
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'API_URL is not defined in environment variables.',
        },
      },
      { status: 500 }
    );
  }

  const url = getBackendUrl(request.nextUrl);
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (requiresAuth && !refreshToken) {
    return NextResponse.json(
      {
        error: {
          code: 'UNAUTHORIZED',
          message: '인증이 필요합니다.',
        },
      },
      { status: 401 }
    );
  }

  const { method } = request;
  const isPayloadMethod = !['GET', 'HEAD'].includes(method);
  const clonedBody = isPayloadMethod ? await request.arrayBuffer() : null;

  const fetchFromBackend = async (token?: string) => {
    return fetch(url.toString(), {
      method,
      headers: getSafeHeaders(request.headers, token),
      cache: requiresAuth || token ? 'no-store' : 'default',
      ...(clonedBody && { body: clonedBody }),
    });
  };

  try {
    let response = await fetchFromBackend(accessToken);

    if (requiresAuth && refreshToken && response.status === 401) {
      console.log('Access token expired, attempting to refresh token...');

      const isRefreshed = await refreshAccessToken();

      if (isRefreshed) {
        const newAccessToken = await getAccessToken();
        response = await fetchFromBackend(newAccessToken);
      }
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    }

    return response;
  } catch {
    return NextResponse.json({ error: 'Proxy Server Error' }, { status: 500 });
  }
}
