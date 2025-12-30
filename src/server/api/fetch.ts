import 'server-only';
import { SuccessResponse } from '@/types';
import { getBackendUrl } from './utils';

type refreshResponse = {
  token: string;
};

export async function postRefresh(refreshToken: string) {
  const res = await fetch(getBackendUrl('/api/auth/refresh'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.error?.message || 'Failed to refresh token';
    throw new Error(`Token refresh failed: ${message} (status: ${res.status})`);
  }

  const data: SuccessResponse<refreshResponse> = await res.json();

  if (!data.data?.token) {
    throw new Error('Invalid refresh response: missing token');
  }

  return data.data;
}
