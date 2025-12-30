import { PageData, PaginationQueryParams, Review } from '@/types';
import request from './request';

// 세션 리뷰 목록 조회
export type GetSessionReviewsResponse = PageData<Review>;
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
  return request<GetSessionReviewsResponse>(
    `/api/sessions/${sessionId}/reviews?${query}`
  );
}

export type CreateSessionReviewRequestBody = Pick<
  Review,
  'description' | 'ranks' | 'image'
>;

// 세션 리뷰 작성
export type CreateSessionReviewResponse = Omit<
  Review,
  'userName' | 'userImage'
>;
export async function createSessionReview(
  sessionId: number,
  body: CreateSessionReviewRequestBody
) {
  return request<CreateSessionReviewResponse>(
    `/api/sessions/${sessionId}/reviews`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
}

// 리뷰 삭제
export type DeleteSessionReviewResponse = { message: string };
export async function deleteSessionReview(reviewId: number) {
  return request<DeleteSessionReviewResponse>(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
  });
}
