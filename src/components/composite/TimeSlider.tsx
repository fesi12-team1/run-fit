'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { formatMinutesToKoreanTime } from '@/lib/time';
import { cn } from '@/lib/utils';

interface TimeSliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    'defaultValue' | 'min' | 'max' | 'value' | 'onValueChange'
  > {
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export default function TimeSlider({
  className,
  value,
  step = 10,
  onValueChange,
  ...props
}: TimeSliderProps) {
  const isAllDay = value[0] === 0 && value[1] === 1440;
  const isSame = value[0] === value[1];
  return (
    <div className="w-full">
      <div className="text-body2-semibold mb-7 flex justify-center gap-3 text-white">
        {isAllDay ? (
          <p>하루 종일</p>
        ) : isSame ? (
          <p>{`${formatMinutesToKoreanTime(value[0])}`}</p>
        ) : (
          <>
            <p>{`${formatMinutesToKoreanTime(value[0])}`}</p>
            <p>~</p>
            <p>{`${formatMinutesToKoreanTime(value[1])}`}</p>
          </>
        )}
      </div>
      <SliderPrimitive.Root
        data-slot="slider"
        aria-label="러닝 시간 선택"
        value={value}
        min={0}
        max={1440}
        onValueChange={onValueChange}
        step={step}
        className={cn(
          'relative flex w-full touch-none items-center select-none data-disabled:opacity-50',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            'relative grow overflow-hidden rounded-full bg-gray-800 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full'
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              'absolute bg-brand-400 data-[orientation=horizontal]:h-full'
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: value.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className="block size-6 shrink-0 rounded-full border-2 border-brand-400 bg-white shadow-sm ring-[#6C6BE2]/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="text-body3-regular mt-3 flex justify-between text-gray-300">
        <div>0시</div>
        <div>24시</div>
      </div>
    </div>
  );
}
