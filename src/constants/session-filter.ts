import type { DateRange } from 'react-day-picker';
import type { Level, SessionSort } from '@/types';

/* ----------------------------------------------
 * 타입 정의
 * ---------------------------------------------- */
export type FilterTabKey = 'region' | 'date' | 'time' | 'level';

export type LevelFilterValue = Level | undefined;

export type RegionFilterValue = Record<string, string[]> | undefined;

export type LevelOption = {
  label: string;
  value: LevelFilterValue;
};

export type SortOption = {
  label: string;
  value: SessionSort;
};

export type FilterTab = {
  key: FilterTabKey;
  label: string;
};

export type SessionFilterState = {
  page: number;
  // TODO: size 추가하기
  sort: SessionSort;
  region?: RegionFilterValue;
  date?: DateRange;
  time?: [number, number];
  level?: LevelFilterValue;
};

/* ----------------------------------------------
 * 상수 정의
 * ---------------------------------------------- */
export const LEVEL_OPTIONS = [
  { label: '전체', value: undefined },
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const satisfies readonly LevelOption[];

export const SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '모임 시작일순', value: 'sessionAtAsc' },
  { label: '마감 임박순', value: 'registerByAsc' },
] as const satisfies readonly SortOption[];

export const FILTER_TABS = [
  { key: 'region', label: '지역' },
  { key: 'date', label: '날짜' },
  { key: 'time', label: '시간' },
  { key: 'level', label: '난이도' },
] as const satisfies readonly FilterTab[];

export const DEFAULT_SESSION_FILTER = {
  page: 0,
  sort: 'createdAtDesc',
  region: undefined,
  date: undefined,
  time: undefined,
  level: undefined,
} satisfies SessionFilterState;
