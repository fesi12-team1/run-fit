import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { useUpdateSession } from '@/api/mutations/sessionMutations';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Button from '@/components/ui/Button';
import ModalContent from '@/components/ui/ModalContent';
import Spinner from '@/components/ui/Spinner';
import { useModalController } from '@/provider/ModalProvider';
import { Session } from '@/types';
import SessionUpdateFields from './SessionUpdateForm';

const schema = z.object({
  name: z
    .string()
    .min(1, '세션 이름을 입력해주세요.')
    .max(50, '세션 이름은 최대 50자까지 입력 가능합니다.'),
  image: z.url('유효한 이미지 URL을 입력해주세요.'),
  description: z
    .string()
    .max(500, '세션 설명은 최대 500자까지 입력 가능합니다.'),
});
type values = z.infer<typeof schema>;

interface SessionUpdateModalProps {
  session: Session;
}

export default function SessionUpdateModal({
  session,
}: SessionUpdateModalProps) {
  const form = useForm<values>({
    resolver: zodResolver(schema),

    defaultValues: {
      name: session?.name || '',
      image: session?.image || '',
      description: session?.description || '',
    },

    mode: 'onSubmit',
  });
  const { mutate, isPending } = useUpdateSession(session.id);
  const { close } = useModalController();

  const onSubmit = (data: values) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('세션 정보가 수정되었습니다!');
        close();
      },
      onError: (error) => {
        toast.error(error.message || '세션 정보 수정에 실패했습니다.');
      },
    });
  };

  return (
    <ModalContent className="scrollbar-hidden laptop:max-w-[480px] laptop:rounded-xl laptop:h-auto laptop:max-h-[85dvh] h-dvh w-full bg-gray-900">
      <FormProvider {...form}>
        <ModalContent.CloseButton className="laptop:block top-[26px] right-6 hidden" />

        <ModalContent.Header className="relative flex items-center justify-center">
          <button className="laptop:hidden absolute left-0">
            <ChevronLeft className="size-6 text-white" />
          </button>
          <ModalContent.Title className="laptop:m-0 ml-7">
            세션 수정하기
          </ModalContent.Title>
        </ModalContent.Header>

        <form
          id="update-session-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          <SessionUpdateFields />
        </form>

        <ModalContent.Footer className="w-full">
          <Button type="submit" form="update-session-form" className="w-full">
            완료
            {isPending && <Spinner />}
          </Button>
        </ModalContent.Footer>
      </FormProvider>
    </ModalContent>
  );
}
