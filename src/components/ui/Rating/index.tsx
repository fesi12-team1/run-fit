'use client';

import { useState } from 'react';
import Star from '@/assets/icons/star.svg?react';
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

  const handleClick = (v: number) => {
    if (disabled) return;
    onChange(v);
  };

  return (
    <div
      aria-disabled={disabled}
      aria-label="별점 선택"
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className={cn('flex items-center', className)}
      role="slider"
    >
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        return (
          <button
            key={i}
            aria-label={`${index}점`}
            className={cn(
              index < max ? 'pr-0.5' : '',
              'rounded-sm focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            )}
            disabled={disabled}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !disabled && setHoveredRating(index)}
            onMouseLeave={() => !disabled && setHoveredRating(0)}
          >
            <Star
              fill={
                index <= value
                  ? 'var(--color-gray-100)'
                  : hoveredRating >= index
                    ? 'var(--color-gray-300)'
                    : 'var(--color-gray-600)'
              }
              height={size}
              width={size}
            />
          </button>
        );
      })}
    </div>
  );
}
