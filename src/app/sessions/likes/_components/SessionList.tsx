'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import SessionCard from '@/components/session/SessionCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import LikedSessionsEmptyState from './LikedSessionsEmptyState';

export default function SessionList() {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    userQueries.me.likes()
  );
  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (!data?.sessions.length) {
    return <LikedSessionsEmptyState />;
  }

  return (
    <>
      <ul className="laptop:grid-cols-3 grid w-full grid-cols-2 gap-6">
        {data?.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            displayParticipants={true}
          />
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" />
    </>
  );
}
