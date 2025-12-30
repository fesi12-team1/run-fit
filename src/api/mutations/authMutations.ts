import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignin, postSignout, postSignup } from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';

export interface UseAuthFormOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

// 회원가입
export function useSignup(options?: UseAuthFormOptions) {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.message);
    },
  });
}

// 로그인
export function useSignin(options?: UseAuthFormOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.me.all(), // 내 정보 조회 캐시 무효화
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.message);
    },
  });
}

// 로그아웃
export function useSignout(options?: UseAuthFormOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueries.me.all() });
      options?.onSuccess?.();
    },
  });
}
