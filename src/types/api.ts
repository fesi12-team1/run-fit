export interface ResponseData<T> {
  success: true;
  data: T;
  error: null;
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

export interface SliceData<T> {
  content: T[];
  hasNext: boolean;
}

export interface ResponseErrorData {
  success: false;
  data: null;
  error: ResponseError;
}

export interface ResponseError {
  code: string;
  message: string;
}

export interface PaginationQueryParams {
  page?: number;
  size?: number;
}
