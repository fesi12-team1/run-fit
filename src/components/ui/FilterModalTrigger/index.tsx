'use client';

import ArrowDown from '@/assets/icons/arrow-down.svg?react';
import { cn } from '@/lib/utils';

interface FilterModalTriggerLikeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'lg';
  hasSelected?: boolean;
}

/**
 * 필터 모달 트리거 버튼 컴포넌트
 * Popover의 Trigger 역할과 동일한 스타일을 가짐
 */
export default function FilterModalTrigger({
  className,
  children,
  size = 'sm',
  hasSelected = false,
  ...props
}: FilterModalTriggerLikeProps) {
  const isLarge = size === 'lg';

  return (
    <button
      className={cn(
        isLarge
          ? 'text-body3-medium h-10 gap-2'
          : 'text-caption-medium h-8 gap-1',
        'group flex w-auto items-center justify-between truncate rounded-lg px-3 py-2',
        'bg-gray-800 text-gray-200',
        'border border-transparent',
        hasSelected && 'border-brand-500 bg-brand-950 text-brand-200',
        className
      )}
      type="button"
      {...props}
    >
      {children}
      <ArrowDown
        className={cn(
          'text-gray-200',
          hasSelected && 'text-brand-200 rotate-180',
          isLarge ? 'size-6' : 'size-4'
        )}
      />
    </button>
  );
}
