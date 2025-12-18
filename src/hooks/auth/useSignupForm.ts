'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';
import {
  useSignup,
  type UseAuthFormOptions,
} from '@/api/mutations/authMutations';

const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 최대 32자까지 가능합니다.')
      .regex(/[0-9]/, '비밀번호에 숫자가 최소 1개 이상 포함되어야 합니다.')
      .regex(
        /[a-zA-Z]/,
        '비밀번호에 영문자가 최소 1개 이상 포함되어야 합니다.'
      ),
    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    name: z
      .string()
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(10, '이름은 최대 10자까지 가능합니다.'),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export function useSignupForm(options: UseAuthFormOptions) {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const mutation = useSignup({
    onSuccess: options?.onSuccess,
    onError: (message) => {
      options?.onError?.(message);
      form.setError('root', { message });
    },
  });

  const submit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  return {
    form,
    submit,
    isPending: mutation.isPending,
  };
}
