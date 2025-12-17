import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyProfile } from '@/api/fetch/user';
import { userQueries } from '@/api/queries/userQueries';

// 내 정보 수정
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (updatedUserData) => {
      queryClient.setQueryData(userQueries.me.info().queryKey, updatedUserData); // 업데이트된 데이터 캐시를 직접 업데이트
    },
  });
}
