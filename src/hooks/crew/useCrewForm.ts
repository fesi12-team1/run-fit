import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  useCreateCrew,
  useUpdateCrewDetail,
} from '@/api/mutations/crewMutations';
import { useUploadImage } from '@/api/mutations/imageMutations';
import {
  crewFormSchema,
  CrewFormValues,
} from '@/components/crew/CrewForm/_schema';

type CreateModeOptions = {
  mode: 'create';
  defaultValues: CrewFormValues;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

type EditModeOptions = {
  mode: 'edit';
  crewId: number;
  defaultValues: CrewFormValues;
  onSuccess?: () => void;
  onError?: (message: string) => void;
};

type UseCrewFormOptions = CreateModeOptions | EditModeOptions;

export function useCrewForm(options: UseCrewFormOptions) {
  const { mode, defaultValues, onSuccess, onError } = options;

  const form = useForm<CrewFormValues>({
    resolver: zodResolver(crewFormSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const uploadImage = useUploadImage();

  const createMutation = useCreateCrew({ onSuccess, onError });
  const updateMutation = useUpdateCrewDetail(
    mode === 'edit' ? options.crewId : undefined,
    { onSuccess, onError }
  );

  const submit = form.handleSubmit(async (values) => {
    let imageUrl: string | undefined = undefined;

    /** 이미지 처리 로직 */
    if (values.image instanceof File) {
      try {
        const res = await uploadImage.mutateAsync({ file: values.image });
        imageUrl = res.url;
      } catch (e) {
        const msg = e instanceof Error ? e.message : '이미지 업로드 실패';
        onError?.(msg);
        form.setError('root', { message: msg });
        return;
      }
    } else if (typeof values.image === 'string') {
      // 기존 이미지 URL 그대로 사용
      imageUrl = values.image;
    }

    const payload = {
      name: values.name,
      description: values.description,
      city: values.city,
      image: imageUrl,
    };

    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(payload);
      } else {
        await updateMutation.mutateAsync({
          id: options.crewId,
          ...payload,
        });
      }
    } catch (_) {}
  });

  return {
    form,
    submit,
    isPending:
      mode === 'create' ? createMutation.isPending : updateMutation.isPending,
  };
}
