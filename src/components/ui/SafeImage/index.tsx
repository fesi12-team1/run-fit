'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type SafeImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
  fallbackSrc: string;
};

function isValidImageUrl(url: string | null | undefined): url is string {
  if (typeof url !== 'string') return false;

  if (url.trim() === '') return false;

  return (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  );
}

export default function SafeImage({
  src,
  fallbackSrc,
  alt,
  ...rest
}: SafeImageProps) {
  const validSrc = isValidImageUrl(src) ? src! : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState<string>(validSrc);
  const [prevSrc, setPrevSrc] = useState<string | null | undefined>(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setCurrentSrc(validSrc);
  }

  return (
    <Image
      {...rest}
      alt={alt}
      src={currentSrc}
      onError={() => {
        // 무한루프 방지
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
}
