'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  useSignin,
  type UseAuthFormOptions,
} from '@/api/mutations/authMutations';
import {
  signinSchema,
  type SigninFormValues,
} from '@/lib/validations/auth/signinSchema';

export function useSigninForm(options: UseAuthFormOptions) {
  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    mode: 'onChange',
  });

  const mutation = useSignin({
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
