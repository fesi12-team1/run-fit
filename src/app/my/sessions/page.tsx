'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';
import EmptyLayout from '@/components/ui/EmptyLayout';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CompletedSessionsContent from './_components/CompletedSessionsContent';
import MySessionsSkeleton from './_components/MySessionsSkeleton';
import { ScheduledSessionsContent } from './_components/ScheduledSessionsContent';

export default function Page() {
  return (
    <Suspense
      fallback={
        <section className="tablet:gap-16 flex flex-col gap-10">
          <div>
            <h2 className="text-body1-semibold mb-5 text-gray-50">
              예정된 세션
            </h2>
            <MySessionsSkeleton.Scheduled />
          </div>
          <div>
            <h2 className="text-body1-semibold mb-5 text-gray-50">
              완료된 세션
            </h2>
            <MySessionsSkeleton.Completed />
          </div>
        </section>
      }
    >
      <SessionsContentWrapper />
    </Suspense>
  );
}

function SessionsContentWrapper() {
  const router = useRouter();
  const isMobile = useMediaQuery({ max: 'tablet' });

  const {
    data: scheduledSessions,
    fetchNextPage: fetchNextScheduled,
    hasNextPage: hasNextScheduled,
    isFetchingNextPage: isFetchingNextScheduled,
  } = useSuspenseInfiniteQuery(
    userQueries.me.sessions.participating('SCHEDULED')
  );

  const {
    data: completedSessions,
    fetchNextPage: fetchNextCompleted,
    hasNextPage: hasNextCompleted,
    isFetchingNextPage: isFetchingNextCompleted,
  } = useSuspenseInfiniteQuery(
    userQueries.me.sessions.participating('COMPLETED')
  );

  const hasNoScheduled = scheduledSessions?.sessions.length === 0;
  const hasNoCompleted = completedSessions?.sessions.length === 0;

  // 둘 다 비어있으면 전체 Empty 화면 표시
  if (hasNoScheduled && hasNoCompleted) {
    return (
      <EmptyLayout className="h-[60vh] gap-6">
        <Image
          width={isMobile ? 240 : 300}
          height={isMobile ? 218 : 272}
          src="/assets/session-default.png"
          alt="세션 없음"
        />
        <EmptyLayout.Message>
          아직 예정되거나 완료한 세션이 없어요
          <br />
          다양한 세션을 구경하러 가볼까요?
        </EmptyLayout.Message>
        <EmptyLayout.Button onClick={() => router.push('/sessions')}>
          세션 구경하러 가기
        </EmptyLayout.Button>
      </EmptyLayout>
    );
  }

  return (
    <section className="tablet:gap-16 flex flex-col gap-10">
      <div>
        <h2 className="text-body1-semibold mb-5 text-gray-50">예정된 세션</h2>
        <ScheduledSessionsContent
          scheduledSessions={scheduledSessions}
          fetchNextScheduled={fetchNextScheduled}
          hasNextScheduled={hasNextScheduled}
          isFetchingNextScheduled={isFetchingNextScheduled}
        />
      </div>

      <div>
        <h2 className="text-body1-semibold mb-5 text-gray-50">완료된 세션</h2>
        <CompletedSessionsContent
          completedSessions={completedSessions}
          fetchNextCompleted={fetchNextCompleted}
          hasNextCompleted={hasNextCompleted}
          isFetchingNextCompleted={isFetchingNextCompleted}
        />
      </div>
    </section>
  );
}
