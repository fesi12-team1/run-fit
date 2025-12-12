import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCrewDetail } from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';
import { Crew } from '@/types';

// 크루 상세 정보 수정
export default function useUpdateCrewDetail(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Pick<Crew, 'name' | 'description' | 'city' | 'image'>) =>
      updateCrewDetail(crewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
      queryClient.invalidateQueries({ queryKey: crewQueries.lists() }); // 전체 크루 목록 캐시 무효화
    },
  });
}
