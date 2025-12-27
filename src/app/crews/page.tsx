'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewCard from '@/components/crew/CrewCard';
import RegionFilter from '@/components/crew/RegionFilter';
import OptionDropdown from '@/components/ui/OptionDropdown';
import { CREW_SORT_OPTIONS } from '@/constants/crew';
import { useCrewFilters } from '@/hooks/crew/useCrewFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

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
      <section className="flex w-full items-center justify-between">
        <div className="my-[45px]">
          <h2 className="text-title2-semibold mb-4">
            나와 FIT한 러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular text-gray-200">
            러닝 페이스와 선호하는 스타일에 딱 맞는 크루를 찾아보세요!
          </span>
        </div>
      </section>
      <section className="flex w-full flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between gap-2">
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
        <div className="grid w-full grid-cols-1 gap-6">
          {data?.crews && data.crews.length > 0 ? (
            data.crews.map((crew) => <CrewCard key={crew.id} crew={crew} />)
          ) : (
            <div className="flex h-40 items-center justify-center text-gray-400">
              등록된 크루가 없습니다.
            </div>
          )}
          <div ref={loadMoreRef} />
        </div>
      </section>
    </main>
  );
}
