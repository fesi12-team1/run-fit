import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  updateMyProfile,
  UpdateMyProfileRequestBody,
  UpdateMyProfileResponse,
} from '@/api/fetch/user';
import { userQueries } from '@/api/queries/userQueries';
import { ApiError } from '@/lib/error';

// 내 정보 수정
export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateMyProfileResponse,
    ApiError,
    UpdateMyProfileRequestBody
  >({
    mutationFn: updateMyProfile,
    onSuccess: (updatedUserData) => {
      queryClient.setQueryData(userQueries.me.info().queryKey, updatedUserData); // 업데이트된 데이터 캐시를 직접 업데이트
    },
  });
}
