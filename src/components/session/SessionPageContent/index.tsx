'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';
import FilterBar from '../FilterBar';
import SessionList from '../SessionList';

export default function SessionPageInner() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    sessionQueries.infiniteList({ ...queryFilters })
  );

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage);

  return (
    <SessionFilterProvider applyFilters={applyFilters} initialFilters={filters}>
      <FilterBar
        activeFilterCount={activeFilterCount}
        applyFilters={applyFilters}
        filters={filters}
      />
      <SessionList data={data?.sessions} loadMoreRef={loadMoreRef} />
    </SessionFilterProvider>
  );
}
