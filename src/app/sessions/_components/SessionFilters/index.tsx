'use client';

import SessionDateFilter from '@/components/session/SessionDateFilter';
import SessionLevelFilter from '@/components/session/SessionLevelFilter';
import SessionRegionFilter from '@/components/session/SessionRegionFilter';
import SessionTimeFilter from '@/components/session/SessionTimeFilter';
import FilterButton from '@/components/ui/FilterButton';
import OptionDropdown from '@/components/ui/OptionDropdown';
import { SESSION_SORT_OPTIONS } from '@/constants/session';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SessionFilterState } from '@/types';
import SessionFilterModal from './SessionFilterModal';

interface SessionFiltersProps {
  filters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  activeFilterCount: number;
}

export default function SessionFilters({
  filters,
  applyFilters,
  activeFilterCount,
}: SessionFiltersProps) {
  const isTabletUp = useMediaQuery({ min: 'laptop' });
  const isMobile = useMediaQuery({ max: 'tablet' });

  return (
    <>
      <div className="flex w-full items-center">
        <div className="scrollbar-hide tablet:pt-5 relative flex flex-1 items-center gap-2 overflow-x-auto">
          <div className="scrollbar-hide relative flex items-center overflow-x-auto">
            <div className="flex w-max items-center gap-2">
              <SessionRegionFilter
                value={filters.region}
                onChange={(region) => applyFilters({ ...filters, region })}
              />
              <SessionDateFilter
                value={filters.date}
                onChange={(date) => applyFilters({ ...filters, date })}
              />
              <SessionTimeFilter
                value={filters.time}
                onChange={(time) => applyFilters({ ...filters, time })}
              />
              <SessionLevelFilter
                value={filters.level}
                onChange={(level) => applyFilters({ ...filters, level })}
              />
            </div>
          </div>
          {isTabletUp && (
            <div className="relative overflow-visible">
              <SessionFilterModal>
                <FilterButton count={activeFilterCount} />
              </SessionFilterModal>
            </div>
          )}
          <div
            className={
              'pointer-events-none absolute top-0 right-0 h-full w-[54px] bg-linear-to-l from-gray-900 to-transparent backdrop-blur-[0.5px]'
            }
          />
        </div>
        <div className="tablet:pt-5 flex items-center">
          {!isTabletUp && (
            <SessionFilterModal>
              <FilterButton count={activeFilterCount} />
            </SessionFilterModal>
          )}
          {!isMobile && (
            <OptionDropdown
              options={SESSION_SORT_OPTIONS}
              value={filters.sort}
              onChange={(sort) => applyFilters({ ...filters, sort })}
            />
          )}
        </div>
      </div>
      {isMobile && (
        <div className="mt-2 flex w-full shrink-0 justify-end">
          <OptionDropdown
            options={SESSION_SORT_OPTIONS}
            value={filters.sort}
            onChange={(sort) => applyFilters({ ...filters, sort })}
          />
        </div>
      )}
    </>
  );
}
