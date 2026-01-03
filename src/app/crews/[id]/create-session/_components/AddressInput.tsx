import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { useDaumPostcode } from '@/provider/DaumPostcodeProvider';
import { useKakaoMap } from '@/provider/KakaoMapProvider';
import {
  citySchema,
  districtSchema,
  SessionCreateFormValues,
} from '../_others/schema';
import FakeTextInputField from './FakeTextInputField';
import SearchAddressButton from './SearchAddressButton';

interface AddressInputProps {
  className?: string;
}

export default function AddressInput({ className }: AddressInputProps) {
  const { watch, setValue } = useFormContext<SessionCreateFormValues>();
  const { openAddressSearch } = useDaumPostcode();
  const { convertAddressToCoords } = useKakaoMap();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <FakeTextInputField location={watch('location')} />
      <SearchAddressButton
        location={watch('location')}
        onClick={() => {
          openAddressSearch((data) => {
            const location = data.address;
            const cityParsed = citySchema.safeParse(data.sido);
            const districtParsed = districtSchema.safeParse(data.sigungu);

            setValue('location', location, {
              shouldDirty: true,
              shouldValidate: true,
            });

            if (cityParsed.success) {
              setValue('city', cityParsed.data, {
                shouldDirty: true,
                shouldValidate: true,
              });
            } else {
              setValue('city', '', { shouldDirty: true, shouldValidate: true });
            }

            if (districtParsed.success) {
              setValue('district', districtParsed.data, {
                shouldDirty: true,
                shouldValidate: true,
              });
            } else {
              setValue('district', '', {
                shouldDirty: true,
                shouldValidate: true,
              });
            }

            convertAddressToCoords(data.address, (coords) => {
              if (!coords) return;
              setValue('coords', coords, { shouldDirty: true });
            });
          });
        }}
      />
    </div>
  );
}
