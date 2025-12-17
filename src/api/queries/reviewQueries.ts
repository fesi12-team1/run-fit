import { queryOptions } from '@tanstack/react-query';
import { getSessionReviews } from '@/api/fetch/reviews';
import { normalizeParams } from '@/lib/utils'; // userQueries 예시([3])를 참고하여 유틸 함수 적용
import { PaginationQueryParams } from '@/types';

export const reviewQueries = {
  all: () => ['reviews'],

  // 세션 리뷰 관련
  session: (sessionId: number) => ({
    all: () => [...reviewQueries.all(), 'session', sessionId],
    lists: () => [...reviewQueries.session(sessionId).all(), 'list'],
    list: (params: PaginationQueryParams) => {
      const cleanParams = normalizeParams(params);
      return queryOptions({
        queryKey: [...reviewQueries.session(sessionId).lists(), cleanParams],
        queryFn: () => getSessionReviews(sessionId, cleanParams),
        enabled: !!sessionId, // sessionId가 존재할 때만 실행
        placeholderData: (previousData) => previousData, // 페이지 변경 시 이전 데이터 유지 (깜빡임 방지)
      });
    },
  }),
};
