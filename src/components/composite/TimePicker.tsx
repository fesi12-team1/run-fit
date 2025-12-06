'use client';

import Label from '@/components/ui/Label';
import Select from '@/components/ui/Select';

export type TimeValue = {
  hour: string;
  minute: string;
  ampm: 'AM' | 'PM';
};

export interface TimePickerProps {
  label?: string;
  value: TimeValue;
  onChange: (value: TimeValue) => void;
}

export default function TimePicker({
  label,
  value,
  onChange,
}: TimePickerProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        {label || '시간'}
      </Label>
      <div className="flex gap-2">
        {/* Hour */}
        <Select
          value={value.hour}
          onValueChange={(nextHour) => onChange({ ...value, hour: nextHour })}
        >
          <Select.Trigger id="time-picker" className="w-20">
            <Select.Value placeholder="hh" />
          </Select.Trigger>
          <Select.Content>
            {Array.from({ length: 12 }).map((_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <Select.Item key={val} value={val}>
                  {val}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select>

        {/* Minute */}
        <Select
          value={value.minute}
          onValueChange={(nextMinute) =>
            onChange({ ...value, minute: nextMinute })
          }
        >
          <Select.Trigger className="w-20">
            <Select.Value placeholder="mm" />
          </Select.Trigger>
          <Select.Content>
            {Array.from({ length: 60 }).map((_, i) => {
              const val = String(i).padStart(2, '0');
              return (
                <Select.Item key={val} value={val}>
                  {val}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select>

        {/* AM/PM */}
        <Select
          value={value.ampm}
          onValueChange={(nextAmpm) =>
            onChange({ ...value, ampm: nextAmpm as TimeValue['ampm'] })
          }
        >
          <Select.Trigger className="w-20">
            <Select.Value placeholder="AM/PM" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="AM">AM</Select.Item>
            <Select.Item value="PM">PM</Select.Item>
          </Select.Content>
        </Select>
      </div>
    </div>
  );
}
