import { queryOptions } from '@tanstack/react-query';
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
  CrewListFilters,
  MemberRoleFilters,
  PaginationQueryParams,
} from '@/types';

export const crewQueries = {
  all: () => ['crews'],

  // 크루 목록 조회
  lists: () => [...crewQueries.all(), 'list'],
  list: (filters: CrewListFilters) => {
    const cleanFilters = normalizeParams(filters);
    return queryOptions({
      queryKey: [...crewQueries.lists(), cleanFilters],
      queryFn: () => getCrews(filters),
      placeholderData: (previousData) => previousData, // 필터가 변경되어 데이터를 새로 불러올 때 화면이 깜빡이는 현상 방지
      staleTime: 1000 * 60, // 1분동안 fresh 상태
    });
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
