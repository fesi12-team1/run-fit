import * as RadioGroup from '@radix-ui/react-radio-group';
import { Controller, useFormContext } from 'react-hook-form';
import SessionLevelCard from '@/components/session/SessionLevelCard';
import { SessionCreateFormValues } from '../_others/schema';

export default function LevelInputField() {
  const { control } = useFormContext<SessionCreateFormValues>();

  return (
    <fieldset>
      <legend className="mb-4 block">
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          난이도
        </p>
        <p className="tablet:text-body3-semibold text-caption-regular text-gray-300">
          페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요
        </p>
      </legend>

      <Controller
        control={control}
        name="level"
        render={({ field: { onChange, value } }) => (
          <RadioGroup.Root
            className="flex flex-col gap-3"
            value={value}
            onValueChange={(val) => {
              onChange(val);
            }}
          >
            <SessionLevelCard
              level="BEGINNER"
              value="BEGINNER"
              checked={value === 'BEGINNER'}
            />
            <SessionLevelCard
              level="INTERMEDIATE"
              value="INTERMEDIATE"
              checked={value === 'INTERMEDIATE'}
            />
            <SessionLevelCard
              level="ADVANCED"
              value="ADVANCED"
              checked={value === 'ADVANCED'}
            />
          </RadioGroup.Root>
        )}
      />
    </fieldset>
  );
}
