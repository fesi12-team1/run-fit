'use client';

import Button from '@components/ui/Button';
import Label from '@components/ui/Label';
import Popover from '@components/ui/Popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import DatePicker from './DatePicker';
import TimePicker, { type TimeValue } from './TimePicker';

export interface DateTimeValue {
  date?: Date;
  time: TimeValue;
}

export interface DateTimePickerProps {
  value?: DateTimeValue | undefined;
  placeholder?: string;
  onChange: (next: DateTimeValue) => void;
  label?: string;
  disabled?: boolean;
}

const DEFAULT_TIME: TimeValue = {
  hour: '',
  minute: '',
  ampm: 'AM',
};

function isIncompleteTime(time: TimeValue) {
  return !time.hour || !time.minute;
}

export default function DateTimePicker({
  value,
  onChange,
  label = '날짜/시간',
  placeholder = '날짜와 시간을 선택하세요',
  disabled = false,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);

  const currentValue: DateTimeValue = {
    date: value?.date ?? undefined,
    time: value?.time ?? DEFAULT_TIME,
  };

  const handleDate = (next?: Date) => {
    onChange({
      date: next,
      time: currentValue.time,
    });
  };

  const handleTime = (next: TimeValue) => {
    onChange({
      date: currentValue.date,
      time: next,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>

      <Popover
        open={!disabled && open}
        onOpenChange={disabled ? undefined : setOpen}
      >
        <Popover.Trigger asChild>
          <Button
            variant="outline"
            className="w-56 justify-between"
            disabled={disabled}
          >
            <span className="flex items-center gap-2">
              {currentValue.date && !isIncompleteTime(currentValue.time) ? (
                <>
                  {currentValue.date.toLocaleDateString()}{' '}
                  {currentValue.time.hour}:{currentValue.time.minute}{' '}
                  {currentValue.time.ampm}
                </>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </Popover.Trigger>

        <Popover.Content className="p-4">
          <div className="flex flex-col items-center gap-4">
            <DatePicker
              inline
              label="날짜"
              value={currentValue.date}
              onChange={handleDate}
            />

            <TimePicker value={currentValue.time} onChange={handleTime} />
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              size="sm"
              disabled={
                !currentValue.date || isIncompleteTime(currentValue.time)
              }
              onClick={() => setOpen(false)}
            >
              완료
            </Button>
          </div>
        </Popover.Content>
      </Popover>
    </div>
  );
}
