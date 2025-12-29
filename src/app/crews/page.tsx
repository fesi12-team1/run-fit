'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ChevronLeft, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewCard from '@/components/crew/CrewCard';
import CrewCreateForm from '@/components/crew/CrewForm';
import Button from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Page() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(crewQueries.list({ sort: 'createdAtDesc' }));

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage);

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center">로딩 중...</div>
    );
  }

  if (isError) {
    return (
      <div className="h-main flex items-center justify-center text-red-500">
        크루 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <main className="h-main tablet:px-8 mx-auto flex max-w-[1120px] flex-col items-center justify-start px-6">
      <section className="flex w-full items-center justify-between">
        <div className="my-[45px]">
          <h2 className="text-title2-semibold mb-4">
            나와 FIT한 러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular text-gray-200">
            러닝 페이스와 선호하는 스타일에 딱 맞는 크루를 찾아보세요!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Dropdown size="lg">
              <Dropdown.Trigger>지역 전체</Dropdown.Trigger>
            </Dropdown>
          </div>
          <Dropdown size="lg">
            <Dropdown.Trigger className="bg-transparent">
              최근 생성순
            </Dropdown.Trigger>
            <Dropdown.Content>
              {['최근 생성순', '이름 오름차순', '이름 내림차순'].map((item) => (
                <Dropdown.Item key={item}>{item}</Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <div className="grid w-full grid-cols-1 gap-6">
          {data?.crews && data.crews.length > 0 ? (
            data.crews.map((crew) => <CrewCard key={crew.id} crew={crew} />)
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              등록된 크루가 없습니다.
            </div>
          )}
          <div ref={loadMoreRef} />
        </div>
      </section>
      <Button
        className="fixed right-16 bottom-16 flex size-18 items-center justify-center rounded-3xl"
        onClick={openModal}
        aria-label="크루 생성하기"
      >
        <PlusIcon className="size-8 text-white" />
      </Button>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content className="tablet:w-[484px] tablet:max-h-[80vh] tablet:h-[744px] h-dvh w-full items-start gap-6 bg-gray-800">
          <Modal.Header className="relative flex items-center justify-center">
            <button
              className="tablet:hidden absolute left-0"
              onClick={closeModal}
            >
              <ChevronLeft className="size-6 text-white" />
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
    </main>
  );
}
