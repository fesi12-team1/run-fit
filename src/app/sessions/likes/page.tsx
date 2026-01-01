'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import SessionCard from '@/components/session/SessionCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Page() {
  const query = useSuspenseInfiniteQuery(userQueries.me.likes());
  const loadMoreRef = useInfiniteScroll(
    () => query.fetchNextPage(),
    query.hasNextPage
  );

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Failed</div>;

  return (
    <main className="h-main mx-auto max-w-[1120px]">
      <div className="tablet:block mt-[45px] mb-[43px] ml-1 hidden">
        <h1 className="text-title2-semibold text-gray-50">찜한 세션</h1>
        <p className="text-body3-regular text-gray-300">
          마감되기 전에 지금 바로 참여해보세요!
        </p>
      </div>

      <ul className="laptop:grid-cols-3 grid w-full grid-cols-2 gap-6">
        {query.data?.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            displayParticipants={true}
          />
        ))}
      </ul>

      <div ref={loadMoreRef} className="h-1" />
    </main>
  );
}
