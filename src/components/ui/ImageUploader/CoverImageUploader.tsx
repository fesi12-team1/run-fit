import { cn } from '@/lib/utils';
import useImageUploader from './useImageUploader';

interface CoverImageUploaderProps {
  initialUrl?: string;
  onFileChange?: (file: File | null) => void;
  label?: string;
  maxSizeMB?: number;
  className?: string;
}

export default function CoverImageUploader({
  initialUrl,
  onFileChange: onChange,
  label = '크루의 대표 이미지를 설정해주세요',
  maxSizeMB = 5,
  className,
}: CoverImageUploaderProps) {
  const { inputRef, preview, hasPreview, open, addFiles, acceptAttr } =
    useImageUploader({
      maxFiles: 1,
      maxSizeMB,
      initialUrl,
    });

  return (
    <div>
      <input
        ref={inputRef}
        accept={acceptAttr}
        className="hidden"
        type="file"
        onChange={(e) => {
          addFiles(e.target.files, 'replace');
          const f = e.target.files?.[0] ?? null;
          onChange?.(f);
        }}
      />

      <div
        className={cn(
          'relative h-[140px] w-full overflow-hidden rounded-xl bg-gray-800',
          className
        )}
      >
        <div className="aspect-327/140">
          {hasPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="대표 이미지 미리보기"
              className="h-full w-full object-cover"
              src={preview}
            />
          )}
        </div>

        <div
          className={cn(
            'group transparent absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors',
            hasPreview &&
              (className?.includes('bg-gray-750')
                ? 'bg-gray-750/40'
                : 'bg-gray-800/40'),
            className?.includes('bg-gray-750')
              ? 'hover:bg-gray-750/60'
              : 'hover:bg-gray-800/60'
          )}
        >
          {hasPreview || (
            <p className="text-body3-medium w-[116px] text-center text-gray-300">
              {label}
            </p>
          )}
          <button
            className={cn(
              'text-body3-semibold rounded-xl bg-gray-500 px-6 py-2 text-white transition-colors',
              'group-hover:bg-gray-600 group-hover:text-gray-200' // div의 호버 상태를 button에 전달
            )}
            type="button"
            onClick={open}
          >
            파일 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
