import { useMutation } from '@tanstack/react-query';
import {
  updateMyProfile,
  UpdateMyProfileMutationOption,
} from '@/api/fetch/user';
import { userQueries } from '@/api/queries/userQueries';

// 내 정보 수정
export function useUpdateMyProfile(options?: UpdateMyProfileMutationOption) {
  return useMutation({
    mutationFn: updateMyProfile,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.setQueryData(userQueries.me.info().queryKey, data); // 업데이트된 데이터 캐시를 직접 업데이트
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
