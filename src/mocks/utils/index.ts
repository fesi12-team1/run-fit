import type { ResponseData, ResponseErrorData } from '@/types/api';
import { users } from '../db';

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

export const path = (path: string) => `${getApiBaseUrl()}${path}`;

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

export const findMaxId = (items: { id: number }[]) =>
  items.length > 0 ? Math.max(...items.map((u) => u.id)) : 0;

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
