'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { userQueries } from '@/api/queries/userQueries';
import CrewModal from '@/components/crew/CrewModal';
import CrewPageContent from '@/components/crew/CrewPageContent';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function Page() {
  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <div className="h-main flex items-center justify-center text-red-500">
            크루 목록을 불러오는데 실패했습니다.
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="h-main flex items-center justify-center text-gray-300">
              로딩 중...
            </div>
          }
        >
          <CrewPageContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start px-6">
      <Header />
      {children}
      <CreateCrewButton />
    </main>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="my-[45px]">
        <h2 className="text-title2-semibold mb-4">
          나와 FIT한 러닝 메이트를 찾다
        </h2>
        <span className="text-body3-regular text-gray-200">
          러닝 페이스와 선호하는 스타일에 딱 맞는 크루를 찾아보세요!
        </span>
      </div>
    </div>
  );
}

function CreateCrewButton() {
  const [currentModal, setCurrentModal] = useState<null | 'create' | 'login'>(
    null
  );

  const router = useRouter();

  const { data: user } = useQuery({ ...userQueries.me.info() });

  const handleOpen = () => {
    if (!user) {
      setCurrentModal('login');
      return;
    }

    setCurrentModal('create');
  };

  const closeModal = () => setCurrentModal(null);

  return (
    <>
      <Button
        className="fixed right-16 bottom-16 flex size-18 items-center justify-center rounded-3xl"
        onClick={handleOpen}
        aria-label="크루 생성하기"
      >
        <PlusIcon className="size-8 text-white" />
      </Button>
      {/* 크루 생성 모달 */}
      <CrewModal
        mode="create"
        open={currentModal === 'create'}
        onOpenChange={(open) => !open && closeModal()}
      />
      {/* 로그인 유도 모달 */}
      <Modal
        open={currentModal === 'login'}
        onOpenChange={(open) => !open && closeModal()}
      >
        <Modal.Content className="flex h-[200px] w-[360px] flex-col gap-7">
          <Modal.Title />
          <Modal.CloseButton />
          <Modal.Description>
            크루에 가입하려면 로그인이 필요해요!
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
