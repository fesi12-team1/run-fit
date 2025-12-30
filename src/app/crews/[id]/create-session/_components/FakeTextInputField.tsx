import { useId } from 'react';
import { cn } from '@/lib/utils';

export default function FakeTextInputField({ location }: { location: string }) {
  const inputId = useId();
  return (
    <div
      className={cn(location ? 'flex flex-col items-start gap-2' : 'hidden')}
    >
      <label
        htmlFor={inputId}
        className="text-caption-semibold tablet:text-body3-semibold text-gray-50"
      >
        장소
      </label>
      <input
        id={inputId}
        readOnly
        value={location}
        className="text-body2-medium w-full cursor-default rounded-xl bg-gray-800 px-4 py-2 text-white"
      />
    </div>
  );
}
