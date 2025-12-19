import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

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
  const [currentImgSrc, setCurrentImgSrc] = useState<string>(
    isValidImageUrl(src) ? src : fallbackSrc
  );

  return (
    <Image
      {...rest}
      src={currentImgSrc}
      alt={alt}
      onError={() => setCurrentImgSrc(fallbackSrc)}
    />
  );
}

function isValidImageUrl(url: string | null | undefined): url is string {
  if (typeof url !== 'string') return false;

  if (url.trim() === '') return false;

  return (
    url.startsWith('/') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  );
}
