import {
  PageData,
  PaginationQueryParams,
  Review,
  SuccessResponse,
} from '@/types';

// 세션 리뷰 목록 조회
export async function getSessionReviews(
  sessionId: number,
  queryParams?: PaginationQueryParams
) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  const response = await fetch(`/api/sessions/${sessionId}/reviews?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<PageData<Review>> = await response.json();
  return data;
}

export type CreateSessionReviewResponseData = Pick<
  Review,
  'description' | 'ranks' | 'image'
>;

// 세션 리뷰 작성
export async function createSessionReview(
  sessionId: number,
  body: CreateSessionReviewResponseData
) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<Omit<Review, 'userName' | 'userImage'>> =
    await response.json();
  return data;
}

// 리뷰 삭제
export async function deleteSessionReview(reviewId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type DeleteData = { message: string };
  const { data }: SuccessResponse<DeleteData> = await response.json();
  return data;
}
