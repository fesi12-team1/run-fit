import { useQuery } from '@tanstack/react-query';
import { getCrews } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';
import { CrewListFilters } from '@/types';

/**
 * 크루 목록 조회 (필터링)
 * - 조건(필터)에 맞는 러닝 크루 목록을 조회합니다.
 * @param filters - 지역, 날짜, 시간, 난이도 필터 옵션
 */
export default function useCrewList(filters: CrewListFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.crews.list(filters),
    queryFn: () => getCrews(filters),
    placeholderData: (previousData) => previousData, // 필터가 변경되어 데이터를 새로 불러올 때 화면이 깜빡이는 현상 방지
    staleTime: 1000 * 60, // 1분동안 fresh 상태
  });
}
