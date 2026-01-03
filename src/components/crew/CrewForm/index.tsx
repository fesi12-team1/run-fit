'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  useCreateCrew,
  useUpdateCrewDetail,
} from '@/api/mutations/crewMutations';
import { useUploadImage } from '@/api/mutations/imageMutations';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Spinner from '@/components/ui/Spinner';
import Textarea from '@/components/ui/Textarea';
import { CrewFormValues, useCrewForm } from '@/hooks/crew/useCrewForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIDO_LIST } from '@/types/region';

type CreateCrewFormProps = {
  mode: 'create';
  crewId?: undefined;
  defaultValues: CrewFormValues;
  handleSuccess: () => void;
};

type EditCrewFormProps = {
  mode: 'edit';
  crewId: number;
  defaultValues: CrewFormValues;
  handleSuccess: () => void;
};

type CrewFormProps = CreateCrewFormProps | EditCrewFormProps;

export default function CrewForm({
  mode,
  defaultValues,
  crewId,
  handleSuccess,
}: CrewFormProps) {
  const [selectedCity, setSelectedCity] = useState(defaultValues.city);
  const isPc = useMediaQuery({ min: 'laptop' });

  const form = useCrewForm(defaultValues);

  const uploadImageMutation = useUploadImage({
    onError: (error) => {
      toast.error(error.message || '이미지 업로드에 실패했습니다.');
    },
  });

  const createMutation = useCreateCrew({
    onSuccess: () => {
      handleSuccess();
      toast.success('크루가 생성되었습니다!');
    },
    onError: (error) => {
      toast.error(error.message || '크루 생성에 실패했습니다.');
    },
  });

  const updateMutation = useUpdateCrewDetail(crewId ?? 0, {
    onSuccess: () => {
      handleSuccess();
      toast.success('크루 정보가 수정되었습니다!');
    },
    onError: (error) => {
      toast.error(error.message || '크루 정보 수정에 실패했습니다.');
    },
  });

  const submit = form.handleSubmit(async (values) => {
    const payload = {
      name: values.name,
      description: values.description,
      city: values.city,
      image: values.image,
    };

    if (mode === 'create') {
      createMutation.mutate(payload);
    } else {
      updateMutation.mutate(payload);
    }
  });

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    form.setValue('city', city);
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      form.setValue('image', undefined);
      return;
    }

    try {
      const { url } = await uploadImageMutation.mutateAsync({ file });
      form.setValue('image', url);
      toast.success('이미지가 업로드되었습니다.');
    } catch (error) {
      // useMutation onError 이미 핸들링 되고
      // 핸들 안된 promise rejection 막기만
      console.error('Image upload failed:', error);
    }
  };

  const { errors } = form.formState;

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={submit}>
      <CoverImageUploader
        className="bg-gray-750"
        disabled={uploadImageMutation.isPending}
        initialUrl={
          typeof defaultValues.image === 'string'
            ? defaultValues.image
            : undefined
        }
        onFileChange={handleImageChange}
      />

      <Input
        label="크루 이름"
        {...form.register('name')}
        className="bg-gray-750"
        errorMessage={errors.name?.message}
        placeholder="크루 이름을 작성해주세요"
      />

      <div className="flex flex-col gap-1">
        <Label>크루 소개</Label>
        <Textarea
          {...form.register('description')}
          className="bg-gray-750"
          placeholder="크루에 대한 상세 설명을 작성해주세요"
        />
        {errors.description && (
          <p
            className="text-error-100 tablet:text-body3-semibold text-caption-semibold"
            id="crew-description-error"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>지역</Label>
        <div className="tablet:grid-cols-7 grid grid-cols-5 gap-2">
          {SIDO_LIST.map((sido) => (
            <Chip
              key={sido}
              aria-label={`${sido} ${selectedCity === sido ? '선택됨' : '선택'}`}
              state={selectedCity === sido ? 'active' : 'default'}
              tone={isPc ? 'secondary' : 'primary'}
              onClick={() => handleSelectCity(sido)}
            >
              {sido}
            </Chip>
          ))}
        </div>
        {errors.city && <p className="text-error-100">{errors.city.message}</p>}
      </div>

      <Button type="submit">
        {mode === 'create' && createMutation.isPending ? '생성 중...' : '완료'}
        {mode === 'edit' && updateMutation.isPending ? '수정 중...' : '완료'}
        {(createMutation.isPending || updateMutation.isPending) && (
          <Spinner className="ml-3" />
        )}
      </Button>
    </form>
  );
}
