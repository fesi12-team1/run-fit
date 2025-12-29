import { NextRequest, NextResponse } from 'next/server';
import { getAccessToken, getRefreshToken, setAccessToken } from './cookie';

export const getBackendUrl = (url: URL) => {
  const backendBaseUrl = process.env.API_URL;
  return new URL(`${url.pathname}${url.search}`, backendBaseUrl);
};

export const getSafeHeaders = (incomingHeaders: Headers, token?: string) => {
  const newHeaders = new Headers(incomingHeaders);

  // 보안 및 호환성을 위해 제거해야 할 홉 바이 홉(hop-by-hop) 헤더
  const headersToSkip = [
    'host',
    'connection',
    'content-length',
    'origin',
    'referer',
    'host-header',
  ];
  headersToSkip.forEach((h) => newHeaders.delete(h));

  newHeaders.set('Accept', 'application/json');
  if (token) {
    newHeaders.set('Authorization', `Bearer ${token}`);
  }

  return newHeaders;
};

export async function handleRequest(
  request: NextRequest,
  requiresAuth: boolean = true
) {
  if (!process.env.API_URL) {
    return NextResponse.json(
      { error: 'Proxy Configuration Error' },
      { status: 500 }
    );
  }

  const url = getBackendUrl(request.nextUrl);
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  if (requiresAuth && !refreshToken) {
    return NextResponse.json('UNAUTHORIZED', { status: 401 });
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

      const isRefreshed = await refreshAccessToken(
        getBackendUrl(new URL('/api/auth/refresh', 'http://localhost:3000'))
      );
      console.log(isRefreshed);

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

async function refreshAccessToken(url: URL): Promise<boolean> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `refreshToken=${refreshToken}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) return false;

    const { data } = await response.json();
    await setAccessToken(data.token);
    return true;
  } catch {
    return false;
  }
}
