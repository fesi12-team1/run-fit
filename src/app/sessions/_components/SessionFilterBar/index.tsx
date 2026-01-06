'use client';

import DateFilter from '@/components/session/DateFilter';
import LevelFilter from '@/components/session/LevelFilter';
import RegionFilter from '@/components/session/RegionFilter';
import TimeFilter from '@/components/session/TimeFilter';
import FilterButton from '@/components/ui/FilterButton';
import OptionDropdown from '@/components/ui/OptionDropdown';
import { SESSION_SORT_OPTIONS } from '@/constants/session';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SessionFilterState } from '@/types';
import SessionFilterModal from './SessionFilterModal';

interface SessionFilterBarProps {
  filters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  activeFilterCount: number;
}

export default function SessionFilterBar({
  filters,
  applyFilters,
  activeFilterCount,
}: SessionFilterBarProps) {
  const isTabletUp = useMediaQuery({ min: 'laptop' });
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
