import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { CrewListFilters, CrewSortKey } from '@/types';
import { Sido } from '@/types/region';

type CrewFilterInput = Pick<CrewListFilters, 'city' | 'sort'>;

export function useCrewFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters: CrewListFilters = useMemo(() => {
    const city = searchParams.getAll('city'); // 예: ?city=서울&city=경기
    const sort = searchParams.get('sort') as CrewSortKey;

    return {
      city: city.length > 0 ? (city as Sido[]) : undefined,
      sort,
    };
  }, [searchParams]);

  const applyFilters = (next: CrewFilterInput) => {
    const params = new URLSearchParams();

    if (next.city) {
      next.city.forEach((r) => params.append('city', r));
    }

    if (next.sort) params.set('sort', next.sort);

    router.push(`/crews?${params.toString()}`);
  };

  return {
    filters,
    applyFilters,
  };
}
