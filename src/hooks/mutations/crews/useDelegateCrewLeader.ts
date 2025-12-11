import { useMutation, useQueryClient } from '@tanstack/react-query';
import { delegateCrewLeader } from '@/api/crews';
import { crewQueries } from '@/queries/crewQueries';

// 크루 리더 위임
export default function useDelegateCrewLeader(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
    },
  });
}
