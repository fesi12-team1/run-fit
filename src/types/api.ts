// 성공/실패 응답
export interface SuccessResponse<T> {
  success: true;
  data: T;
  error: null;
}

export interface ErrorResponse {
  success: false;
  data: null;
  error: ResponseError;
}

export type ResponseData<T> = SuccessResponse<T> | ErrorResponse;

export interface ResponseError {
  code: string;
  message: string;
}

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

export type ResponseErrorData = ErrorResponse;
