'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';

const signinSchema = z.object({
  email: z
    .email('올바른 이메일 형식이 아닙니다.')
    .min(1, '이메일을 입력해주세요.'),

  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export function useSigninForm() {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    mode: 'onBlur',
  });

  return form;
}
