'use client';

import { Label } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import Checkbox from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';
import { Level } from '@/types';

interface SessionLevelCardProps
  extends VariantProps<typeof sessionLevelCardVariants> {
  level: Level;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const sessionLevelCardVariants = cva(
  [
    'relative flex w-full items-start gap-2 rounded-lg outline-1 bg-gray-800 outline-gray-750',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40',
  ].join(' '),
  {
    variants: {
      size: {
        md: 'min-h-[74px] pt-5 pb-4 px-3',
        sm: 'min-h-[64px] py-3 px-3',
      },
      checked: {
        true: 'outline-brand-400 outline-2',
        false: 'outline-gray-750 hover:outline-brand-900',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-60 hover:outline-gray-750',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
      disabled: false,
    },
  }
);

export default function SessionLevelCard({
  level,
  size = 'md',
  checked,
  disabled = false,
  onClick,
  ...rest
}: SessionLevelCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (disabled) return;
    onClick();
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      className={cn(sessionLevelCardVariants({ size, checked, disabled }))}
      {...rest}
    >
      <Label className="flex w-full items-start justify-between gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <p
            className={cn(
              size === 'md' ? 'text-body2-semibold' : 'text-body3-semibold',
              'text-white'
            )}
          >
            {LEVEL_COPY[level].label}
          </p>
          <p
            className={cn(
              size === 'md' ? 'text-body3-medium' : 'text-caption-medium',
              'text-gray-300'
            )}
          >
            {LEVEL_COPY[level].description}
          </p>
        </div>
        <Checkbox
          aria-hidden="true"
          checked={checked}
          rounded
          tabIndex={-1}
          className="pointer-events-none absolute top-3 right-3"
        />
      </Label>
    </div>
  );
}

const LEVEL_COPY = {
  BEGINNER: {
    label: '초급',
    description: '천천히 몸을 풀며 가볍게 달리는 데 집중해요',
  },
  INTERMEDIATE: {
    label: '중급',
    description: '거리와 페이스를 꾸준히 유지하며 러닝 리듬을 만들어가요',
  },
  ADVANCED: {
    label: '고급',
    description: '빠른 페이스의 강도 있는 훈련을 통해 기록 단축에 집중해요',
  },
} as const;
