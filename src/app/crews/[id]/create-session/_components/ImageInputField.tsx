import { useFormContext } from 'react-hook-form';
import { useUploadImage } from '@/api/mutations/imageMutations';
import { CoverImageUploader } from '@/components/ui/ImageUploader';
import { SessionCreateFormValues } from '../_others/schema';

export default function ImageInputField() {
  const { setValue } = useFormContext<SessionCreateFormValues>();

  const upload = useUploadImage();

  return (
    <CoverImageUploader
      onFileChange={async (file) => {
        if (!file) {
          setValue('image', '', { shouldDirty: true, shouldValidate: true });
          return;
        }

        const { url } = await upload.mutateAsync(
          { file },
          {
            onError: () => {
              alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
            },
          }
        );
        setValue('image', url, { shouldDirty: true, shouldValidate: true });
      }}
    />
  );
}
