'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { formatTimeText, secondsToMinutes } from '@/lib/pace';
import { cn } from '@/lib/utils';

const CIRCLE_COUNT = 9;
const GAP_COUNT = CIRCLE_COUNT + 1;
const CIRCLE_SIZE = 6;
const PERCENT_PER_STEP = 100 / GAP_COUNT;
const OFFSET_PX = CIRCLE_SIZE - (CIRCLE_COUNT * CIRCLE_SIZE) / GAP_COUNT;

interface PaceSliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    'value' | 'onValueChange' | 'defaultValue'
  > {
  // Radix의 배열 타입을 number로 재정의
  value: number | null;
  onValueChange: (value: number) => void;
}

export default function PaceSlider({
  className,
  value,
  min = 240,
  max = 600,
  step = 10,
  onValueChange,
  ...props
}: PaceSliderProps) {
  const centerValue = (min + max) / 2;
  // Radix에 전달할 배열 타입으로 변환
  const radixValue = [value ?? centerValue];
  const handleRadixValueChange = (newValue: number[]) => {
    onValueChange(newValue[0]);
  };
  return (
    <div className="w-full">
      <div className="text-body2-semibold pt-3 pb-3.5 text-center text-white">
        {value === null
          ? '- 분/km'
          : `${formatTimeText(...secondsToMinutes(value))}/km`}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-body3-regular shrink-0 text-gray-300">
          {formatTimeText(...secondsToMinutes(min))}
        </div>
        <SliderPrimitive.Root
          data-slot="slider"
          aria-label="러닝 페이스 선택"
          value={radixValue}
          min={min}
          max={max}
          onValueChange={handleRadixValueChange}
          className={cn(
            'relative flex w-full touch-none items-center select-none data-disabled:opacity-50'
          )}
          step={step}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              'relative grow overflow-hidden rounded-full bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full',
              className
            )}
          >
            {Array.from({ length: CIRCLE_COUNT }, (_, index) => {
              return (
                <div
                  key={index}
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-gray-600"
                  style={{
                    left: `calc(${(index + 1) * PERCENT_PER_STEP}% + ${(index + 1) * OFFSET_PX}px - ${CIRCLE_SIZE}px)`,
                  }}
                />
              );
            })}
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="border-brand-400 ring-brand-400/50 block size-6 shrink-0 rounded-full border-2 bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Root>
        <div className="text-body3-regular shrink-0 text-gray-300">
          {formatTimeText(...secondsToMinutes(max))}
        </div>
      </div>
    </div>
  );
}
