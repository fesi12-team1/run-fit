import { CrewSortKey } from '@/types';

export const CREW_SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '멤버 많은순', value: 'memberCountDesc' },
  { label: '최근 세션순', value: 'lastSessionDesc' },
  { label: '이름 오름차순', value: 'nameAsc' },
  { label: '이름 내림차순', value: 'nameDesc' },
] as const satisfies readonly { label: string; value: CrewSortKey }[];

export const CREW_DETAIL_SECTIONS = [
  { id: 'detail', name: '크루 소개' },
  { id: 'session', name: '세션' },
  { id: 'review', name: '후기' },
] as const;
