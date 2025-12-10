import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMemberRole } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

// 멤버 역할 변경 (운영진 <-> 멤버)
export default function useUpdateMemberRole(crewId: number, userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { role: 'STAFF' | 'MEMBER' }) =>
      updateMemberRole(crewId, userId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.members.all(crewId), // 멤버 목록 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.members.count(crewId), // 멤버 카운트 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.crews.members.role(crewId, userId), // 멤버 역할 캐시 무효화
      });
    },
  });
}
