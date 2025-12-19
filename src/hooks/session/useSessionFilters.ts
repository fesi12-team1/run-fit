'use client';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  DEFAULT_SESSION_FILTER,
  LevelFilterValue,
  SessionFilterState,
} from '@/constants/session-filter';
import { formatMinutesToHHmm } from '@/lib/time';
import { SessionListFilters, SessionSort } from '@/types';

/**
 * 세션 페이지의 필터 훅
 * 읽기 전용 필터 상태와 URL 쿼리 변환 및 적용 함수 제공
 * @returns
 * - filters: UI에서 사용하는 필터 상태
 * - queryFilters: API 쿼리에 사용할 필터 객체
 * - applyFilters: 필터 상태를 받아 URL 쿼리로 적용하는 함수
 * - resetFilters: 필터를 기본값으로 리셋하는 함수
 */
export function useSessionFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL -> UI 필터 읽기
  const filters: SessionFilterState = useMemo(
    () => ({
      page: Number(searchParams.get('page')) ?? DEFAULT_SESSION_FILTER.page,
      sort:
        (searchParams.get('sort') as SessionSort) ??
        DEFAULT_SESSION_FILTER.sort,
      level:
        (searchParams.get('level') as LevelFilterValue) ??
        DEFAULT_SESSION_FILTER.level,
      region:
        searchParams.get('city') && searchParams.get('district')
          ? { [searchParams.get('city')!]: [searchParams.get('district')!] }
          : DEFAULT_SESSION_FILTER.region,
      date: searchParams.get('dateFrom')
        ? {
            from: new Date(searchParams.get('dateFrom')!),
            to: new Date(searchParams.get('dateTo')!),
          }
        : DEFAULT_SESSION_FILTER.date,
      time:
        searchParams.get('timeFrom') && searchParams.get('timeTo')
          ? [
              Number(searchParams.get('timeFrom')),
              Number(searchParams.get('timeTo')),
            ]
          : DEFAULT_SESSION_FILTER.time,
    }),
    [searchParams]
  );

  // API Query 필터 변환
  const queryFilters: SessionListFilters = useMemo(() => {
    const { region, date, time, level, sort, page } = filters;

    const timeFrom = time ? formatMinutesToHHmm(time[0]) : undefined;

    const rawTimeTo = time ? time[1] : undefined;
    const safeTimeTo = rawTimeTo === 1440 ? 1439 : rawTimeTo; // 24:00 → 23:59

    const timeTo =
      safeTimeTo !== undefined ? formatMinutesToHHmm(safeTimeTo) : undefined;

    return {
      level,
      city: region ? Object.keys(region) : undefined,
      district: region ? Object.values(region).flat() : undefined,
      dateFrom: date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
      dateTo: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined,
      timeFrom,
      timeTo,
      sort,
      page,
    };
  }, [filters]);

  // URL 업데이트 함수
  const applyFilters = (next: SessionFilterState) => {
    const { region, date, time, level, sort, page } = next;
    const params = new URLSearchParams();

    if (level) params.set('level', level);
    if (sort) params.set('sort', sort);
    if (page != null) params.set('page', String(page));
    if (region) {
      const city = Object.keys(region)[0]!;
      const district = region[city][0];
      params.set('city', city);
      params.set('district', district);
    }
    if (date?.from) {
      params.set('dateFrom', format(date.from, 'yyyy-MM-dd'));
      params.set('dateTo', format(date.to!, 'yyyy-MM-dd'));
    }
    if (time) {
      params.set('timeFrom', time[0] + '');
      params.set('timeTo', time[1] + '');
    }

    router.push(`/sessions?${params.toString()}`);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.region && Object.keys(filters.region).length > 0) count++;
    if (filters.date?.from || filters.date?.to) count++;
    if (filters.time && (filters.time[0] !== 0 || filters.time[1] !== 720))
      count++;
    if (filters.level) count++;
    if (filters.sort !== DEFAULT_SESSION_FILTER.sort) count++;
    return count;
  }, [filters]);

  return {
    filters,
    queryFilters,
    applyFilters,
    resetFilters: () => applyFilters(DEFAULT_SESSION_FILTER),
    activeFilterCount,
  };
}
