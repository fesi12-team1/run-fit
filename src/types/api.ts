// 성공/실패 응답
export interface SuccessResponse<T> {
  success: true;
  data: T;
  error: null;
}

export interface ErrorResponse {
  success: false;
  data: null;
  error: ResponseErrorData;
}

export interface ResponseErrorData {
  code: string;
  message: string;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;

// Slice/Page 형태의 데이터
export interface SliceData<T> {
  content: T[];
  hasNext: boolean;
}

export interface PageData<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// 쿼리 파라미터
export interface PaginationQueryParams {
  page?: number;
  size?: number;
}
// 무한 스크롤 쿼리 파라미터
export type InfiniteQueryPageParam = { pageParam: number };
