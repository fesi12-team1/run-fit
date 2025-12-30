import { Controller, useFormContext } from 'react-hook-form';
import PaceSlider from '@/components/ui/PaceSlider';
import { SessionCreateFormValues } from '../_others/schema';

export default function PaceInputField() {
  const { control } = useFormContext<SessionCreateFormValues>();

  return (
    <div className="flex flex-col gap-4">
      <label>
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          {'페이스 (분/km)'}
        </p>
        <p className="tablet:text-body3-semibold text-caption-regular text-gray-300">
          세션에서 함께 달릴 기준 페이스를 선택해주세요!
        </p>
      </label>

      <Controller
        control={control}
        name="pace"
        render={({ field: { onChange, value } }) => (
          <PaceSlider
            value={value}
            onValueChange={(nextPace) => {
              onChange(nextPace);
            }}
          />
        )}
      />
    </div>
  );
}
