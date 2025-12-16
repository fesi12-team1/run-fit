'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Popover from '@/components/ui/FilterPopover';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateFilterProps {
  value?: DateRange;
  onChange: (value?: DateRange) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<
    { from?: Date; to?: Date } | undefined
  >(value);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempValue(value);
    }
  };

  const handleApply = () => {
    if (tempValue?.from) {
      onChange({
        from: tempValue.from,
        // to가 없으면 from(시작일)을 그대로 사용 (즉, 하루 선택)
        to: tempValue.to || tempValue.from,
      });
      setOpen(false);
    }
  };

  const handleReset = () => {
    setTempValue(undefined);
    onChange(undefined);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        hasSelected={Boolean(value?.from && value?.to)}
        size="lg"
      >
        {value?.from && value?.to
          ? value.from === value.to
            ? value.from.toLocaleDateString()
            : `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
          : '날짜'}
      </Popover.Trigger>

      <Popover.Content>
        <div className="flex flex-col items-center justify-center gap-6">
          <Calendar.Range selected={tempValue} onSelect={setTempValue} />
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
