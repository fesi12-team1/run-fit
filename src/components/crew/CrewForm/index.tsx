'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Spinner from '@/components/ui/Spinner';
import Textarea from '@/components/ui/Textarea';
import { useCrewForm } from '@/hooks/crew/useCrewForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIDO_LIST } from '@/types/region';
import { CrewFormValues } from './_schema';

type CrewFormCreateProps = {
  mode: 'create';
  defaultValues: CrewFormValues;
  onSuccess?: () => void;
};

type CrewFormEditProps = {
  mode: 'edit';
  crewId: number;
  defaultValues: CrewFormValues;
  onSuccess?: () => void;
};

type CrewFormProps = CrewFormCreateProps | CrewFormEditProps;

export default function CrewForm(props: CrewFormProps) {
  const { mode, defaultValues, onSuccess } = props;
  const [selectedCity, setSelectedCity] = useState(defaultValues.city);
  const isPc = useMediaQuery({ min: 'laptop' });

  const handleSuccess = () => {
    toast.success(
      mode === 'create'
        ? '크루가 생성되었습니다!'
        : '크루 정보가 수정되었습니다!'
    );
    onSuccess?.();
  };

  const handleError = (message: string) => {
    toast.error(message);
  };

  const { form, submit, isPending } = useCrewForm(
    mode === 'create'
      ? {
          mode: 'create',
          defaultValues,
          onSuccess: handleSuccess,
          onError: handleError,
        }
      : {
          mode: 'edit',
          crewId: props.crewId,
          defaultValues,
          onSuccess: handleSuccess,
          onError: handleError,
        }
  );

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    form.setValue('city', city);
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      form.setValue('image', undefined);
    } else {
      form.setValue('image', file);
    }
  };

  const { errors } = form.formState;

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={submit}>
      <CoverImageUploader
        className="bg-gray-750"
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
        {isPending ? (mode === 'create' ? '생성 중...' : '수정 중...') : '완료'}
        {isPending && <Spinner className="ml-3" />}
      </Button>
    </form>
  );
}
