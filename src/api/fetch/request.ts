import { ApiError } from '@/lib/error';
import { ResponseErrorData } from '@/types';

/**
 * fetch 응답을 처리하는 공통 함수
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const resData = await response.json().catch(() => null);

  if (!response.ok) {
    const status = String(response.status);

    const errorInfo: ResponseErrorData | null =
      typeof resData === 'object' ? resData?.error : null;
    const stringError = typeof resData === 'string' ? resData : null;

    const message = errorInfo?.message || '서버 에러가 발생했습니다.';
    const code = errorInfo?.code || stringError || 'SERVER_ERROR';

    throw new ApiError({ message, status, code });
  }

  if (!resData || typeof resData !== 'object') {
    throw new Error('Invalid response format');
  }

  return resData.data;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: BodyInit | Record<string, unknown> | null;
}

export default async function request<T>(
  url: string | URL,
  options?: RequestOptions
): Promise<T> {
  // 서버 환경에서만 상대 경로를 절대 경로로 변환
  let absoluteUrl = url;
  if (
    typeof url === 'string' &&
    !url.startsWith('http') &&
    typeof window === 'undefined'
  ) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    absoluteUrl = new URL(url, baseUrl).toString();
  }

  const { body, headers, ...rest } = options ?? {};

  const isJsonBody =
    typeof body === 'object' &&
    body !== null &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams);

  const response = await fetch(absoluteUrl, {
    ...rest,
    headers: isJsonBody
      ? { 'Content-Type': 'application/json', ...headers }
      : headers,
    body: isJsonBody ? JSON.stringify(body) : (body as BodyInit),
  });

  return handleResponse<T>(response);
}
