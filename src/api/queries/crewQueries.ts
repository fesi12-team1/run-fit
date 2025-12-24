import { InfiniteData, queryOptions } from '@tanstack/react-query';
import {
  getCrewDetail,
  getCrewMemberCount,
  getCrewMemberDetailById,
  getCrewMembers,
  getCrewReviews,
  getCrews,
} from '@/api/fetch/crews';
import { normalizeParams } from '@/lib/utils';
import {
  Crew,
  CrewListFilters,
  InfiniteQueryPageParam,
  MemberRoleFilters,
  PaginationQueryParams,
  SliceData,
} from '@/types';

export const crewQueries = {
  all: () => ['crews'],

  // 크루 목록 조회
  lists: () => [...crewQueries.all(), 'list'],
  // 크루 목록 조회(무한 스크롤)
  list: (filters: Omit<CrewListFilters, 'page' | 'size'>) => {
    const cleanFilters = normalizeParams(filters);
    return {
      queryKey: [...crewQueries.lists(), cleanFilters],
      queryFn: ({ pageParam }: InfiniteQueryPageParam) =>
        getCrews({ ...cleanFilters, page: pageParam, size: 10 }),
      getNextPageParam: (
        lastPage: SliceData<Crew>,
        allPages: SliceData<Crew>[]
      ) => {
        if (!lastPage.hasNext) return undefined;
        return allPages.length;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60,

      select: (data: InfiniteData<SliceData<Crew>>) => {
        return {
          ...data,
          crews: data.pages.flatMap((p) => p.content),
        };
      },
    };
  },

  // 크루 상세 정보 조회
  details: () => [...crewQueries.all(), 'detail'],
  detail: (crewId: number) =>
    queryOptions({
      queryKey: [...crewQueries.details(), crewId],
      queryFn: () => getCrewDetail(crewId),
      enabled: !!crewId, // crewId가 유효할 때만 쿼리가 자동으로 실행
    }),

  members: (crewId: number) => ({
    all: () => [...crewQueries.detail(crewId).queryKey, 'members'],

    // 멤버 목록 조회
    list: (filters?: MemberRoleFilters) => {
      const cleanFilters = normalizeParams(filters);
      return queryOptions({
        queryKey: [...crewQueries.members(crewId).all(), 'list', cleanFilters],
        queryFn: () => getCrewMembers(crewId, cleanFilters),
        enabled: !!crewId,
      });
    },

    // 크루 멤버 수 조회
    count: () =>
      queryOptions({
        queryKey: [...crewQueries.members(crewId).all(), 'count'],
        queryFn: () => getCrewMemberCount(crewId),
        enabled: !!crewId,
      }),

    // 특정 멤버 역할(Role) 상세 조회
    detail: (userId: number) =>
      queryOptions({
        queryKey: [...crewQueries.members(crewId).all(), 'detail', userId],
        queryFn: () => getCrewMemberDetailById(crewId, userId),
        staleTime: 0, // 권한 조회 기능이므로 즉시 만료
        enabled: !!crewId && !!userId, // crewId 및 userId가 유효할 때만 쿼리가 자동으로 실행
      }),
  }),

  // 크루 리뷰 목록 조회
  reviews: (crewId: number) => ({
    all: () => [...crewQueries.detail(crewId).queryKey, 'reviews'],
    list: (params: PaginationQueryParams) => {
      const cleanParams = normalizeParams(params);
      return queryOptions({
        queryKey: [...crewQueries.reviews(crewId).all(), 'list', cleanParams],
        queryFn: () => getCrewReviews(crewId, cleanParams),
        placeholderData: (previousData) => previousData,
        enabled: !!crewId, // crewId가 유효할 때만 실행
      });
    },
  }),
};
