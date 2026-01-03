'use client';

import { Controller, useWatch } from 'react-hook-form';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import TagInput from '@/components/my/TagInput';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import ProfileImageUploader from '@/components/ui/ImageUploader/ProfileImageUploader';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import PaceSlider from '@/components/ui/PaceSlider';
import Spinner from '@/components/ui/Spinner';
import Textarea from '@/components/ui/Textarea';
import { useProfileEditForm } from '@/hooks/my/useProfileEditForm';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Profile } from '@/types';
import { SIDO_LIST } from '@/types/region';

const RUNNING_STYLE_OPTIONS = [
  '조용히 집중',
  '대화하며 즐겁게',
  '풍경 감상',
  '야간 러닝',
  '새벽 러닝',
  '뒤풀이 선호',
  '기록 단축형',
];

type ProfileEditProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: Profile;
};

export default function ProfileEdit({ open, setOpen, user }: ProfileEditProps) {
  const isPc = useMediaQuery({ min: 'laptop' });

  const { form, submit } = useProfileEditForm(user, () => setOpen(false));
  const {
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const city = useWatch({ control, name: 'city' });
  const styles = useWatch({ control, name: 'styles' });

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="tablet:px-30 laptop:p-6 scrollbar-hidden laptop:max-w-[480px] laptop:rounded-xl laptop:bg-gray-800 laptop:h-fit laptop:max-h-[85dvh] h-dvh w-full bg-gray-900 p-6">
        <Modal.Header className="relative flex items-center justify-center">
          <button
            className="laptop:hidden absolute left-0"
            onClick={() => setOpen(false)}
          >
            <ChevronLeft className="size-6 text-white" />
          </button>
          <Modal.Title className="laptop:m-0 ml-7">프로필 편집하기</Modal.Title>
        </Modal.Header>
        <Modal.CloseButton
          className="laptop:block top-[26px] right-6 hidden"
          onClick={() => setOpen(false)}
        />
        <div className="overflow-y-auto px-0.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="tablet:gap-5 laptop:gap-3 flex flex-col gap-3">
            <div className="flex justify-center">
              <ProfileImageUploader
                imageUrl={user?.image}
                onChange={(file) => setValue('image', file ?? undefined)}
              />
            </div>
            <div className="laptop:gap-5 mb-4 flex flex-col gap-6">
              <div>
                <Input
                  className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
                  errorMessage={errors.name?.message}
                  label="이름"
                  placeholder="이름을 입력해주세요"
                  {...register('name')}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  자기소개
                </label>
                <Textarea
                  className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
                  placeholder="러닝을 하게 된 이유나 평소 러닝에 대한 생각을 적어주세요"
                  {...register('introduction')}
                />
              </div>
              <div>
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  페이스 (분/km)
                </label>
                <Controller
                  control={control}
                  name="pace"
                  render={({ field }) => (
                    <PaceSlider
                      className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="laptop:my-5 my-6">
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  활동 지역
                </label>
                <div className="mt-3 flex flex-wrap gap-4">
                  {SIDO_LIST.map((sido) => (
                    <button
                      key={sido}
                      aria-label={`${sido} ${city === sido ? '선택됨' : '선택'}`}
                      onClick={() =>
                        setValue('city', city === sido ? null : sido)
                      }
                    >
                      <Chip
                        state={city === sido ? 'active' : 'default'}
                        tone={isPc ? 'secondary' : 'primary'}
                      >
                        {sido}
                      </Chip>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  러닝 스타일 (최대 3개)
                </label>
                <TagInput
                  isPc={isPc}
                  max={3}
                  options={RUNNING_STYLE_OPTIONS}
                  placeholder="태그를 선택해주세요"
                  value={styles}
                  onChange={(v) => setValue('styles', v)}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer className="w-full">
          <Button className="w-full" disabled={isSubmitting} onClick={submit}>
            {isSubmitting ? '저장하는 중..' : '완료'}
            {isSubmitting && <Spinner className="ml-3" />}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
