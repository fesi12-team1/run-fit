'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { userQueries } from '@/api/queries/userQueries';
import ReviewModal from '@/components/my/ReviewModal';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import SessionCard from '@/components/session/SessionCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ParticipatingSession, Session } from '@/types';

export default function Page() {
  const router = useRouter();
  const isMobile = useMediaQuery({ max: 'tablet' });

  const [open, setOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const { data: userInfo } = useQuery(userQueries.me.info());
  const {
    data: scheduledSessions,
    fetchNextPage: fetchNextScheduled,
    hasNextPage: hasNextScheduled,
    isFetchingNextPage: isFetchingNextScheduled,
    isLoading: isLoadingScheduled,
  } = useInfiniteQuery(userQueries.me.sessions.participating('SCHEDULED'));

  const {
    data: completedSessions,
    fetchNextPage: fetchNextCompleted,
    hasNextPage: hasNextCompleted,
    isFetchingNextPage: isFetchingNextCompleted,
    isLoading: isLoadingCompleted,
  } = useInfiniteQuery(userQueries.me.sessions.participating('COMPLETED'));

  const scheduledRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useInfiniteScroll(fetchNextCompleted, hasNextCompleted);

  const normalizeSession = (session: ParticipatingSession): Session => ({
    ...session,
    description: '',
  });

  const handleOpenReview = (session: ParticipatingSession) => {
    setSelectedSession(normalizeSession(session));
    setOpen(true);
  };

  useEffect(() => {
    const el = scheduledRef.current;
    if (!el || !hasNextScheduled) return;

    const handleScroll = () => {
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;

      if (isEnd && !isFetchingNextScheduled) {
        fetchNextScheduled();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasNextScheduled, isFetchingNextScheduled, fetchNextScheduled]);

  const scheduledCount = scheduledSessions?.sessions.length ?? 0;
  const completedCount = completedSessions?.sessions.length ?? 0;

  const isLoading = isLoadingScheduled || isLoadingCompleted;
  const hasNoSessions = scheduledCount === 0 && completedCount === 0;

  if (isLoading) {
    return (
      <section className="flex h-[60vh] items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </section>
    );
  }

  if (hasNoSessions) {
    return (
      <section className="flex h-[60vh] flex-col items-center justify-center gap-6">
        <Image
          width={isMobile ? 240 : 300}
          height={isMobile ? 218 : 272}
          src={'/assets/empty-session.png'}
          alt="세션 없음"
        />
        <p className="tablet:text-body2-medium text-body3-regular text-center text-gray-300">
          아직 예정되거나 완료한 세션이 없어요
          <br />
          다양한 세션을 구경하러 가볼까요?
        </p>

        <Button
          variant="default"
          onClick={() => {
            router.push('/sessions');
          }}
        >
          세션 구경하러 가기
        </Button>
      </section>
    );
  }

  return (
    <section className="tablet:gap-16 flex flex-col gap-10">
      <div>
        <h2 className="text-body1-semibold mb-5 text-gray-50">예정된 세션</h2>

        <div
          ref={scheduledRef}
          className="tablet:gap-4 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {scheduledSessions?.sessions.map((session) => (
            <div
              key={session.id}
              className="laptop:w-[calc((100%-32px)/3)] tablet:w-[calc((100%-16px)/2)] w-[calc((100%-12px)/2)] shrink-0"
            >
              <SessionCard session={normalizeSession(session)} />
            </div>
          ))}
          {isFetchingNextScheduled && (
            <div className="flex shrink-0 items-center px-4">
              <Spinner className="text-brand-500 size-5" />
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-body1-semibold mb-5 text-gray-50">완료된 세션</h2>

        <div className="tablet:gap-3 flex flex-col gap-2">
          {completedSessions?.sessions.map((session) => {
            const isHost = userInfo
              ? session.hostUserId === userInfo.id
              : false;
            const showReviewButton = !session.reviewed && userInfo && !isHost;

            return (
              <div key={session.id} className="flex flex-col gap-3">
                <CompletedSessionCard
                  session={normalizeSession(session)}
                  size={isMobile ? 'sm' : 'lg'}
                  showRanks={false}
                  showBadges={!isMobile}
                  action={
                    showReviewButton ? (
                      <Button
                        variant={'outlined'}
                        size={isMobile ? 'sm' : 'default'}
                        className="tablet:px-6 px-3"
                        onClick={() => {
                          handleOpenReview(session);
                        }}
                      >
                        리뷰 작성하기
                      </Button>
                    ) : null
                  }
                  actionPlacement={isMobile ? 'bottom' : 'side'}
                />
                <hr className="border-gray-750 w-full" />
              </div>
            );
          })}
          <div ref={completedRef} className="h-5" />

          {isFetchingNextCompleted && (
            <div className="flex shrink-0 items-center justify-center">
              <Spinner className="text-brand-500 size-5" />
            </div>
          )}
        </div>
      </div>
      <ReviewModal open={open} setOpen={setOpen} session={selectedSession} />
    </section>
  );
}
