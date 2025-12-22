'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Popover from '@/components/ui/FilterPopover';
import TimeSlider from '@/components/ui/TimeSlider';
import { formatMinutesToKoreanTime } from '@/lib/time';

interface TimeFilterProps {
  value?: [number, number];
  onChange: (value?: [number, number]) => void;
}

export default function TimeFilter({ value, onChange }: TimeFilterProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<[number, number]>(
    value || [0, 720]
  );

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempValue(value || [0, 720]);
    }
  };

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  const handleReset = () => {
    setTempValue([0, 720]);
    onChange(undefined);
    setOpen(false);
  };

  // 버튼에 표시될 텍스트 로직
  const getLabel = () => {
    if (!value) return '시간';

    const [start, end] = value;
    const isAllDay = start === 0 && end === 1440;
    const isSame = start === end;

    if (isAllDay) return '하루 종일';
    if (isSame) return formatMinutesToKoreanTime(start);
    return `${formatMinutesToKoreanTime(start)} - ${formatMinutesToKoreanTime(end)}`;
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger hasSelected={Boolean(value)} size="lg">
        {getLabel()}
      </Popover.Trigger>

      <Popover.Content>
        <div className="flex w-[320px] flex-col items-center justify-center gap-6">
          <div className="w-full px-3">
            <TimeSlider value={tempValue} onValueChange={setTempValue} />
          </div>

          <div className="flex w-full items-center justify-center gap-3">
            <button className="py-2 pr-3 pl-6" onClick={handleReset}>
              초기화
            </button>
            <Button className="flex-1" onClick={handleApply}>
              적용하기
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
