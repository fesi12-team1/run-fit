import Image, { type ImageProps } from 'next/image';
import { useMemo, useState } from 'react';
import { isValidImageUrl } from '@/lib/image';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallbackSrc: string;
};

export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...rest
}: SafeImageProps) {
  const initial = useMemo(
    () => (isValidImageUrl(src) ? src! : fallbackSrc),
    [src, fallbackSrc]
  );
  const [currentSrc, setCurrentSrc] = useState<string>(initial);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        // 무한루프 방지
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
