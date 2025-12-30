'use client';

import { RadioGroupItem } from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import LevelIcon from '@/assets/icons/level.svg?react';
import { cn } from '@/lib/utils';
import { SessionLevel } from '@/types';

interface SessionLevelCardProps
  extends VariantProps<typeof sessionLevelCardVariants> {
  level: SessionLevel;
  value: SessionLevel;
  checked: boolean;
  disabled?: boolean;
}

const sessionLevelCardVariants = cva(
  [
    'relative w-full rounded-lg outline-1 bg-gray-800 outline-gray-750',
    'px-3 pt-5 pb-4 tablet:px-4',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40',
  ].join(' '),
  {
    variants: {
      checked: {
        true: 'outline-brand-400 outline-2',
        false: 'outline-gray-750 hover:outline-brand-900',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-60 hover:outline-gray-750',
      },
    },
    defaultVariants: {
      checked: false,
      disabled: false,
    },
  }
);

export default function SessionLevelCard({
  level,
  value,
  checked,
  disabled,
}: SessionLevelCardProps) {
  return (
    <RadioGroupItem
      value={value}
      disabled={disabled}
      className={cn(sessionLevelCardVariants({ checked, disabled }))}
    >
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex flex-1 flex-col gap-1.5 text-left">
          <p
            className={cn(
              'text-body3-semibold flex items-center gap-0.5',
              level === 'BEGINNER' && 'text-level-beginner',
              level === 'INTERMEDIATE' && 'text-level-intermediate',
              level === 'ADVANCED' && 'text-level-advanced'
            )}
          >
            <LevelIcon className="tablet:size-5 size-4" />
            {LEVEL_COPY[level].label}
          </p>
          <p className="text-caption-medium line-clamp-1 text-gray-300">
            {LEVEL_COPY[level].description}
          </p>
        </div>

        <div
          className={cn(
            'flex size-5 items-center justify-center rounded-full border border-gray-500',
            checked && 'bg-brand-400 border-brand-400'
          )}
        >
          {checked && <div className="size-2 rounded-full bg-gray-800" />}
        </div>
      </div>
    </RadioGroupItem>
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
