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
 * - activeFilterCount: 활성화된 필터 개수
 */
export function useSessionFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters: SessionFilterState = useMemo(() => {
    const cityList = searchParams.getAll('city');
    const districtList = searchParams.getAll('district');

    let region: Record<string, string[]> | undefined = undefined;

    const isValidRegion =
      cityList.length > 0 &&
      districtList.length > 0 &&
      cityList.length === districtList.length;

    if (isValidRegion) {
      region = cityList.reduce(
        (acc, city, i) => {
          const district = districtList[i]; // 동일 인덱스의 district 가져오기
          if (!acc[city]) acc[city] = []; // 도시가 없으면 초기화
          if (district && district.trim()) acc[city].push(district); // 유효한 구만 추가

          return acc;
        },
        {} as Record<string, string[]>
      );
    }

    return {
      page: Number(searchParams.get('page')) || DEFAULT_SESSION_FILTER.page,
      sort:
        (searchParams.get('sort') as SessionSort) ??
        DEFAULT_SESSION_FILTER.sort,
      level:
        (searchParams.get('level') as LevelFilterValue) ??
        DEFAULT_SESSION_FILTER.level,
      region,
      date: searchParams.get('dateFrom')
        ? {
            from: new Date(searchParams.get('dateFrom')!),
            to: searchParams.get('dateTo')
              ? new Date(searchParams.get('dateTo')!)
              : new Date(searchParams.get('dateFrom')!),
          }
        : DEFAULT_SESSION_FILTER.date,
      time:
        searchParams.get('timeFrom') && searchParams.get('timeTo')
          ? [
              Number(searchParams.get('timeFrom')),
              Number(searchParams.get('timeTo')),
            ]
          : DEFAULT_SESSION_FILTER.time,
    };
  }, [searchParams]);

  const queryFilters: SessionListFilters = useMemo(() => {
    const { region, date, time, level, sort, page } = filters;

    const timeFrom = time ? formatMinutesToHHmm(time[0]) : undefined;
    const rawTimeTo = time ? time[1] : undefined;
    const safeTimeTo = rawTimeTo === 1440 ? 1439 : rawTimeTo;

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

  const applyFilters = (next: SessionFilterState) => {
    const { region, date, time, level, sort, page } = next;
    const params = new URLSearchParams();

    if (level) params.set('level', level);
    if (sort) params.set('sort', sort);
    if (page != null) params.set('page', String(page));

    // 다중 지역 설정
    if (region) {
      Object.entries(region).forEach(([city, districts]) => {
        districts.forEach((district) => {
          params.append('city', city);
          params.append('district', district);
        });
      });
    }

    if (date?.from) {
      params.set('dateFrom', format(date.from, 'yyyy-MM-dd'));
      params.set('dateTo', format(date.to ?? date.from, 'yyyy-MM-dd'));
    }

    if (time) {
      params.set('timeFrom', time[0] + '');
      params.set('timeTo', time[1] + '');
    }

    router.push(`/sessions?${params.toString()}`);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    const region = filters.region;
    if (region) {
      const validRegion = Object.entries(region).some(([city, districts]) => {
        if (!city.trim()) return false;
        if (!districts || districts.length === 0) return false;
        return districts.some((d) => d.trim() !== '');
      });

      if (validRegion) count++;
    }

    if (filters.date?.from || filters.date?.to) count++;
    if (filters.time) count++;
    if (filters.level) count++;
    return count;
  }, [filters]);

  return {
    filters,
    queryFilters,
    applyFilters,
    activeFilterCount,
  };
}
