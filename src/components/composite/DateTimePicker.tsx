'use client';

import { Button } from '@components/ui/Button';
import { Label } from '@components/ui/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/Popover';
import { CalendarIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DatePicker } from './DatePicker';
import TimePicker, { type TimeValue } from './TimePicker';

interface DateTimePickerProps {
  value?: { date?: Date; time: TimeValue };
  onChange?: (next: { date?: Date; time: TimeValue }) => void;
  label?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  label,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value?.date);
  const [time, setTime] = useState<TimeValue>(
    value?.time ?? { hour: '10', minute: '30', ampm: 'AM' }
  );
  const isControlled = value !== undefined;
  const currentDate = isControlled ? value?.date : date;
  const currentTime = isControlled ? (value?.time ?? time) : time;

  const today = useMemo(() => new Date(), []);
  const displayDate = currentDate ?? today;

  const handleDate = (next?: Date) => {
    if (!isControlled) setDate(next);
    onChange?.({ date: next, time: currentTime });
  };
  const handleTime = (next: TimeValue) => {
    if (!isControlled) setTime(next);
    onChange?.({ date: currentDate, time: next });
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>{label ?? '날짜/시간'}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-56 justify-between">
            <span>{displayDate.toLocaleDateString()}</span>
            <span>
              {currentTime.hour}:{currentTime.minute} {currentTime.ampm}
            </span>
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <div className="flex flex-col items-center">
            <DatePicker
              inline
              value={currentDate}
              onChange={handleDate}
              label="날짜"
            />
            <TimePicker value={currentTime} onChange={handleTime} />
          </div>
          <div className="flex justify-end mt-4">
            <Button size="sm" disabled={!date} onClick={() => setOpen(false)}>
              완료
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
