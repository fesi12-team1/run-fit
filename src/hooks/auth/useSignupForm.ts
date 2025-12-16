'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSignup } from '@/api/mutations/authMutations';
import {
  SignupFormValues,
  signupSchema,
} from '@/lib/validations/auth/signupSchema';

/**
 * 회원가입 훅
 * @returns 회원가입 폼, 제출 핸들러, 제출 중 상태
 */
export function useSignupForm() {
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
  });

  const mutation = useSignup();

  const submit = form.handleSubmit((values) => {
    mutation.mutate(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onSuccess: () => {
          router.push('/signin');
        },
        onError: ({ error }) => {
          form.setError('root', {
            message: error.message,
          });
          // switch (error.code) {
          //   case 'ALREADY_EXISTS_EMAIL':
          //     form.setError('email', {
          //       message: error.message,
          //     });
          //     break;

          //   case 'VALIDATION_ERROR':
          //     form.setError('root', {
          //       message: error.message,
          //     });
          //     break;

          //   default:
          //     form.setError('root', {
          //       message: '회원가입 중 오류가 발생했습니다.',
          //     });
          // }
        },
      }
    );
  });

  return {
    form,
    submit,
    isPending: mutation.isPending,
  };
}
