import type { ResponseData, ResponseErrorData } from '@/types/api';
import { users } from './db';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const path = (path: string) => `${API_BASE_URL}${path}`;

export function parseIdParam(
  id: string | readonly string[] | undefined
): number | null {
  if (!id || typeof id !== 'string') {
    return null;
  }

  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}

export function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const userId = authHeader.replace('Bearer ', '');
  const user = users.findFirst((q) => q.where({ id: Number(userId) }));

  return user || null;
}

export function successResponse<T>(data: T): ResponseData<T> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function errorResponse({
  code,
  message,
}: {
  code: string;
  message: string;
}): ResponseErrorData {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
    },
  };
}
