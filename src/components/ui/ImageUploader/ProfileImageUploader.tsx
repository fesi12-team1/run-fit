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
  const { inputRef, preview, open, addFiles, acceptAttr } = useImageUploader({
    maxFiles: 1,
    maxSizeMB: 5,
    initialUrl: imageUrl,
  });

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <input
        ref={inputRef}
        accept={acceptAttr}
        className="hidden"
        type="file"
        onChange={(e) => {
          addFiles(e.target.files, 'replace');
          onChange?.(e.target.files?.[0] ?? null);
        }}
      />

      <div
        className="relative overflow-hidden rounded-full border-[1.5px] border-gray-700"
        style={{ width: size, height: size }}
      >
        <Image
          alt="profile"
          className="object-cover"
          fill
          src={preview || '/assets/profile-default.png'}
        />
      </div>

      <button
        className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full bg-gray-500"
        type="button"
        onClick={open}
      >
        <Edit className="text-gray-50" height={12} width={12} />
      </button>
    </div>
  );
}
