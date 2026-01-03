'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod/v4';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { useUpdateMyProfile } from '@/api/mutations/userMutations';
import { Profile } from '@/types';

const profileEditSchema = z.object({
  name: z.string().min(1, '이름은 필수 입력값입니다.'),
  introduction: z.string().nullable().optional(),
  pace: z.number().nullable().optional(),
  city: z.string().nullable().optional(),
  styles: z.array(z.string()).max(3),
  image: z.instanceof(File).optional(),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;

export function useProfileEditForm(user?: Profile, onSuccess?: () => void) {
  const form = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name ?? '',
      introduction: user?.introduction ?? null,
      pace: user?.pace ?? null,
      city: user?.city ?? null,
      styles: user?.styles ?? [],
      image: undefined,
    },
  });

  const uploadImage = useUploadImage();
  const updateProfile = useUpdateMyProfile();
  const { reset } = form;

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name ?? '',
      introduction: user.introduction ?? null,
      pace: user.pace ?? null,
      city: user.city ?? null,
      styles: user.styles ?? [],
      image: undefined,
    });
  }, [user, reset]);

  const submit = form.handleSubmit(async (values) => {
    const hasContent =
      (values.introduction && values.introduction.trim().length > 0) ||
      (values.pace !== null && values.pace !== undefined) ||
      !!values.city ||
      values.styles?.length > 0;

    if (!hasContent) {
      toast.error('프로필 정보 중 하나 이상 입력해주세요.');
      return;
    }

    try {
      let imageUrl = user?.image ?? null;

      if (values.image instanceof File) {
        const { url } = await uploadImage.mutateAsync({
          file: values.image,
        });
        imageUrl = url;
      }

      await updateProfile.mutateAsync({
        name: values.name.trim(),
        introduction: values.introduction?.trim(),
        pace: values.pace,
        city: values.city,
        styles: values.styles,
        image: imageUrl,
      });

      toast.success('프로필 업데이트 완료!');
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('프로필 업데이트 실패!');
    }
  });

  return {
    form,
    submit,
  };
}
