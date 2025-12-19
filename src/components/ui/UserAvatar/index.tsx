'use client';

import Profile from 'assets/icons/profile.svg';
import Image from 'next/image';
import { useState } from 'react';
import { isValidImageUrl } from '@/lib/image';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

export default function UserAvatar({
  src,
  alt = '사용자 프로필',
  className,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const showImage = isValidImageUrl(src) && !imageError;

  return (
    <div
      data-slot="avatar"
      className={cn('relative size-10 overflow-hidden rounded-full', className)}
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
