'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { useUpdateMyProfile } from '@/api/mutations/userMutations';
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

  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState<string | null>(null);
  const [pace, setPace] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [styles, setStyles] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 하나라도 입력해야 버튼활성화
  const profileFields = [
    introduction?.trim(),
    city?.trim(),
    pace,
    styles.length > 0,
  ];

  const hasAtLeastOneValue = profileFields.some(Boolean);

  const isDisabled = isSubmitting || name.trim() === '' || !hasAtLeastOneValue;

  useEffect(() => {
    if (!open || !user) return;

    setName(user.name ?? '');
    setIntroduction(user.introduction ?? null);
    setPace(user.pace ?? null);
    setCity(user.city ?? null);
    setStyles(user.styles ?? []);
    setImage(null);
  }, [open, user]);

  const { mutateAsync: updateProfile } = useUpdateMyProfile();
  const { mutateAsync: uploadImage } = useUploadImage();

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imageUrl = user?.image ?? null;

      if (image) {
        try {
          const { url } = await uploadImage({ file: image });
          imageUrl = url;
        } catch {
          toast.error('이미지 업로드 실패!');
          return;
        }
      }

      await updateProfile({
        name: name.trim(),
        introduction: introduction?.trim(),
        pace,
        city,
        styles,
        image: imageUrl,
      });

      toast.success('프로필 업데이트 완료!');
      setOpen(false);
    } catch {
      toast.error('프로필 업데이트 실패!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="scrollbar-hidden laptop:max-w-[480px] laptop:rounded-xl laptop:bg-gray-800 laptop:h-auto laptop:max-h-[85dvh] h-dvh w-full bg-gray-900">
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
          onClick={() => setOpen(false)}
          className="laptop:block top-[26px] right-6 hidden"
        />
        <div className="overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="tablet:gap-5 laptop:gap-3 flex flex-col gap-3">
            <div className="flex justify-center">
              <ProfileImageUploader
                imageUrl={user?.image}
                onChange={(f) => setImage(f)}
              />
            </div>
            <div className="laptop:gap-5 mb-4 flex flex-col gap-6">
              <div>
                <Input
                  size="sm"
                  value={name}
                  placeholder="이름을 입력해주세요"
                  errorMessage={
                    name.length === 0 ? '이름은 필수 입력값입니다.' : ''
                  }
                  label="이름"
                  onChange={(e) => setName(e.target.value)}
                  className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  자기소개
                </label>
                <Textarea
                  value={introduction || ''}
                  onChange={(e) => setIntroduction(e.target.value)}
                  placeholder="러닝을 하게 된 이유나 평소 러닝에 대한 생각을 적어주세요"
                  className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
                />
              </div>
              {/* 페이스 */}
              <div>
                <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                  페이스 (분/km)
                </label>
                <PaceSlider
                  value={pace}
                  onValueChange={setPace}
                  className={isPc ? 'bg-gray-750' : 'bg-gray-800'}
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
                        setCity((prev) => (prev === sido ? null : sido))
                      }
                    >
                      <Chip
                        tone={isPc ? 'secondary' : 'primary'}
                        state={city === sido ? 'active' : 'default'}
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
                  value={styles}
                  onChange={setStyles}
                  options={RUNNING_STYLE_OPTIONS}
                  max={3}
                  placeholder="태그를 선택해주세요"
                  isPc={isPc}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer className="w-full">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {isSubmitting ? '저장하는 중..' : '완료'}
            {isSubmitting && <Spinner className="ml-3" />}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
