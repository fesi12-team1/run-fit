import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Session } from '@/types';

export default function SessionUpdateModal({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  sessionId,
}: {
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (open: boolean) => void;
  sessionId: Session['id'];
}) {
  const isPc = useMediaQuery({ min: 'laptop' });

  return (
    <Modal open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
      <Modal.Content className="scrollbar-hidden laptop:max-w-[480px] laptop:rounded-xl laptop:bg-gray-800 laptop:h-auto laptop:max-h-[85dvh] h-dvh w-full bg-gray-900">
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
        {/* <SessionUpdateForm sessionId={sessionId} /> */}
        <Modal.Footer className="w-full">
          <Button className="w-full">완료</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
