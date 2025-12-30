'use client';

import { ChevronLeft, PlusIcon } from 'lucide-react';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import CrewCreateForm from '@/components/crew/CrewForm';
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
      <CrewCreateModal />
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

function CrewCreateModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className="fixed right-16 bottom-16 flex size-18 items-center justify-center rounded-3xl"
        onClick={openModal}
        aria-label="크루 생성하기"
      >
        <PlusIcon className="size-8 text-white" />
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content
          className={
            'tablet:w-[484px] tablet:gap-4 tablet:h-fit tablet:overflow-hidden tablet:items-center h-dvh w-full items-start bg-gray-800'
          }
        >
          <Modal.Header className="relative flex items-center justify-center">
            <button
              className="tablet:hidden absolute left-0"
              onClick={closeModal}
              aria-label="뒤로 가기"
            >
              <ChevronLeft className="size-6 text-white" aria-hidden="true" />
            </button>
            <Modal.Title className="tablet:m-0 ml-7">크루 생성하기</Modal.Title>
          </Modal.Header>
          <Modal.CloseButton
            onClick={closeModal}
            className="tablet:block top-[26px] right-6 hidden"
          />
          <div className="scrollbar-hidden w-full overflow-y-auto px-0.5">
            <CrewCreateForm onSuccessHandler={closeModal} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}
