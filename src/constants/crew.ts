import { CrewSortKey } from '@/types';

export const CREW_SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '멤버 많은순', value: 'memberCountDesc' },
  { label: '최근 세션순', value: 'lastSessionDesc' },
  { label: '이름 오름차순', value: 'nameAsc' },
  { label: '이름 내림차순', value: 'nameDesc' },
] as const satisfies readonly { label: string; value: CrewSortKey }[];
