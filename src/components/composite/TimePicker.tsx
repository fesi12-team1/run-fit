'use client';

import { Label } from '@/components/ui/Label';
import Select from '@/components/ui/Select';

export type TimeValue = {
  hour: string;
  minute: string;
  ampm: 'AM' | 'PM';
};

type TimePickerProps = {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
};

export default function TimePicker({ value, onChange }: TimePickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        시간
      </Label>
      <div className="flex gap-2">
        {/* Hour */}
        <Select
          value={value.hour}
          onValueChange={(nextHour) => onChange({ ...value, hour: nextHour })}
        >
          <Select.SelectTrigger className="w-20">
            <Select.SelectValue placeholder="hh" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {Array.from({ length: 12 }).map((_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <Select.SelectItem key={val} value={val}>
                  {val}
                </Select.SelectItem>
              );
            })}
          </Select.SelectContent>
        </Select>

        {/* Minute */}
        <Select
          value={value.minute}
          onValueChange={(nextMinute) =>
            onChange({ ...value, minute: nextMinute })
          }
        >
          <Select.SelectTrigger className="w-20">
            <Select.SelectValue placeholder="mm" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            {Array.from({ length: 60 }).map((_, i) => {
              const val = String(i).padStart(2, '0');
              return (
                <Select.SelectItem key={val} value={val}>
                  {val}
                </Select.SelectItem>
              );
            })}
          </Select.SelectContent>
        </Select>

        {/* AM/PM */}
        <Select
          value={value.ampm}
          onValueChange={(nextAmpm) =>
            onChange({ ...value, ampm: nextAmpm as TimeValue['ampm'] })
          }
        >
          <Select.SelectTrigger className="w-20">
            <Select.SelectValue placeholder="AM/PM" />
          </Select.SelectTrigger>
          <Select.SelectContent>
            <Select.SelectItem value="AM">AM</Select.SelectItem>
            <Select.SelectItem value="PM">PM</Select.SelectItem>
          </Select.SelectContent>
        </Select>
      </div>
    </div>
  );
}
