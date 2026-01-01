'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { useCreateSessionReview } from '@/api/mutations/reviewMutations';
import ChevronLeft from '@/assets/icons/chevron-left.svg';
import Button from '@/components/ui/Button';
import ReviewImageUploader from '@/components/ui/ImageUploader/ReviewImageUploader';
import Modal from '@/components/ui/Modal';
import Rating from '@/components/ui/Rating';
import Spinner from '@/components/ui/Spinner';
import Textarea from '@/components/ui/Textarea';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Session } from '@/types';

const formatTime = (time: string) => {
  return format(new Date(time), 'yyyy년 M월 d일 • a h:mm', {
    locale: ko,
  });
};

interface ReviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: Session | null;
}

export default function ReviewModal({
  open,
  setOpen,
  session,
}: ReviewModalProps) {
  const isMobile = useMediaQuery({ max: 'tablet' });

  const [ranks, setRanks] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setRanks(0);
      setDescription('');
      setImage(null);
      setIsSubmitting(false);
    }
  }, [open]);

  const isDisabled = isSubmitting || ranks === 0 || description.trim() === '';

  const { mutateAsync: createReview } = useCreateSessionReview(session?.id);
  const { mutateAsync: uploadImage } = useUploadImage();

  if (!open || !session) {
    return null;
  }
  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (ranks < 1 || ranks > 5 || description.trim() === '') {
      toast.error('별점과 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl;

      if (image) {
        try {
          const { url } = await uploadImage({ file: image });
          imageUrl = url;
        } catch {
          toast.error('이미지 업로드 실패!');
          setIsSubmitting(false);
          return;
        }
      }

      await createReview({
        description: description.trim(),
        ranks: ranks as 1 | 2 | 3 | 4 | 5,
        image: imageUrl,
      });

      toast.success('리뷰 작성 완료!');
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '리뷰 작성 실패!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Content className="laptop:max-w-[480px] laptop:rounded-xl laptop:h-auto laptop:max-h-[85dvh] flex h-dvh w-full flex-col bg-gray-800">
        <Modal.Header className="relative flex items-center justify-center">
          <button
            className="laptop:hidden absolute left-0"
            onClick={() => setOpen(false)}
          >
            <ChevronLeft className="size-6 text-white" />
          </button>
          <Modal.Title className="laptop:m-0 ml-7">리뷰 작성하기</Modal.Title>
        </Modal.Header>
        <Modal.CloseButton
          className="laptop:block top-[26px] right-6 hidden"
          onClick={() => setOpen(false)}
        />
        <div className="tablet:flex-none tablet:mb-4 laptop:mb-0 w-full flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center gap-0.5">
              <p className="text-caption-regular tablet:text-body3-regular text-gray-300">
                {session.location}
              </p>
              <p className="text-body3-semibold tablet:text-body2-semibold text-gray-100">
                {session.name}
              </p>
              <p className="text-caption-regular tablet:text-body3-regular text-gray-300">
                {formatTime(session.sessionAt)}
              </p>
            </div>
            <hr className="w-full border-gray-700" />
            <div className="flex flex-col">
              <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                별점
              </label>
              <div className="flex items-center justify-center">
                <Rating
                  size={isMobile ? 32 : 40}
                  value={ranks}
                  onChange={setRanks}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                상세 내용
              </label>
              <Textarea
                className="bg-gray-750 tablet:min-h-[296px] laptop:min-h-[276px] min-h-[260px]"
                placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <ReviewImageUploader onChange={setImage} />
          </div>
        </div>
        <Modal.Footer className="laptop:pb-2 w-full pb-4">
          <div className="flex w-full items-center justify-center gap-2">
            <Button
              className="flex-1"
              variant={'neutral'}
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              className="flex-1 has-[>svg]:px-6"
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              {isSubmitting ? '등록하는 중..' : '등록하기'}
              {isSubmitting && <Spinner className="ml-3" />}
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
