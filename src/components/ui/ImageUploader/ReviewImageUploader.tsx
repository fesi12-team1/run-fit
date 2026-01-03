import Camera from '@/assets/icons/camera.svg?react';
import XIcon from '@/assets/icons/x.svg?react';
import useImageUploader from './useImageUploader';

export default function ReviewImageUploader({
  maxSizeMB = 5,
  onChange,
}: {
  maxFiles?: number;
  maxSizeMB?: number;
  onChange?: (file: File | null) => void;
}) {
  const { inputRef, items, hasPreview, open, addFiles, remove, acceptAttr } =
    useImageUploader({
      maxFiles: 1,
      maxSizeMB,
    });

  const has = items.length > 0;

  const handleRemove = () => {
    if (items[0]) {
      remove(items[0].id);
      onChange?.(null);
    }
  };

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

      <div className={'relative h-[84px] w-[84px]'}>
        <div className="aspect-84/84 overflow-hidden rounded-lg border border-gray-300 bg-gray-800">
          {hasPreview && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt="이미지 미리보기"
              className="h-full w-full object-cover"
              src={items[0].previewUrl}
            />
          )}
        </div>

        <div className="transparent absolute inset-0 flex flex-col items-center justify-center gap-3">
          {hasPreview || (
            <button
              className={
                'text-body3-semibold flex h-full w-full flex-col items-center justify-center gap-1 text-gray-300'
              }
              type="button"
              onClick={open}
            >
              <Camera className="size-6" />
              사진 추가
            </button>
          )}
        </div>
        {hasPreview && (
          <button
            className={
              'absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-gray-50 text-gray-700'
            }
            type="button"
            onClick={handleRemove}
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
