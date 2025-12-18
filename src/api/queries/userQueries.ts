import { queryOptions } from '@tanstack/react-query';
import {
  getMyCreatedSessions,
  getMyJoinedCrews,
  getMyLikedSessions,
  getMyOwnedCrews,
  getMyParticipatingSessions,
  getMyProfile,
  getMyReviews,
  getUserProfile,
} from '@/api/fetch/user';
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

    // 찜한 세션
    likeAll: () => [...userQueries.me.all(), 'likes'],
    likes: (params: PaginationQueryParams) => {
      const cleanParams = normalizeParams(params);
      return queryOptions({
        queryKey: [...userQueries.me.all(), 'likes', cleanParams],
        queryFn: () => getMyLikedSessions(cleanParams),
        placeholderData: (previousData) => previousData,
      });
    },

    // 크루 관련 (Owned / Joined)
    crews: {
      owned: (params: PaginationQueryParams) => {
        const cleanParams = normalizeParams(params);
        return queryOptions({
          queryKey: [...userQueries.me.all(), 'crews', 'owned', cleanParams],
          queryFn: () => getMyOwnedCrews(cleanParams),
          placeholderData: (previousData) => previousData,
        });
      },
      joined: (params: PaginationQueryParams) => {
        const cleanParams = normalizeParams(params);
        return queryOptions({
          queryKey: [...userQueries.me.all(), 'crews', 'joined', cleanParams],
          queryFn: () => getMyJoinedCrews(cleanParams),
          placeholderData: (previousData) => previousData,
        });
      },
    },

    // 세션 관련 (Created / Participating)
    sessions: {
      created: (params: PaginationQueryParams) => {
        const cleanParams = normalizeParams(params);
        return queryOptions({
          queryKey: [
            ...userQueries.me.all(),
            'sessions',
            'created',
            cleanParams,
          ],
          queryFn: () => getMyCreatedSessions(cleanParams),
          placeholderData: (previousData) => previousData,
        });
      },
      participating: (
        params: PaginationQueryParams & { status: 'SCHEDULED' | 'COMPLETED' }
      ) => {
        const cleanParams = normalizeParams(params);
        return queryOptions({
          queryKey: [
            ...userQueries.me.all(),
            'sessions',
            'participating',
            cleanParams,
          ],
          queryFn: () => getMyParticipatingSessions(cleanParams),
          placeholderData: (previousData) => previousData,
        });
      },
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
