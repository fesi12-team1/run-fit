import Image from 'next/image';
import Edit from '@/assets/icons/edit.svg?react';
import useImageUploader from './useImageUploader';

export default function ProfileImageUploader({
  imageUrl,
  onChange,
  size = 80,
}: {
  imageUrl?: string | null;
  onChange?: (file: File | null) => void;
  size?: number;
}) {
  const { inputRef, items, open, addFiles, acceptAttr } = useImageUploader({
    maxFiles: 1,
    maxSizeMB: 5,
  });

  const displaySrc =
    items[0]?.previewUrl || imageUrl || '/assets/profile-default.png';

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files, 'replace');
          onChange?.(e.target.files?.[0] ?? null);
        }}
      />

      <div
        className="relative overflow-hidden rounded-full border-[1.5px] border-gray-700"
        style={{ width: size, height: size }}
      >
        <Image src={displaySrc} alt="profile" fill className="object-cover" />
      </div>

      <button
        type="button"
        onClick={open}
        className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full bg-gray-500"
      >
        <Edit width={12} height={12} className="text-gray-50" />
      </button>
    </div>
  );
}
