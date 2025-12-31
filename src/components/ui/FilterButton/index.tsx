'use client';

import React from 'react';
import FilterIcon from '@/assets/icons/filter.svg?react';
import { cn } from '@/lib/utils';

interface FilterButtonProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

export default function FilterButton({
  count = 0,
  onClick,
  className,
}: FilterButtonProps) {
  const isActive = count > 0;

  return (
    <button
      aria-label={isActive ? `필터 ${count}개 적용됨` : '필터'}
      className={cn(
        'relative flex items-center justify-center rounded-lg p-2 transition-colors',
        isActive
          ? 'bg-brand-950 border-brand-700 border'
          : 'border border-transparent bg-transparent',
        className
      )}
      type="button"
      onClick={onClick}
    >
      <FilterIcon
        className={cn(isActive ? 'text-brand-600' : 'text-gray-200')}
        height={20}
        width={20}
      />

      {isActive && (
        <span
          className={cn(
            'absolute -top-[7px] -right-[9px] flex h-4 w-4 items-center justify-center rounded-full',
            'bg-brand-500 text-[10px]/[16px] text-white'
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
