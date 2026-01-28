'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter } from 'next/navigation';
import { useDeleteSession } from '@/api/mutations/sessionMutations';
import Button from '@/components/ui/Button';
import ModalContent from '@/components/ui/ModalContent';
import { useModalController } from '@/provider/ModalProvider';
import { Session } from '@/types';

interface SessionDeleteModalProps {
  session: Session;
}

export default function SessionDeleteModal({
  session,
}: SessionDeleteModalProps) {
  const mutation = useDeleteSession(session.id);
  const router = useRouter();
  const { close } = useModalController();

  return (
    <ModalContent className="z-999">
      <ModalContent.Header>
        <VisuallyHidden asChild>
          <ModalContent.Title>세션을 삭제하시겠습니까?</ModalContent.Title>
        </VisuallyHidden>
      </ModalContent.Header>
      <ModalContent.Description className="text-white">
        삭제 후에는 되돌릴 수 없어요 정말 삭제하시겠어요?
      </ModalContent.Description>
      <ModalContent.Footer>
        <Button variant="neutral" onClick={() => close()}>
          취소
        </Button>
        <Button
          onClick={() => {
            mutation.mutate();
            close();
            router.replace('/sessions');
          }}
        >
          확인
        </Button>
      </ModalContent.Footer>
    </ModalContent>
  );
}
