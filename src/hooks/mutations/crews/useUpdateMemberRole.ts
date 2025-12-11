import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMemberRole } from '@/api/crews';
import { crewQueries } from '@/queries/crewQueries';

// 멤버 역할 변경 (운영진 <-> 멤버)
export default function useUpdateMemberRole(crewId: number, userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { role: 'STAFF' | 'MEMBER' }) =>
      updateMemberRole(crewId, userId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 관련 캐시 초기화
      });
    },
  });
}
