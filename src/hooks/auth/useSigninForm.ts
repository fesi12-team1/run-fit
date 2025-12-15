'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSignin } from '@/api/mutations/authMutations';
import {
  SigninFormValues,
  signinSchema,
} from '@/lib/validations/auth/signinSchema';

export function useSigninForm() {
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onSubmit',
  });

  const mutation = useSignin();

  const submit = form.handleSubmit((values) => {
    mutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push('/');
        },
        onError: ({ error }) => {
          form.setError('root', {
            message: error.message,
          });
          // switch (error.code) {
          //   case 'INVALID_CREDENTIALS':
          //     form.setError('root', {
          //       message: error.message,
          //     });
          //     break;

          //   default:
          //     form.setError('root', {
          //       message: '로그인 중 오류가 발생했습니다.',
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
