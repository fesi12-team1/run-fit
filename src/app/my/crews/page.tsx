'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';
import MyCrewCard from '@/components/my/MyCrewCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MyCrewsPage() {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(userQueries.me.crews.joined());

  const crews = data?.crews ?? [];
  const hasNoCrews = !isLoading && crews.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, !!hasNextPage);

  if (isLoading) {
    return (
      <section className="flex h-[60vh] items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </section>
    );
  }

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

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Spinner className="text-brand-500 size-5" />
        </div>
      )}
    </section>
  );
}
