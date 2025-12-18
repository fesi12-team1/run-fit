'use client';

import Profile from 'assets/icons/profile.svg';
import { cx } from 'class-variance-authority';
import Image from 'next/image';
import { useState } from 'react';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
const sizeMap: Record<NonNullable<UserAvatarProps['size']>, string> = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
};

export default function UserAvatar({
  src,
  alt = '사용자 프로필',
  className,
  size,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = isValidImageUrl(src) && !imageError;

  return (
    <div
      data-slot="avatar"
      className={cx(
        'relative overflow-hidden rounded-full',
        sizeMap[size ?? 'lg'],
        className
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <Profile role="img" aria-label={alt} />
      )}
    </div>
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
