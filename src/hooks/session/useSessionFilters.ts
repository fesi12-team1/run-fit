import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { formatMinutesToHHmm } from '@/lib/time';
import { LevelValue, SessionListFilters, SortValue } from '@/types';

type RegionValue = Record<string, string[]>;

export function useSessionFilters() {
  // UI 상태 관리용 필터들
  const [region, setRegion] = useState<RegionValue | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<[number, number] | undefined>();
  const [level, setLevel] = useState<LevelValue | undefined>();
  const [sort, setSort] = useState<SortValue>();
  const [page, setPage] = useState(0);

  const changeRegion = (next?: RegionValue) => {
    setRegion(next);
    setPage(0);
  };

  const changeDate = (next?: DateRange) => {
    setDate(next);
    setPage(0);
  };

  const changeTime = (next?: [number, number]) => {
    setTime(next);
    setPage(0);
  };

  const changeLevel = (next?: LevelValue) => {
    setLevel(next);
    setPage(0);
  };

  const changeSort = (next: SortValue) => {
    setSort(next);
    setPage(0);
  };

  // API 쿼리용 필터 묶음
  const queryFilters = useMemo<SessionListFilters>(() => {
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
  }, [region, date, time, level, sort, page]);

  // UI 용 필터 묶음
  const uiFilters = useMemo(
    () => ({ region, date, time, level, sort, page }),
    [region, date, time, level, sort, page]
  );

  return {
    uiFilters,
    queryFilters,
    changeRegion,
    changeDate,
    changeTime,
    changeLevel,
    changeSort,
  };
}
