'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';

// import SessionCard from '@/components/session/SessionCard';

export default function Page() {
  const query = useInfiniteQuery(userQueries.me.likes());
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

      <ul className="laptop:grid-rows-3 grid grid-flow-col grid-rows-2 gap-4">
        {query.data?.pages
          .flatMap((page) => page.content)
          .map((session) => (
            <li key={session.sessionId}>
              {/* <SessionCard session={session}>{session.name}</SessionCard> */}
            </li>
          ))}
      </ul>

      <button
        type="button"
        disabled={!query.hasNextPage || query.isFetchingNextPage}
        onClick={() => query.fetchNextPage()}
      >
        {query.isFetchingNextPage ? '불러오는 중...' : '더 보기'}
      </button>
    </main>
  );
}
