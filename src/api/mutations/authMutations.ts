import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postSignin,
  postSignout,
  postSignup,
  SignupRequestBody,
} from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';
import type {
  ErrorResponse,
  SigninResponse,
  User,
  UserCredentials,
} from '@/types';

export interface UseAuthFormOptions {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

// 회원가입
export function useSignup(options?: UseAuthFormOptions) {
  return useMutation<User | null, ErrorResponse, SignupRequestBody>({
    mutationFn: postSignup,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.error.message);
    },
  });
}

// 로그인
export function useSignin(options?: UseAuthFormOptions) {
  const queryClient = useQueryClient();

  return useMutation<SigninResponse | null, ErrorResponse, UserCredentials>({
    mutationFn: postSignin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.me.all(), // 내 정보 조회 캐시 무효화
      });
      options?.onSuccess?.();
    },
    onError: (error) => {
      options?.onError?.(error.error.message);
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
