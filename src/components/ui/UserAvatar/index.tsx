'use client';

import { cn } from '@/lib/utils';
import SafeImage from '../SafeImage';

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
  return (
    <div
      data-slot="avatar"
      className={cn('relative size-10 overflow-hidden rounded-full', className)}
    >
      <SafeImage
        src={src}
        alt={alt}
        fallbackSrc={'/assets/profile-default.png'}
        fill
        className="object-cover"
      />
    </div>
  );
}
