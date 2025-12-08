'use client';

import { useState } from 'react';
import Star from '@/assets/icons/star.svg';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
  size?: number;
  disabled?: boolean;
}

export default function Rating({
  value,
  onChange,
  max = 5,
  className,
  size = 16,
  disabled = false,
}: RatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);

  const displayValue = hoveredRating || value;

  const handleClick = (v: number) => {
    if (disabled) return;
    onChange(v);
  };

  return (
    <div
      className={cn('flex items-center', className)}
      role="slider"
      aria-label="별점 선택"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-disabled={disabled}
    >
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const active = index <= displayValue;
        return (
          <button
            key={i}
            disabled={disabled}
            aria-label={`${index}점`}
            onMouseEnter={() => !disabled && setHoveredRating(index)}
            onMouseLeave={() => !disabled && setHoveredRating(0)}
            onClick={() => handleClick(index)}
            className={cn(
              index < max ? 'pr-0.5' : '',
              'rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            )}
          >
            <Star
              width={size}
              height={size}
              fill={active ? 'var(--color-gray-100)' : 'var(--color-gray-600)'}
            />
          </button>
        );
      })}
    </div>
  );
}
