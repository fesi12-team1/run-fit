'use client';

import { useRouter } from 'next/navigation';
import ShevronLeft from '@/assets/icons/chevron-left.svg?react';

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/sessions');
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="hover:cursor-pointer"
      aria-label="뒤로 가기"
    >
      <ShevronLeft className="size-6" />
    </button>
  );
}
