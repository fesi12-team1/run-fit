import { cn } from '@/lib/utils';
import useImageUploader from './useImageUploader';

export default function CoverImageUploader({
  label = '크루의 대표 이미지를 설정해주세요',
  maxSizeMB = 5,
  onChange,
}: {
  label?: string;
  maxSizeMB?: number;
  onChange?: (file: File | null) => void;
}) {
  const { inputRef, items, open, addFiles, acceptAttr } = useImageUploader({
    maxFiles: 1,
    maxSizeMB,
  });

  const has = items.length > 0;

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files, 'replace');
          const f = e.target.files?.[0] ?? null;
          onChange?.(f);
        }}
      />

      <div
        className={
          'relative h-[140px] w-[327px] overflow-hidden rounded-xl bg-gray-800'
        }
      >
        <div className="aspect-327/140">
          {has && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={items[0].previewUrl}
              alt="대표 이미지 미리보기"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div
          className={cn(
            'group transparent absolute inset-0 flex flex-col items-center justify-center gap-3 transition-colors',
            has && 'bg-black/40',
            'hover:bg-black/60'
          )}
        >
          {has || (
            <p className="text-body3-medium w-[116px] text-center text-gray-300">
              {label}
            </p>
          )}
          <button
            type="button"
            onClick={open}
            className={cn(
              'text-body3-semibold rounded-xl bg-gray-500 px-6 py-2 text-white transition-colors',
              'group-hover:bg-gray-600 group-hover:text-gray-200' // div의 호버 상태를 button에 전달
            )}
          >
            파일 찾기
          </button>
        </div>
      </div>
    </div>
  );
}
