import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import CrewModal from '@/components/crew/CrewModal';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function CreateCrewButton() {
  const [currentModal, setCurrentModal] = useState<null | 'create' | 'login'>(
    null
  );

  const router = useRouter();

  const { data: user } = useQuery({ ...userQueries.me.info() });

  const handleOpen = () => {
    setCurrentModal(!user ? 'login' : 'create');
  };

  return (
    <>
      <Button
        className="tablet:right-16 tablet:bottom-16 fixed right-6 bottom-8 flex size-16 items-center justify-center rounded-3xl"
        onClick={handleOpen}
        aria-label="크루 생성하기"
      >
        <PlusIcon className="size-8 text-white" />
      </Button>
      {/* 크루 생성 모달 */}
      <CrewModal
        mode="create"
        open={currentModal === 'create'}
        handleCloseModal={() => setCurrentModal(null)}
        handleSuccess={() => setCurrentModal(null)}
      />
      {/* 로그인 유도 모달 */}
      <Modal
        open={currentModal === 'login'}
        onOpenChange={() => setCurrentModal(null)}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>
            크루를 생성하려면 로그인이 필요해요!
          </Modal.Description>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button
                className="text-body2-semibold flex-1 px-6 py-3"
                onClick={() => {
                  router.push(`/signin`);
                }}
              >
                로그인 하기
              </Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
