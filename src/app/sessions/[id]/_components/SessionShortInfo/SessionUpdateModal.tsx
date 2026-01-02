import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import z from 'zod';
import { useUpdateSession } from '@/api/mutations/sessionMutations';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
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

export default function SessionUpdateModal({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  session,
}: {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (open: boolean) => void;
  session: Session;
}) {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

    defaultValues: {
      name: session?.name || '',
      image: session?.image || '',
      description: session?.description || '',
    },

    mode: 'onSubmit',
  });

  const mutation = useUpdateSession(session.id);
  const onSubmit = (data: z.infer<typeof schema>) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setIsUpdateModalOpen(false);
      },
    });
  };

  return (
    <Modal open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
      <Modal.Content className="scrollbar-hidden laptop:max-w-[480px] laptop:rounded-xl laptop:h-auto laptop:max-h-[85dvh] h-dvh w-full bg-gray-900">
        <FormProvider {...methods}>
          <Modal.CloseButton
            onClick={() => setIsUpdateModalOpen(false)}
            className="laptop:block top-[26px] right-6 hidden"
          />

          <Modal.Header className="relative flex items-center justify-center">
            <button
              className="laptop:hidden absolute left-0"
              onClick={() => setIsUpdateModalOpen(false)}
            >
              <ChevronLeft className="size-6 text-white" />
            </button>
            <Modal.Title className="laptop:m-0 ml-7">세션 수정하기</Modal.Title>
          </Modal.Header>

          <form
            id="update-session-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full"
          >
            <SessionUpdateFields />
          </form>

          <Modal.Footer className="w-full">
            <Button type="submit" form="update-session-form" className="w-full">
              완료
              {mutation.isPending && <Spinner />}
            </Button>
          </Modal.Footer>
        </FormProvider>
      </Modal.Content>
    </Modal>
  );
}
