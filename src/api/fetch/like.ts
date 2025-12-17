import {
  PaginationQueryParams,
  ResponseData,
  Session,
  SliceData,
} from '@/types';

export async function getLikedSessions(queryParams: PaginationQueryParams) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  // const accessToken = '';
  const response = await fetch(`/api/user/me/likes/sessions?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Session>> = await response.json();
  return data;
}

export async function likeSession(sessionId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'POST',
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}

export async function unlikeSession(sessionId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}
