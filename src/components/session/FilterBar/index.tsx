'use client';

import FilterButton from '@/components/ui/FilterButton';
import { SessionFilterState } from '@/constants/session-filter';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import DateFilter from './DateFilter';
import FilterModal from './FilterModal';
import LevelFilter from './LevelFilter';
import RegionFilter from './RegionFilter';
import SortOptions from './SortOptions';
import TimeFilter from './TimeFilter';

interface FilterBarProps {
  filters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  activeFilterCount: number;
}

export default function FilterBar({
  filters,
  applyFilters,
  activeFilterCount,
}: FilterBarProps) {
  const isDesktop = useMediaQuery({ min: 'laptop' });
  const isMobile = useMediaQuery({ max: 'tablet' });

  return (
    <>
      <div className="flex w-full items-center">
        <div className="scrollbar-hide tablet:pt-5 relative flex flex-1 items-center gap-2 overflow-x-auto">
          <div className="scrollbar-hide relative flex items-center overflow-x-auto">
            <div className="flex w-max items-center gap-2">
              <RegionFilter
                value={filters.region}
                onChange={(region) => applyFilters({ ...filters, region })}
              />
              <DateFilter
                value={filters.date}
                onChange={(date) => applyFilters({ ...filters, date })}
              />
              <TimeFilter
                value={filters.time}
                onChange={(time) => applyFilters({ ...filters, time })}
              />
              <LevelFilter
                value={filters.level}
                onChange={(level) => applyFilters({ ...filters, level })}
              />
            </div>
          </div>
          {isDesktop && (
            <div className="relative overflow-visible">
              <FilterModal>
                <FilterButton count={activeFilterCount} />
              </FilterModal>
            </div>
          )}
          <div
            className={
              'pointer-events-none absolute top-0 right-0 h-full w-[54px] bg-linear-to-l from-gray-900 to-transparent backdrop-blur-[0.5px]'
            }
          />
        </div>
        <div className="tablet:pt-5 flex items-center">
          {!isDesktop && (
            <FilterModal>
              <FilterButton count={activeFilterCount} />
            </FilterModal>
          )}
          {!isMobile && (
            <SortOptions
              value={filters.sort}
              onChange={(sort) => applyFilters({ ...filters, sort })}
            />
          )}
        </div>
      </div>
      {isMobile && (
        <div className="mt-4 mb-2 flex w-full shrink-0 justify-end">
          <SortOptions
            value={filters.sort}
            onChange={(sort) => applyFilters({ ...filters, sort })}
          />
        </div>
      )}
    </>
  );
}
