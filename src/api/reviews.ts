import {
  PageData,
  PaginationQueryParams,
  ResponseData,
  ResponseErrorData,
  Review,
} from '@/types';

export type CreateSessionReviewResponseData = Pick<
  Review,
  'description' | 'ranks' | 'image'
>;

export async function createSessionReview(
  sessionId: string,
  body: CreateSessionReviewResponseData
) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Review> = await response.json();
  return data;
}

export async function deleteSessionReview(reviewId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/reviews/${reviewId}`, {
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

  type DeleteData = { message: '리뷰가 삭제되었습니다.' };
  const { data }: ResponseData<DeleteData> = await response.json();
  return data;
}

export async function getReviewsBySessionId(
  sessionId: string,
  queryParams: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/sessions/${sessionId}/reviews?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}

export async function getReviewsByCrewId(
  crewId: string,
  queryParams: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/reviews?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}

export async function getMyReviews(queryParams: PaginationQueryParams) {
  // const accessToken = '';
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/user/me/reviews?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}
