'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';

const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, '이름은 최소 2자 이상이어야 합니다.')
      .max(10, '이름은 최대 10자까지 가능합니다.'),
    email: z.email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .max(32, '비밀번호는 최대 32자까지 가능합니다.')
      .regex(/[0-9]/, '비밀번호에 숫자가 최소 1개 이상 포함되어야 합니다.')
      .regex(
        /[a-zA-Z]/,
        '비밀번호에 영문자가 최소 1개 이상 포함되어야 합니다.'
      ),
    passwordConfirm: z.string(),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export function useSignupForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  return form;
}
