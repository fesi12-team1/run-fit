import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSignin, postSignout, postSignup } from '@/api/fetch/auth';
import { userQueries } from '@/api/queries/userQueries';

// 회원가입
export function useSignup() {
  return useMutation({
    mutationFn: postSignup,
  });
}

// 로그인
export function useSignin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueries.me().queryKey,
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
      queryClient.removeQueries({ queryKey: userQueries.me().queryKey }); // 개인정보 삭제
    },
  });
}
