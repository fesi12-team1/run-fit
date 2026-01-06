'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { cn } from '@/lib/utils';

interface CompletedSessionsProps {
  crewId: number;
}

export default function CompletedSessions({ crewId }: CompletedSessionsProps) {
  const {
    data: completedSessions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery(
    sessionQueries.infiniteList({
      size: 6,
      crewId,
      sort: 'sessionAtAsc',
      status: 'CLOSED',
    })
  );

  const completedRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (!completedSessions || completedSessions.sessions.length === 0) {
    return (
      <span
        className={cn(
          'self-center justify-self-center text-gray-300',
          'text-body3-regular py-2.5',
          'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
        )}
      >
        아직 마감된 세션이 없어요
      </span>
    );
  }

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-700 *:py-2">
        {completedSessions.sessions.slice(0, 3).map((session) => (
          <CompletedSessionCard key={session.id} session={session} />
        ))}
      </div>
      <Modal>
        <Modal.Trigger aria-label="마감된 세션 전체보기" asChild>
          <Button
            variant="neutral"
            size="xs"
            className={cn(
              'self-center rounded-[10px]',
              'tablet:w-[620px] laptop:w-[140px] w-[270px]'
            )}
            disabled={completedSessions.sessions.length < 4}
          >
            더 보기
          </Button>
        </Modal.Trigger>
        <Modal.Content
          className={cn(
            'tablet:h-[620px] tablet:w-[400px] tablet:gap-4 flex flex-col gap-5 overflow-y-scroll bg-gray-800'
          )}
          fullscreenWhenMobile
        >
          <Modal.Title className="relative flex w-full items-start gap-2 self-start">
            <Modal.EmptyCloseButton className="tablet:hidden my-0.5 flex">
              <ChevronLeft className="size-6" />
            </Modal.EmptyCloseButton>
            <span className="sr-only">마감된 세션</span>
            <Modal.CloseButton className="tablet:flex absolute top-0 right-0 my-0.5 hidden" />
          </Modal.Title>
          {completedSessions.sessions.map((session) => (
            <CompletedSessionCard key={session.id} session={session} />
          ))}
          <div ref={completedRef} className="h-5" />
          {isFetchingNextPage && <Spinner.Scroll />}
        </Modal.Content>
      </Modal>
    </>
  );
}
