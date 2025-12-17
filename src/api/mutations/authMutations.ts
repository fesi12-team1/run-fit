import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  postSignin,
  postSignout,
  postSignup,
  SignupRequestBody,
} from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';
import type { SigninFormValues } from '@/lib/validations/auth/signinSchema';
import type { ErrorResponse, SigninResponse, User } from '@/types';

// 회원가입
export function useSignup() {
  return useMutation<User | null, ErrorResponse, SignupRequestBody>({
    mutationFn: postSignup,
  });
}

// 로그인
export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation<SigninResponse | null, ErrorResponse, SigninFormValues>({
    mutationFn: postSignin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.me.all(), // 내 정보 조회 캐시 무효화
      });
    },
  });
}

// 로그아웃
export function useSignout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: userQueries.me.all() }); // 개인정보 삭제
    },
  });
}
