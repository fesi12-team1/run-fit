import { useFormContext } from 'react-hook-form';
import Textarea from '@/components/ui/Textarea';
import { SessionCreateFormValues } from '../_others/schema';

interface DetailInputFieldProps {
  className?: string;
}

export default function DetailInputField({ className }: DetailInputFieldProps) {
  const { register } = useFormContext<SessionCreateFormValues>();

  return (
    <div className={className}>
      <label
        htmlFor="detail"
        className="text-caption-semibold tablet:text-body3-semibold text-gray-50"
      >
        상세 내용
      </label>
      <Textarea
        id="detail"
        placeholder="세션에 대한 상세 설명을 작성해주세요"
        {...register('description')}
      />
    </div>
  );
}
