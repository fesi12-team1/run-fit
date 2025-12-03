import {
  PageData,
  PaginationQueryParams,
  ResponseData,
  ResponseErrorData,
  Session,
} from '@/types';

export async function getLikedSessions(queryParams: PaginationQueryParams) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/user/me/likes/sessions?${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: ResponseErrorData = await response.json();
    return errorData.error;
  }

  const { data }: ResponseData<PageData<Session>> = await response.json();
  return data;
}
