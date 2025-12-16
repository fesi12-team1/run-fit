import { queryOptions } from '@tanstack/react-query';
import { getMyProfile, getMyReviews, getUserProfile } from '@/api/fetch/user';
import { normalizeParams } from '@/lib/utils';
import { PaginationQueryParams } from '@/types';

export const userQueries = {
  all: () => ['users'],

  details: () => [...userQueries.all(), 'detail'],
  me: {
    all: () => [...userQueries.details(), 'me'],

    // 내 정보 조회
    info: () =>
      queryOptions({
        queryKey: [...userQueries.me.all(), 'info'],
        queryFn: getMyProfile,
        staleTime: 1000 * 60 * 30, // 내 정보는 자주 변하지 않으므로 30분동안 fresh 상태
      }),

    // 내가 작성한 리뷰 목록
    reviews: (params: PaginationQueryParams) => {
      const cleanParams = normalizeParams(params);
      return queryOptions({
        queryKey: [...userQueries.me.all(), 'reviews', cleanParams],
        queryFn: () => getMyReviews(cleanParams),
        placeholderData: (previousData) => previousData,
      });
    },
  },

  // 특정 유저 정보 조회
  profile: (userId: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), userId],
      queryFn: () => getUserProfile(userId),
      enabled: !!userId, // userId가 유효할때만 실행
    }),
};
