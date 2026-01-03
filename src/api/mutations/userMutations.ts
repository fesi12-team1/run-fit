import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateMyProfile, UpdateMyProfileRequestBody } from '@/api/fetch/user';
import { userQueries } from '@/api/queries/userQueries';
import { ApiError } from '@/lib/error';
import { Profile } from '@/types';

// 내 정보 수정
export function useUpdateMyProfile(
  options?: UseMutationOptions<
    Profile, // TData = unknown,
    ApiError, // TError = DefaultError,
    UpdateMyProfileRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: updateMyProfile,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.setQueryData(userQueries.me.info().queryKey, data); // 업데이트된 데이터 캐시를 직접 업데이트
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
