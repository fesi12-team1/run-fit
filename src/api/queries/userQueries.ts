import { queryOptions } from '@tanstack/react-query';
import { getMyInfo, getMyReviews, getUserProfile } from '@/api/fetch/users';
import { normalizeParams } from '@/lib/utils';
import { PaginationQueryParams } from '@/types';

export const userQueries = {
  all: () => ['users'],

  // 내 정보 조회
  details: () => [...userQueries.all(), 'detail'],
  me: () =>
    queryOptions({
      queryKey: [...userQueries.details(), 'me'],
      queryFn: getMyInfo,
      staleTime: 1000 * 60 * 30, // 내 정보는 자주 변하지 않으므로 30분동안 fresh 상태
    }),

  // 특정 유저 정보 조회
  profile: (userId: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), userId],
      queryFn: () => getUserProfile(userId),
      enabled: !!userId, // userId가 유효할때만 실행
    }),

  // 내가 작성한 리뷰 목록
  reviews: (params: PaginationQueryParams) => {
    const cleanParams = normalizeParams(params);
    return queryOptions({
      queryKey: [...userQueries.all(), 'reviews', cleanParams],
      queryFn: () => getMyReviews(params),
      placeholderData: (previousData) => previousData,
    });
  },
};
