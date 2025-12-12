'use client';

import { Label } from '@radix-ui/react-label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';

export interface DatePickerProps {
  value?: Date;
  onChange: (next?: Date) => void;
  label?: string;
  inline?: boolean;
  captionLayout?: 'dropdown' | 'label';
  placeholder?: string;
  disabled?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  label = '날짜',
  inline = false,
  captionLayout = 'dropdown',
  placeholder = '날짜를 선택하세요',
  disabled = false,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (next?: Date) => {
    if (disabled) return;
    onChange?.(next);
  };

  if (inline) {
    return (
      <div className={`flex flex-col gap-2 ${disabled ? 'opacity-50' : ''}`}>
        <Label>{label}</Label>
        <Calendar
          mode="single"
          selected={value}
          captionLayout={captionLayout}
          onSelect={handleSelect}
          disabled={disabled}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${disabled ? 'opacity-50' : ''}`}>
      <Label>{label}</Label>
      <Popover
        open={!disabled && open}
        onOpenChange={disabled ? undefined : setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outlined"
            className="w-56 justify-between font-normal"
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {value ? (
                value.toLocaleDateString()
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={value}
            captionLayout={captionLayout}
            onSelect={(next?: Date): void => {
              handleSelect(next);
              setOpen(false);
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
