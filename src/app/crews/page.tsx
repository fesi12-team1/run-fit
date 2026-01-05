'use client';

import { useQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { userQueries } from '@/api/queries/userQueries';
import CrewModal from '@/components/crew/CrewModal';
import CrewPageContent from '@/components/crew/CrewPageContent';
import CrewPageContentErrorFallback from '@/components/crew/CrewPageContent/CrewPageContentErrorFallback';
import CrewPageContentSkeleton from '@/components/crew/CrewPageContent/CrewPageContentSkeleton';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

export default function Page() {
  return (
    <Layout>
      <ErrorBoundary fallback={<CrewPageContentErrorFallback />}>
        <Suspense fallback={<CrewPageContentSkeleton />}>
          <CrewPageContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start p-6">
      <Header />
      {children}
      <CreateCrewButton />
    </main>
  );
}

function Header() {
  return (
    <div className="tablet:flex hidden w-full items-center justify-between">
      <div className="my-[45px]">
        <h1 className="text-title2-semibold mb-1 text-gray-50">
          나와 FIT한 러닝 메이트를 찾다
        </h1>
        <p className="text-body3-regular text-gray-200">
          나와 잘 맞는 러닝 크루를 찾아보세요!
        </p>
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
