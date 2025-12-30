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

export default async function request<T>(
  url: string | URL,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  return handleResponse<T>(response);
}
