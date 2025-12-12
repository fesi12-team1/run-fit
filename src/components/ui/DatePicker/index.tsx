'use client';

import Calendar from '@components/ui/Calendar';
import Input from '@components/ui/Input';
import Label from '@components/ui/Label';
import * as Popover from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('ko-KR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

interface DatePickerProps {
  label: string;
  placeholder: string;
  value?: Date;
  onChange: (value: Date) => void;
}

export default function DatePicker({
  label,
  placeholder,
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const displayValue = formatDate(value);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="date">{label}</Label>
      <Input
        id="date"
        value={displayValue}
        placeholder={placeholder}
        readOnly
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        RightElement={
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button
                tabIndex={-1}
                onMouseDown={(e) => e.preventDefault()}
                className="flex size-5 items-center justify-center"
              >
                <CalendarIcon />
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Calendar
                mode="single"
                selected={value}
                onSelect={(nextDate) => {
                  if (!nextDate) return;
                  onChange(nextDate);
                  setOpen(false);
                }}
              />
            </Popover.Content>
          </Popover.Root>
        }
      />
    </div>
  );
}
