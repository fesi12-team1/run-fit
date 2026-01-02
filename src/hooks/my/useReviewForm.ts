import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod/v4';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { useCreateSessionReview } from '@/api/mutations/reviewMutations';

const reviewSchema = z.object({
  ranks: z.number().min(1, '별점을 선택해주세요.').max(5),
  description: z.string().trim().min(1, '상세 내용을 입력해주세요.'),
  image: z.instanceof(File).optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export function useReviewForm(
  sessionId: number | undefined,
  onSuccess: () => void
) {
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    mode: 'onSubmit',
    defaultValues: {
      ranks: 0,
      description: '',
      image: undefined,
    },
  });

  const { mutateAsync: createReview } = useCreateSessionReview(sessionId ?? 0);
  const { mutateAsync: uploadImage } = useUploadImage();

  const onValid = async (values: ReviewFormValues) => {
    if (!sessionId) {
      toast.error('잘못된 접근입니다.');
      return;
    }

    try {
      let imageUrl: string | undefined;

      if (values.image instanceof File) {
        const { url } = await uploadImage({ file: values.image });
        imageUrl = url;
      }

      await createReview({
        description: values.description,
        ranks: values.ranks as 1 | 2 | 3 | 4 | 5,
        image: imageUrl,
      });

      toast.success('리뷰 작성 완료!');
      onSuccess();
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : '리뷰 작성 실패!');
    }
  };

  const onInvalid = () => {
    toast.error('별점과 내용을 입력해주세요.');
  };

  const submit = form.handleSubmit(onValid, onInvalid);

  return {
    form,
    submit,
  };
}
