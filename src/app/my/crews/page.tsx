'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';
import MyCrewCard from '@/components/my/MyCrewCard';
import EmptyLayout from '@/components/ui/EmptyLayout';
import ErrorFallback from '@/components/ui/ErrorFallback';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import MyCrewsPageSkeleton from './_components/MyCrewsPageSkeleton';

export default function MyCrewsPage() {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback message="크루 목록을 불러오는데 실패했습니다." />
      }
    >
      <Suspense fallback={<MyCrewsPageSkeleton />}>
        <MyCrewsContent />
      </Suspense>
    </ErrorBoundary>
  );
}

function MyCrewsContent() {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(userQueries.me.crews.joined());

  const crews = data?.crews ?? [];
  const hasNoCrews = crews.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, !!hasNextPage);

  if (hasNoCrews) {
    return (
      <EmptyLayout className="h-[60vh]">
        <Image
          width={isMobile ? 240 : 300}
          height={isMobile ? 118 : 147}
          src={'/assets/crew-default.png'}
          alt="크루 없음"
        />
        <EmptyLayout.Message>
          아직 소속된 크루가 없어요
          <br />
          맘에 드는 크루를 찾으러 가볼까요?
        </EmptyLayout.Message>
        <EmptyLayout.Button
          onClick={() => {
            router.push('/crews');
          }}
        >
          크루 구경하러 가기
        </EmptyLayout.Button>
      </EmptyLayout>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {crews.map((crew, index) => (
        <div key={crew.id} className="flex flex-col gap-4">
          <MyCrewCard crew={crew} />

          {index !== crews.length - 1 && (
            <hr className="w-full border-gray-700" />
          )}
        </div>
      ))}

      <div ref={bottomRef} className="h-5" />

      {isFetchingNextPage && <Spinner.Scroll />}
    </section>
  );
}
