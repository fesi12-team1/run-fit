import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type TimeValue = {
  hour: string;
  minute: string;
  ampm: 'AM' | 'PM';
};

type TimePickerProps = {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
};

export function TimePicker({ value, onChange }: TimePickerProps) {
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
          <SelectTrigger className="w-20">
            <SelectValue placeholder="hh" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* Minute */}
        <Select
          value={value.minute}
          onValueChange={(nextMinute) =>
            onChange({ ...value, minute: nextMinute })
          }
        >
          <SelectTrigger className="w-20">
            <SelectValue placeholder="mm" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 60 }).map((_, i) => {
              const val = String(i).padStart(2, '0');
              return (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {/* AM/PM */}
        <Select
          value={value.ampm}
          onValueChange={(nextAmpm) =>
            onChange({ ...value, ampm: nextAmpm as TimeValue['ampm'] })
          }
        >
          <SelectTrigger className="w-[90px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
