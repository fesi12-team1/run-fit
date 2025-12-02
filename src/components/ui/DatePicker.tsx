import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';

interface DatePickerProps {
  value?: Date;
  onChange?: (next?: Date) => void;
  label?: string;
}

export function DatePicker({
  value,
  onChange,
  label = '날짜',
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Calendar
        mode="single"
        selected={value}
        captionLayout="dropdown"
        onSelect={onChange}
      />
    </div>
  );
}
