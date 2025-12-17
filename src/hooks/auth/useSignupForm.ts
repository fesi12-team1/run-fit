'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  useSignup,
  type UseAuthFormOptions,
} from '@/api/mutations/authMutations';
import {
  signupSchema,
  type SignupFormValues,
} from '@/lib/validations/auth/signupSchema';

export function useSignupForm(options: UseAuthFormOptions) {
  const form = useForm<SignupFormValues>({
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
