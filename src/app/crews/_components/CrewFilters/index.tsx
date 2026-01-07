import OptionDropdown from '@/components/ui/OptionDropdown';
import { CREW_SORT_OPTIONS } from '@/constants/crew';
import { CrewListFilters } from '@/types';
import CrewRegionFilter from './CrewRegionFilter';

interface CrewFiltersProps {
  filters: CrewListFilters;
  applyFilters: (filters: CrewListFilters) => void;
}

export default function CrewFilters({
  filters,
  applyFilters,
}: CrewFiltersProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <CrewRegionFilter
        value={filters.city}
        onChange={(city) => applyFilters({ ...filters, city })}
      />
      <OptionDropdown
        options={CREW_SORT_OPTIONS}
        value={filters.sort || CREW_SORT_OPTIONS[0].value}
        onChange={(sort) => applyFilters({ ...filters, sort })}
      />
    </div>
  );
}
