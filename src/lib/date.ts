import { TimeValue } from '@/components/composite/TimePicker';

export function formatSessionAt(
  date: Date,
  time: TimeValue,
  timezoneOffset = '+09:00'
) {
  const hourNumber = Number(time.hour);
  const hour24 =
    time.ampm === 'PM'
      ? hourNumber === 12
        ? 12
        : hourNumber + 12
      : hourNumber % 12;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(hour24).padStart(2, '0');
  const minute = time.minute;

  return `${year}-${month}-${day}T${hour}:${minute}:00${timezoneOffset}`;
}
