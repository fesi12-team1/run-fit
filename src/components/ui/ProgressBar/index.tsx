'use client';

import { Label } from '@radix-ui/react-label';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ProgressBarProps = React.ComponentProps<typeof ProgressPrimitive.Root>;

export default function ProgressBar({
  className,
  value,
  max,
  ...props
}: ProgressBarProps) {
  const [animatedTranslateX, setAnimatedTranslateX] = useState(100);

  const safeMax = typeof max === 'number' && max > 0 ? max : 1;
  const rawValue = typeof value === 'number' ? value : 0;
  const clampedValue = Math.round(Math.min(Math.max(rawValue, 0), safeMax));

  const progressRatio = clampedValue / safeMax;
  const translateX = 100 - progressRatio * 100;

  useEffect(() => {
    setAnimatedTranslateX(translateX);
  }, [translateX]);

  return (
    <div className="flex h-[38px] flex-col">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm">{clampedValue}명</Label>
        <div className="flex items-center gap-0.5">
          <span>/</span>
          <Label className="text-sm">{safeMax}명 모집</Label>
        </div>
      </div>
      <ProgressPrimitive.Root
        className={cn(
          'relative h-2.5 w-full overflow-hidden rounded-md bg-gray-500',
          className
        )}
        data-slot="progress"
        max={safeMax}
        value={clampedValue}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="from-brand-200 via-brand-400 to-brand-500 h-full w-full flex-1 rounded-md bg-linear-to-r transition-transform duration-500 ease-out will-change-transform"
          data-slot="progress-indicator"
          style={{
            transform: `translateX(-${animatedTranslateX}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
