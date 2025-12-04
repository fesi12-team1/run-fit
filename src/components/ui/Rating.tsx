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
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const index = i + 1;
        const active = index <= displayValue;

        return (
          <button
            key={i}
            disabled={disabled}
            onMouseEnter={() => !disabled && setHoveredRating(index)}
            onMouseLeave={() => !disabled && setHoveredRating(0)}
            onClick={() => handleClick(index)}
            className={`${index < max ? 'pr-0.5' : ''} focus:outline-none`}
          >
            <Star
              width={size}
              height={size}
              fill={active ? '#D8E2EE' : '#2B2D3A'}
            />
          </button>
        );
      })}
    </div>
  );
}
