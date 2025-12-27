'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewCard from '@/components/crew/CrewCard';
import RegionFilter from '@/components/crew/RegionFilter';
import OptionDropdown from '@/components/ui/OptionDropdown';
import { CREW_SORT_OPTIONS } from '@/constants/crew';
import { useCrewFilters } from '@/hooks/crew/useCrewFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { cn } from '@/lib/utils';
import { Crew, CrewListFilters } from '@/types';

export default function Page() {
  const { filters, applyFilters } = useCrewFilters();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(crewQueries.list({ ...filters }));

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage);

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center">로딩 중...</div>
    );
  }

  if (isError) {
    return (
      <div className="h-main flex items-center justify-center text-red-500">
        크루 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <main className="h-main tablet:px-8 mx-auto flex max-w-[1120px] flex-col items-center justify-start px-6">
      <Header />
      <Filters filters={filters} applyFilters={applyFilters} />
      <CrewList data={data?.crews} loadMoreRef={loadMoreRef} />
    </main>
  );
}

function Header() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="my-[45px]">
        <h2 className="text-title2-semibold mb-4">
          나와 FIT한 러닝 메이트를 찾다
        </h2>
        <span className="text-body3-regular text-gray-200">
          러닝 페이스와 선호하는 스타일에 딱 맞는 크루를 찾아보세요!
        </span>
      </div>
    </div>
  );
}

function Filters({
  filters,
  applyFilters,
}: {
  filters: CrewListFilters;
  applyFilters: (filters: CrewListFilters) => void;
}) {
  return (
    <div className="mb-6 flex w-full items-center justify-between">
      <RegionFilter
        value={filters.city}
        onChange={(city) => applyFilters({ ...filters, city })}
      />
      <OptionDropdown
        options={CREW_SORT_OPTIONS}
        value={filters.sort || CREW_SORT_OPTIONS[0].value}
        onChange={(sort) => applyFilters({ ...filters, sort })}
      />
    </div>
  );
}

function CrewList({
  data: crews,
  loadMoreRef,
}: {
  data?: Crew[];
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}) {
  const hasData = crews && crews.length > 0;

  return (
    <div
      className={cn(
        'flex w-full flex-1',
        hasData ? 'items-start' : 'items-center justify-center'
      )}
    >
      {crews?.length ? (
        <div className="grid w-full grid-cols-1 border-b border-gray-700">
          {crews.map((crew) => (
            <CrewCard key={crew.id} crew={crew} />
          ))}
          <div ref={loadMoreRef} className="h-1" />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
      <Image
        src="/assets/crew-default.png"
        alt="No Crews"
        width={300}
        height={150}
      />
      <span className="text-body2-medium text-center text-gray-300">
        아직 생성된 크루가 없어요 <br /> 나와 FIT한 러닝 크루를 직접
        만들어보세요!
      </span>
    </div>
  );
}
