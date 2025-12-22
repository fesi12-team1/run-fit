import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import {
  DEFAULT_SESSION_FILTER,
  type SessionFilterState,
} from '@/constants/session-filter';
import { formatMinutesToHHmm } from '@/lib/time';
import type { SessionListFilters } from '@/types';

export function useSessionFilters() {
  const [filters, setFilters] = useState<SessionFilterState>(
    DEFAULT_SESSION_FILTER
  );

  const changeFilter = <K extends keyof SessionFilterState>(
    key: K,
    value: SessionFilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
  };

  const resetFilters = () => {
    setFilters(DEFAULT_SESSION_FILTER);
  };

  const queryFilters = useMemo<SessionListFilters>(() => {
    const { region, date, time, level, sort, page } = filters;

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
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.region && Object.keys(filters.region).length > 0) count++;
    if (filters.date?.from || filters.date?.to) count++;
    if (filters.time) count++;
    if (filters.level) count++;

    return count;
  }, [filters]);

  return {
    filters,
    queryFilters,
    changeFilter,
    resetFilters,
    activeFilterCount,
  };
}
