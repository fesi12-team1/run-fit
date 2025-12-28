'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import Input from '@/components/ui/Input';
import Label from '@/components/ui/Label';
import Textarea from '@/components/ui/Textarea';
import { useCreateCrewForm } from '@/hooks/crew/useCreateCrewForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIDO_LIST } from '@/types/region';

export default function CrewCreateForm() {
  const { form, submit, isPending } = useCreateCrewForm({
    onSuccess() {
      toast.success('크루가 생성되었습니다!');
    },
    onError: (message) => {
      toast.error(`크루 생성 실패: ${message}`);
    },
  });

  const isPc = useMediaQuery({ min: 'laptop' });

  const selectedCity = form.watch('city');

  const handleSelectCity = (sido: string) => {
    if (selectedCity === sido) {
      form.setValue('city', '', { shouldValidate: true });
    } else {
      form.setValue('city', sido, { shouldValidate: true });
    }
  };

  const handleImageChange = useCallback(
    (file: File | null) => {
      if (file) {
        const url = URL.createObjectURL(file);
        form.setValue('image', url, { shouldValidate: true });
      } else {
        form.setValue('image', '', { shouldValidate: true });
      }
    },
    [form]
  );

  return (
    <form
      onSubmit={submit}
      className="tablet:justify-between flex h-full w-full flex-col gap-4"
    >
      <CoverImageUploader onChange={handleImageChange} />

      <Input
        label="크루 이름"
        {...form.register('name')}
        placeholder="크루 이름을 작성해주세요"
        errorMessage={form.formState.errors.name?.message}
      />

      <div className="flex flex-col gap-2">
        <Label>
          크루 소개
          <Textarea
            {...form.register('description')}
            placeholder="크루에 대한 상세 설명을 작성해주세요"
          />
        </Label>
        {form.formState.errors.description && (
          <p className="text-error-100 tablet:text-body3-semibold text-caption-semibold">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          지역
        </label>
        <div className="tablet:grid-cols-7 mt-1 grid w-full grid-cols-5 gap-4">
          {SIDO_LIST.map((sido) => (
            <Chip
              key={sido}
              tone={isPc ? 'secondary' : 'primary'}
              state={selectedCity === sido ? 'active' : 'default'}
              aria-label={`${sido} ${selectedCity === sido ? '선택됨' : '선택'}`}
              onClick={() => handleSelectCity(sido)}
            >
              {sido}
            </Chip>
          ))}
        </div>
        {form.formState.errors.city && (
          <p className="text-error-100 tablet:text-body3-semibold text-caption-semibold mt-2">
            {form.formState.errors.city.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending || !form.formState.isValid}>
        {isPending ? '생성 중...' : '완료'}
      </Button>
    </form>
  );
}
