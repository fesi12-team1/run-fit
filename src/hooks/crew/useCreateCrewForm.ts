'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';
import {
  useCreateCrew,
  type UseCrewMutationOptions,
} from '@/api/mutations/crewMutations';

export const createCrewSchema = z.object({
  name: z
    .string()
    .min(1, '크루 이름을 입력해주세요.')
    .min(2, '크루 이름은 최소 2자 이상이어야 합니다.'),

  description: z
    .string()
    .min(1, '크루 소개를 입력해주세요.')
    .max(300, '크루 소개는 300자 이하로 작성해주세요.'),

  city: z.string().nonempty('활동 지역을 선택해주세요.'),

  image: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),
});

export type CreateCrewFormValues = z.infer<typeof createCrewSchema>;

export function useCreateCrewForm(options?: UseCrewMutationOptions) {
  const form = useForm<CreateCrewFormValues>({
    resolver: zodResolver(createCrewSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
      city: '서울',
      image: undefined,
    },
  });

  const mutation = useCreateCrew({
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
