import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import type {
  LevelFilterValue,
  RegionFilterValue,
} from '@/constants/session-filter';
import { formatMinutesToHHmm } from '@/lib/time';
import type { SessionListFilters, SessionSort } from '@/types';

export type SessionFilterState = {
  page: number;
  sort: SessionSort;
  region?: RegionFilterValue;
  date?: DateRange;
  time?: [number, number];
  level?: LevelFilterValue;
};

export const DEFAULT_SESSION_FILTER = {
  page: 0,
  sort: 'createdAtDesc',
  region: undefined,
  date: undefined,
  time: [0, 720],
  level: undefined,
} satisfies SessionFilterState;

export function useSessionFilters() {
  // UI 상태 관리용 필터들
  const [filters, setFilters] = useState<SessionFilterState>(
    DEFAULT_SESSION_FILTER
  );
  const [page, setPage] = useState(0);

  const changeFilter = <K extends keyof SessionFilterState>(
    key: K,
    value: SessionFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_SESSION_FILTER);
    setPage(0);
  };

  // API 쿼리용 필터 묶음
  const queryFilters = useMemo<SessionListFilters>(() => {
    const { region, date, time, level, sort } = filters;

    return {
      level,
      city: region ? Object.keys(region) : undefined,
      district: region ? Object.values(region).flat() : undefined,
      dateFrom: date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
      dateTo: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined,
      timeFrom: time ? formatMinutesToHHmm(time[0]) : undefined,
      timeTo: time ? formatMinutesToHHmm(time[1]) : undefined,
      sort: sort || 'createdAtDesc',
      page,
    };
  }, [filters, page]);

  return {
    filters,
    queryFilters,
    changeFilter,
    resetFilters,
  };
}
