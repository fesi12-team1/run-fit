import { useFormContext } from 'react-hook-form';
import Textarea from '@/components/ui/Textarea';
import { SessionCreateFormValues } from '../_others/schema';

interface DetailInputFieldProps {
  className?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export default function DetailInputField({
  className,
  errorMessage,
  disabled,
}: DetailInputFieldProps) {
  const { register } = useFormContext<SessionCreateFormValues>();

  return (
    <Textarea
      placeholder="세션에 대한 상세 설명을 작성해주세요"
      {...register('description')}
      label="세션 설명"
      disabled={disabled}
      errorMessage={errorMessage}
      className={className}
    />
  );
}
