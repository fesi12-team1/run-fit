import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import { SessionCreateFormValues } from '../_others/schema';

interface ImageInputFieldProps {
  className?: string;
}

export default function ImageInputField({ className }: ImageInputFieldProps) {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SessionCreateFormValues>();

  const uploadImageMutation = useUploadImage();

  const handleFileChange = async (file: File | null) => {
    if (!file) {
      setValue('image', '', { shouldDirty: true, shouldValidate: true });
      return;
    }
    try {
      const { url } = await uploadImageMutation.mutateAsync(
        { file },
        {
          onError: (error) => {
            toast.error(error.message || '이미지 업로드에 실패했습니다.');
          },
        }
      );
      setValue('image', url, { shouldDirty: true, shouldValidate: true });
      toast.success('이미지가 업로드되었습니다.');
    } catch (error) {
      // useMutation onError 이미 핸들링 되고
      // 핸들 안된 promise rejection 막기만
      console.error('Image upload failed:', error);
    }
  };
  const initialUrl = getValues('image');
  return (
    <div>
      <CoverImageUploader
        className={className}
        disabled={uploadImageMutation.isPending}
        label="세션 대표 이미지"
        initialUrl={initialUrl}
        maxSizeMB={10}
        onFileChange={handleFileChange}
      />
      <p className="error-message">{errors.image?.message}</p>
    </div>
  );
}
