import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import { useCrewFilters } from '@/hooks/crew/useCrewFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import CrewFilters from '../CrewFilters';
import CrewList from '../CrewList';

export default function CrewPageContent() {
  const { filters, applyFilters } = useCrewFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(crewQueries.list({ ...filters }));

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <div className="flex w-full flex-col">
      <CrewFilters applyFilters={applyFilters} filters={filters} />
      <CrewList
        data={data?.crews}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
      />
    </div>
  );
}
