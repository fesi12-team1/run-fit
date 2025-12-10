import { useQuery } from '@tanstack/react-query';
import { getCrewDetail } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

/**
 * 크루 상세 정보 조회
 * @param crewId
 */
export default function useCrewDetail(crewId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.crews.byId(crewId),
    queryFn: () => getCrewDetail(crewId),
    enabled: !!crewId, // crewId가 유효할 때만 쿼리가 자동으로 실행
  });
}
