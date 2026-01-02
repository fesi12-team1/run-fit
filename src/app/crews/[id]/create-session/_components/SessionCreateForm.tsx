'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { CreateSessionRequestBody } from '@/api/fetch/sessions';
import { useCreateSession } from '@/api/mutations/sessionMutations';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { formSchema, SessionCreateFormValues } from '../_others/schema';
import AddressInput from './AddressInput';
import DescriptionInputField from './DescriptionInputField';
import ImageInputField from './ImageInputField';
import LevelInputField from './LevelInputField';
import MaxParticipantsInputField from './MaxParticipantsInputField';
import NameInputField from './NameInputField';
import PaceInputField from './PaceInputField';
import RegisterAtInputField from './RegisterByInputField';
import SessionAtInputField from './SessionAtInputField';
import SubmitButton from './SubmitButton';

interface SessionCreateFormProps {
  crewId: number;
}

export default function SessionCreateForm({ crewId }: SessionCreateFormProps) {
  const isLaptopUp = useMediaQuery({ min: 'laptop' });
  const mutation = useCreateSession();
  const router = useRouter();

  const form = useForm<SessionCreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crewId: Number(crewId),
      name: '',
      description: '',
      image: '',
      location: '',
      city: '',
      district: '',
      coords: {
        lat: 0,
        lng: 0,
      },
      sessionAt: new Date().toISOString(),
      registerBy: new Date().toISOString(),
      level: 'INTERMEDIATE',
      maxParticipantCount: 2,
      pace: 400,
    },
    mode: 'onSubmit',
  });

  const handleSubmit = async (data: SessionCreateFormValues) => {
    try {
      await mutation.mutateAsync(data as unknown as CreateSessionRequestBody);
      toast.success('세션이 생성되었습니다!');
      router.push('/sessions');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : '세션 생성에 실패했습니다.'
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="laptop:flex-row laptop:gap-20 flex w-full flex-col items-stretch"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="laptop:w-[380px]">
          <div className="tablet:gap-6 mb-6 flex flex-col gap-5">
            <NameInputField />
            <ImageInputField />
          </div>
          <div className="laptop:gap-5 laptop:mb-0 mb-6 flex flex-col gap-6">
            <SessionAtInputField />
            <AddressInput />
            {isLaptopUp && <DescriptionInputField />}
          </div>
        </div>
        <div className="laptop:flex-1 laptop:gap-7 flex flex-col gap-6">
          <PaceInputField />
          <hr className="text-gray-800" />
          <LevelInputField />
          <hr className="text-gray-800" />
          <MaxParticipantsInputField />
          <RegisterAtInputField />
          {isLaptopUp || <DescriptionInputField />}
          <SubmitButton className="laptop:mt-5 mt-4" />
        </div>
      </form>
    </FormProvider>
  );
}
