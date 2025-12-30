'use client';

import Calendar from '@components/ui/Calendar';
import Input from '@components/ui/Input';
import Label from '@components/ui/Label';
import * as Popover from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

function formatSingle(date?: Date) {
  if (!date) return '';
  return date.toLocaleDateString('ko-KR');
}

function formatRange(range?: DateRange) {
  if (!range?.from) return '';
  if (!range.to) return formatSingle(range.from);
  return `${formatSingle(range.from)} ~ ${formatSingle(range.to)}`;
}
interface DatePickerSingleProps {
  mode: 'single';
  label: string;
  placeholder: string;
  id?: string;
  value?: Date;
  onChange: (value: Date) => void;
  className?: string;
}

interface DatePickerRangeProps {
  mode: 'range';
  label: string;
  placeholder: string;
  id?: string;
  value?: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export default function DatePicker({
  mode,
  label,
  placeholder,
  id,
  value,
  onChange,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const displayValue =
    mode === 'single' ? formatSingle(value) : formatRange(value);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        value={displayValue}
        placeholder={placeholder}
        readOnly
        onFocus={() => setOpen(true)}
        onMouseDown={() => setOpen(true)}
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
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                className="flex size-5 items-center justify-center"
              >
                <CalendarIcon />
              </button>
            </Popover.Trigger>
            <Popover.Content>
              {mode === 'single' ? (
                <Calendar.Single
                  selected={value}
                  onSelect={(nextDate) => {
                    if (!nextDate) return;
                    onChange(nextDate);
                    setOpen(false);
                  }}
                />
              ) : (
                <Calendar.Range
                  selected={value}
                  onSelect={(nextRange) => {
                    if (!nextRange) return;
                    onChange(nextRange);
                    if (nextRange.from && nextRange.to) {
                      setOpen(false);
                    }
                  }}
                />
              )}
            </Popover.Content>
          </Popover.Root>
        }
      />
    </div>
  );
}
