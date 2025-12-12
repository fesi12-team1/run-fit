import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expelMember } from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';

// 크루 멤버 추방
export default function useExpelMember(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
    },
  });
}
