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
import { useCreateCrewForm } from '@/hooks/crew/useCreateCrewForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIDO_LIST } from '@/types/region';

interface CrewCreateFormProps {
  onSuccessHandler?: () => void;
}

export default function CrewCreateForm({
  onSuccessHandler,
}: CrewCreateFormProps) {
  const [selectedCity, setSelectedCity] = useState<string>('서울');
  const isPc = useMediaQuery({ min: 'laptop' });

  const { form, submit } = useCreateCrewForm({
    onSuccess() {
      toast.success('크루가 생성되었습니다!');
      if (onSuccessHandler) {
        onSuccessHandler();
      }
    },
    onError: (message) => {
      toast.error(`크루 생성 실패: ${message}`);
    },
  });

  const handleSelectCity = (city: string) => {
    const newCity = selectedCity === city ? '' : city;
    setSelectedCity(newCity);
    form.setValue('city', newCity);
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      form.setValue('image', undefined);
      return;
    }
    form.setValue('image', file);
  };

  const { errors, isSubmitting } = form.formState;

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={submit}>
      <CoverImageUploader
        className="bg-gray-750"
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
        <Label htmlFor="crew-description">크루 소개</Label>
        <Textarea
          id="crew-description"
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

      <div className="tablet:gap-2 flex flex-col gap-3">
        <Label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          지역
        </Label>
        <div className="tablet:grid-cols-7 tablet:gap-2 mt-1 grid w-full grid-cols-5 place-items-center gap-3">
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
        {errors.city && (
          <p className="text-error-100 tablet:text-body3-semibold text-caption-semibold mt-1">
            {errors.city.message}
          </p>
        )}
      </div>

      <Button type="submit">
        {isSubmitting ? '생성 중...' : '완료'}
        {isSubmitting && <Spinner className="ml-3" />}
      </Button>
    </form>
  );
}
