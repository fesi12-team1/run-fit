import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCrew } from '@/api/crews';
import { crewQueries } from '@/queries/crewQueries';

// 크루 생성
export default function useCreateCrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화 (새 크루 목록에 반영)
    },
  });
}
