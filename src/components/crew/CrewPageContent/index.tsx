import { useInfiniteQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewList from '@/components/crew/CrewList';
import RegionFilter from '@/components/crew/RegionFilter';
import OptionDropdown from '@/components/ui/OptionDropdown';
import { CREW_SORT_OPTIONS } from '@/constants/crew';
import { useCrewFilters } from '@/hooks/crew/useCrewFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { CrewListFilters } from '@/types';

export default function CrewPageContent() {
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
    <>
      <FilterBar filters={filters} applyFilters={applyFilters} />
      <CrewList data={data?.crews} loadMoreRef={loadMoreRef} />
    </>
  );
}

function FilterBar({
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
