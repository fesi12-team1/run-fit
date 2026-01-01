'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { userQueries } from '@/api/queries/userQueries';
import SessionCard from '@/components/session/SessionCard';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Session } from '@/types';

export default function MyCreatedSessionsPage() {
  const isMobile = useMediaQuery({ max: 'tablet' });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(userQueries.me.sessions.created());

  const sessions = data?.sessions ?? [];
  const hasNoSessions = !isLoading && sessions.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  const normalizeSession = (
    session: Omit<Session, 'description'>
  ): Session => ({
    ...session,
    description: '',
  });

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
          src={'/assets/session-default.png'}
          alt="세션 없음"
        />
        <p className="tablet:text-body2-medium text-body3-regular text-center text-gray-300">
          아직 생성한 세션이 없어요
          <br />
          세션은 크루를 개설하거나
          <br />
          운영진으로 활동할 때 만들 수 있어요!
        </p>
      </section>
    );
  }

  return (
    <section className="tablet:gap-3 flex flex-col gap-2">
      <h2 className="text-body2-semibold tablet:text-body1-semibold text-gray-50">
        내가 만든 세션
      </h2>
      <div className="tablet:gap-x-4 tablet:gap-y-8 laptop:gap-y-10 laptop:grid-cols-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={normalizeSession(session)} />
        ))}
        <div ref={bottomRef} className="h-5" />
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Spinner className="text-brand-500 size-5" />
          </div>
        )}
      </div>
    </section>
  );
}
