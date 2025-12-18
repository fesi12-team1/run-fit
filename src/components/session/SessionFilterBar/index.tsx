'use client';

import DateFilter from '@/components/ui/DateFilter';
import Dropdown from '@/components/ui/Dropdown';
import FilterButton from '@/components/ui/FilterButton';
import RegionFilter from '@/components/ui/RegionFilter';
import TimeFilter from '@/components/ui/TimeFilter';
import { LEVEL_OPTIONS, SORT_OPTIONS } from '@/constants/session-filter';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { getOptionLabel } from '@/lib/utils';
import SessionFilterModal from '../SessionFilterModal';

export default function SessionFilterBar({
  uiFilters,
  queryFilters,
  changeRegion,
  changeDate,
  changeTime,
  changeLevel,
  changeSort,
  resetFilters,
}: ReturnType<typeof useSessionFilters>) {
  return (
    <div className="mb-6 flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <RegionFilter value={uiFilters.region} onChange={changeRegion} />
        <DateFilter value={uiFilters.date} onChange={changeDate} />
        <TimeFilter value={uiFilters.time} onChange={changeTime} />

        {/** 난이도 */}
        <Dropdown size="lg" hasSelected={Boolean(uiFilters.level)}>
          <Dropdown.Trigger>
            {uiFilters.level
              ? getOptionLabel(LEVEL_OPTIONS, uiFilters.level)
              : '난이도'}
          </Dropdown.Trigger>
          <Dropdown.Content>
            {LEVEL_OPTIONS.map(({ label, value }) => (
              <Dropdown.Item
                key={value}
                selected={uiFilters.level === value}
                onSelect={() => changeLevel(value)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <SessionFilterModal
          uiFilters={uiFilters}
          changeRegion={changeRegion}
          changeDate={changeDate}
          changeTime={changeTime}
          changeLevel={changeLevel}
          resetFilters={resetFilters}
        >
          <FilterButton className="pl-2" />
        </SessionFilterModal>
      </div>

      {/** 정렬 */}
      <Dropdown size="lg">
        <Dropdown.Trigger className="bg-transparent">
          {getOptionLabel(SORT_OPTIONS, queryFilters.sort)}
        </Dropdown.Trigger>
        <Dropdown.Content>
          {SORT_OPTIONS.map(({ label, value }) => (
            <Dropdown.Item
              key={value}
              selected={queryFilters.sort === value}
              onSelect={() => changeSort(value)}
            >
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
