import {
  SessionFilterState,
  SessionLevel,
  SessionSortKey,
  SessionTabKey,
} from '@/types';

export const SESSION_SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '모임 시작일순', value: 'sessionAtAsc' },
  { label: '마감 임박순', value: 'registerByAsc' },
] as const satisfies readonly {
  label: string;
  value: SessionSortKey;
}[];

export const SESSION_LEVEL_OPTIONS = [
  { label: '전체', value: undefined },
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const satisfies readonly {
  label: string;
  value: SessionLevel | undefined;
}[];

export const SESSION_FILTER_TABS = [
  { key: 'region', label: '지역' },
  { key: 'date', label: '날짜' },
  { key: 'time', label: '시간' },
  { key: 'level', label: '난이도' },
] as const satisfies readonly {
  key: SessionTabKey;
  label: string;
}[];

export const DEFAULT_SESSION_FILTER: SessionFilterState = {
  sort: 'createdAtDesc',
  region: undefined,
  date: undefined,
  time: undefined,
  level: undefined,
};
