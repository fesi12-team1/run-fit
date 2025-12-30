import 'server-only';

const backendBaseUrl = process.env.API_URL;

export const getBackendUrl = (url: string | URL) => {
  if (typeof url === 'string') {
    url = new URL(url, backendBaseUrl);
  }

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
  ];
  headersToSkip.forEach((h) => newHeaders.delete(h));

  newHeaders.set('Accept', 'application/json');
  if (token) {
    newHeaders.set('Authorization', `Bearer ${token}`);
  }

  return newHeaders;
};
