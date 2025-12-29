'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod/v4';
import {
  useCreateCrew,
  type UseCrewMutationOptions,
} from '@/api/mutations/crewMutations';
import { useUploadImage } from '@/api/mutations/imageMutations';

export const createCrewSchema = z.object({
  name: z
    .string()
    .min(1, '크루 이름을 입력해주세요.')
    .min(2, '크루 이름은 최소 2자 이상이어야 합니다.'),

  description: z
    .string()
    .min(1, '크루 소개를 입력해주세요.')
    .max(300, '크루 소개는 300자 이하로 작성해주세요.'),

  city: z.string().min(1, '활동 지역을 선택해주세요.'),

  image: z.instanceof(File).optional(),
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

  const uploadImage = useUploadImage();

  const mutation = useCreateCrew({
    onSuccess: options?.onSuccess,
    onError: (message) => {
      options?.onError?.(message);
      form.setError('root', { message });
    },
  });

  const submit = form.handleSubmit(async (values) => {
    let imageUrl: string | undefined = undefined;

    // 이미지 선택된 경우 업로드
    if (values.image instanceof File) {
      try {
        const result = await uploadImage.mutateAsync({ file: values.image });
        imageUrl = result.url; // presigned-url로 업로드 후 반환된 실제 imageUrl
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : '이미지 업로드에 실패했습니다.';
        options?.onError?.(message);
        form.setError('root', { message });
        return;
      }
    }

    // 이제 서버에 보낼 body 구성
    const body = {
      name: values.name,
      description: values.description,
      city: values.city,
      image: imageUrl, // blob X, S3 URL O
    };

    await mutation.mutateAsync(body);
  });

  return {
    form,
    submit,
    isPending: mutation.isPending,
  };
}
