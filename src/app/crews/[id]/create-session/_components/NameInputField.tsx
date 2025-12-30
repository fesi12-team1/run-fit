import { useFormContext } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { SessionCreateFormValues } from '../_others/schema';

export default function NameInputField() {
  const { register } = useFormContext<SessionCreateFormValues>();

  return (
    <Input
      label="세션 이름"
      id="session-name"
      placeholder="세션 이름을 입력하세요"
      {...register('name')}
    />
  );
}
