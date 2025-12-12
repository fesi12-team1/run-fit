import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCrew } from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';

// 크루 삭제
export default function useDeleteCrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crewId: number) => deleteCrew(crewId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화
    },
  });
}
