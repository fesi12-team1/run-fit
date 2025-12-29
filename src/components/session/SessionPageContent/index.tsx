'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';
import FilterBar from '../FilterBar';
import SessionList from '../SessionList';

export default function SessionPageInner() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(sessionQueries.infiniteList({ ...queryFilters }));

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage);

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center text-gray-300">
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-main text-error-100 flex items-center justify-center">
        세션 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <SessionFilterProvider initialFilters={filters} applyFilters={applyFilters}>
      <FilterBar
        filters={filters}
        applyFilters={applyFilters}
        activeFilterCount={activeFilterCount}
      />
      <SessionList data={data?.sessions} loadMoreRef={loadMoreRef} />
    </SessionFilterProvider>
  );
}
