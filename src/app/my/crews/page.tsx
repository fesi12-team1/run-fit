'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';
import MyCrewCard from '@/components/my/MyCrewCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import CrewsSkeleton from './CrewsSkeleton';

export const dynamic = 'force-dynamic';

export default function MyCrewsPage() {
  return (
    <Suspense fallback={<CrewsSkeleton />}>
      <MyCrewsContent />
    </Suspense>
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
      <section className="flex h-[60vh] flex-col items-center justify-center gap-6">
        <Image
          width={isMobile ? 240 : 300}
          height={isMobile ? 118 : 147}
          src={'/assets/crew-default.png'}
          alt="크루 없음"
        />
        <p className="tablet:text-body2-medium text-body3-regular text-center text-gray-300">
          아직 소속된 크루가 없어요
          <br />
          맘에 드는 크루를 찾으러 가볼까요?
        </p>

        <Button
          variant="default"
          onClick={() => {
            router.push('/crews');
          }}
        >
          크루 구경하러 가기
        </Button>
      </section>
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
