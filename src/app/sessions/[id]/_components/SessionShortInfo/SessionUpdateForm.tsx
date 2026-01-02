import { useFormContext } from 'react-hook-form';
import DescriptionInputField from '@/app/crews/[id]/create-session/_components/DescriptionInputField';
import ImageInputField from '@/app/crews/[id]/create-session/_components/ImageInputField';
import Input from '@/components/ui/Input';

interface SessionUpdateFieldsProps {
  className?: string;
}

export default function SessionUpdateFields({
  className,
}: SessionUpdateFieldsProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Input
        label="세션 이름"
        {...register('name')}
        errorMessage={errors.name && String(errors.name.message)}
      />

      <div>
        <label className="text-caption-semibold tablet:text-body3-semibold mb-2 block text-gray-50">
          세션 이미지
        </label>
        <ImageInputField />
      </div>

      <DescriptionInputField />
    </div>
  );
}
