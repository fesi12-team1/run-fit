'use client';

import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Calendar } from '@/components/composite/Calendar';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

interface DatePickerProps {
  value?: Date;
  onChange?: (next?: Date) => void;
  label?: string;
  inline?: boolean;
}

export function DatePicker({
  value,
  onChange,
  label = '날짜',
  inline = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolledDate, setUncontrolledDate] = useState<Date | undefined>(
    value
  );
  const isControlled = value !== undefined;
  const selectedDate = isControlled ? value : uncontrolledDate;

  const handleSelect = (next?: Date) => {
    if (!isControlled) setUncontrolledDate(next);
    onChange?.(next);
  };

  if (inline) {
    return (
      <div className="flex flex-col gap-2">
        <Label>{label}</Label>
        <Calendar
          mode="single"
          selected={selectedDate}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-56 justify-between font-normal"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {selectedDate ? (
                selectedDate.toLocaleDateString()
              ) : (
                <span className="text-muted-foreground">날짜를 선택하세요</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(next) => {
              handleSelect(next);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
