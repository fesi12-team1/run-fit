'use client';

import { CalendarIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePicker, TimeValue } from './TimePicker';

type DateTimePickerProps = {
  label?: string;
};

export function DateTimePicker({ label }: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<TimeValue>({
    hour: '10',
    minute: '30',
    ampm: 'AM',
  });
  const today = useMemo(() => new Date(), []);
  const displayDate = date ?? today;

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="datetime-picker" className="px-1">
        {label || '날짜/시간'}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="datetime-picker"
            className="w-56 justify-between font-normal"
          >
            <div className="flex items-start gap-2">
              <span>{displayDate.toLocaleDateString()}</span>
              <span>
                {time.hour}:{time.minute} {time.ampm}
              </span>
            </div>
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-4"
          align="start"
          sideOffset={8}
        >
          <div className="flex flex-col items-center">
            <Label htmlFor="date-picker" className="px-1 text-left w-full">
              날짜
            </Label>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={setDate}
              fromYear={2010}
              toYear={2030}
            />
            <TimePicker value={time} onChange={setTime} />
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
