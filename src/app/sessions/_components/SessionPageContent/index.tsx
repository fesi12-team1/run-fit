'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';
import SessionFilters from '../SessionFilters';
import SessionList from '../SessionList';

export default function SessionPageContent() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      sessionQueries.infiniteList({ ...queryFilters, status: 'OPEN' })
    );

  const loadMoreRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <SessionFilterProvider applyFilters={applyFilters} initialFilters={filters}>
      <SessionFilters
        activeFilterCount={activeFilterCount}
        applyFilters={applyFilters}
        filters={filters}
      />
      <SessionList
        data={data?.sessions}
        isFetchingNextPage={isFetchingNextPage}
        loadMoreRef={loadMoreRef}
      />
    </SessionFilterProvider>
  );
}
