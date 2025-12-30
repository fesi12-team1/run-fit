'use client';

import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { useMemo, useState } from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg?react';
import { cn } from '@/lib/utils';

const MINUTES_IN_DAY = 24 * 60;
const STEP = 15;

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function toLabel(time: number) {
  const h = Math.floor(time / 60);
  const m = time % 60;
  return `${pad2(h)}:${pad2(m)}`;
}

function clampTime(time: number) {
  return Math.min(Math.max(time, 0), MINUTES_IN_DAY - 1);
}

interface TimePickerProps {
  value: number;
  onChange: (next: number) => void;
  className?: string;
}

export default function TimePicker({
  value,
  onChange,
  className,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);

  const timeLabel = toLabel(value);

  const timeList = useMemo(
    () =>
      Array.from({ length: MINUTES_IN_DAY / STEP }, (_, i) => {
        const value = i * STEP;
        return { value, label: toLabel(value) };
      }),
    []
  );

  const onSelect = (value: number) => {
    onChange(clampTime(value));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'relative flex items-center justify-between gap-2 rounded-lg bg-gray-800 px-3 py-2 text-gray-200',
          className
        )}
      >
        <p className="text-body3-medium tabular-nums">{timeLabel}</p>
        <ArrowDown className="size-6" />
      </PopoverTrigger>

      <PopoverPortal>
        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={4}
          className="w-(--radix-popover-trigger-width) overflow-hidden rounded-lg border border-gray-500 bg-gray-700"
        >
          <div className="h-56 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent">
            {timeList.map((t) => (
              <button
                key={t.value}
                type="button"
                className={cn(
                  'text-body3-medium w-full px-4 py-2 text-left hover:bg-gray-600',
                  t.value === value && 'bg-gray-600'
                )}
                onClick={() => onSelect(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
}
