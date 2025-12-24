'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Popover from '@/components/ui/FilterPopover';

interface DateFilterProps {
  value?: DateRange;
  onChange: (value?: DateRange) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  const [open, setOpen] = useState(false);

  const [tempValue, setTempValue] = useState<DateRange | undefined>(value);

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
        to: tempValue.to || tempValue.from,
      });
      setOpen(false);
    }
  };

  const handleReset = () => {
    setTempValue(undefined);
    onChange(undefined);
    setOpen(false);
  };

  const getLabel = () => {
    if (value?.from && value?.to) {
      if (value.from.getTime() === value.to.getTime()) {
        return value.from.toLocaleDateString();
      }
      return `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`;
    }
    return '날짜';
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        hasSelected={Boolean(value?.from && value?.to)}
        size="lg"
      >
        {getLabel()}
      </Popover.Trigger>

      <Popover.Content>
        <div className="flex shrink-0 flex-col items-center justify-center gap-6">
          <Calendar.Range selected={tempValue} onSelect={setTempValue} />
          <div className="flex w-full items-center justify-center gap-3">
            <button className="py-2 pr-3 pl-6" onClick={handleReset}>
              초기화
            </button>
            <Button
              className="flex-1"
              onClick={handleApply}
              disabled={!tempValue?.from}
            >
              적용하기
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
