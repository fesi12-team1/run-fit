import { queryOptions } from '@tanstack/react-query';
import {
  getSessionDetail,
  getSessionParticipants,
  getSessions,
} from '@/api/fetch/sessions';
import { normalizeParams } from '@/lib/utils';
import { Session, SessionListFilters, SliceData } from '@/types';

export const sessionQueries = {
  all: () => ['sessions'],

  // 세션 목록 조회
  lists: () => [...sessionQueries.all(), 'list'],
  list: (filters: SessionListFilters) => {
    const cleanFilters = normalizeParams(filters);
    return queryOptions({
      queryKey: [...sessionQueries.lists(), cleanFilters],
      queryFn: () => getSessions(cleanFilters),
      placeholderData: (previousData) => previousData, // 필터가 변경되어 데이터를 새로 불러올 때 화면이 깜빡이는 현상 방지
      staleTime: 1000 * 60, // 1분동안 fresh 상태
    });
  },

  // 무한 스크롤 세션 목록 조회
  listInfinite: (filters: Omit<SessionListFilters, 'page'>) => {
    const cleanFilters = normalizeParams(filters);
    return {
      queryKey: [...sessionQueries.lists(), 'infinite', cleanFilters],
      queryFn: async ({ pageParam = 0 }): Promise<SliceData<Session>> => {
        return await getSessions({ ...cleanFilters, page: pageParam });
      },
      getNextPageParam: (
        lastPage: SliceData<Session>,
        allPages: SliceData<Session>[]
      ) => {
        if (!lastPage.hasNext) return undefined;
        return allPages.length;
      },
      initialPageParam: 0,
      staleTime: 1000 * 60,
    };
  },

  // 세션 상세 정보 조회
  details: () => [...sessionQueries.all(), 'detail'],
  detail: (sessionId: number) =>
    queryOptions({
      queryKey: [...sessionQueries.details(), sessionId],
      queryFn: () => getSessionDetail(sessionId),
      enabled: !!sessionId, // sessionId가 유효할 때만 실행
    }),

  // 세션 참가자 조회
  participants: (sessionId: number) =>
    queryOptions({
      queryKey: [...sessionQueries.details(), sessionId, 'participants'],
      queryFn: () => getSessionParticipants(sessionId),
      enabled: !!sessionId, // sessionId가 유효할 때만 실행
    }),
};
