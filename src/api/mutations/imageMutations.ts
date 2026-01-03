import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { getPresignedUrl, uploadToPresignedUrl } from '@/api/fetch/image';
import { ApiError } from '@/lib/error';

export function useUploadImage(
  options?: UseMutationOptions<
    { url: string }, // TData = unknown,
    ApiError, // TError = DefaultError,
    { file: File } // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const { presignedUrl, imageUrl } = await getPresignedUrl({
        imageName: file.name,
      });
      await uploadToPresignedUrl({ uploadUrl: presignedUrl, file });
      return { url: imageUrl };
    },
    ...options,
  });
}
