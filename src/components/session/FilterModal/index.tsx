'use client';

import { DateRange } from 'react-day-picker';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Chip from '@/components/ui/Chip';
import Modal from '@/components/ui/Modal';
import Tabs from '@/components/ui/Tabs';
import TimeSlider from '@/components/ui/TimeSlider';
import {
  FILTER_TABS,
  LEVEL_OPTIONS,
  type RegionFilterValue,
  type SessionFilterState,
} from '@/constants/session-filter';
import { Level } from '@/types';

interface FilterModalProps {
  children: React.ReactNode;
  filters: {
    region?: RegionFilterValue;
    date?: DateRange;
    time?: [number, number];
    level?: Level;
  };
  changeFilter: <K extends keyof SessionFilterState>(
    key: K,
    value: SessionFilterState[K]
  ) => void;
  resetFilters: () => void;
}

export default function FilterModal({
  filters,
  changeFilter,
  resetFilters,
  children,
}: FilterModalProps) {
  return (
    <Modal>
      {/* Trigger */}
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      {/* Content */}
      <Modal.Content className="max-h-[546px] min-h-[356px] w-[540px] p-7">
        {/* Header & Title */}
        <Modal.Header className="w-full">
          <Modal.Title>필터</Modal.Title>
        </Modal.Header>
        {/* Description & Body */}
        <Modal.Description className="min-h-[120px] w-full">
          <Tabs defaultValue="region" className="w-full">
            <Tabs.List className="mb-3">
              {FILTER_TABS.map((tab) => (
                <Tabs.Trigger key={tab.key} value={tab.key} size="sm">
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <div className="flex min-h-[120px] w-full flex-col items-center">
              <Tabs.Content value="region">
                {/* <RegionFilter value={filters.region} onChange={changeRegion} /> */}
              </Tabs.Content>
              <Tabs.Content value="date">
                <Calendar.Range
                  className="w-[315px]"
                  selected={filters.date}
                  onSelect={(value) => changeFilter('date', value)}
                />
              </Tabs.Content>
              <Tabs.Content value="time" className="w-full px-[78px]">
                <TimeSlider
                  value={[filters.time?.[0] || 0, filters.time?.[1] || 720]}
                  onValueChange={(value) => changeFilter('time', value)}
                />
              </Tabs.Content>
              <Tabs.Content value="level" className="flex w-full gap-2">
                {LEVEL_OPTIONS.map(({ label, value }) => (
                  <Chip
                    key={value ?? 'all'}
                    tone="secondary"
                    state={filters.level === value ? 'active' : 'default'}
                    onClick={() => changeFilter('level', value)}
                  >
                    {label}
                  </Chip>
                ))}
              </Tabs.Content>
            </div>
          </Tabs>
        </Modal.Description>
        {/* Footer */}
        <Modal.Footer className="flex w-full justify-between">
          <Modal.Close asChild>
            <button className="px-6 py-2" onClick={resetFilters}>
              초기화
            </button>
          </Modal.Close>
          <Modal.Close asChild>
            <Button className="flex-1">결과 보기</Button>
          </Modal.Close>
        </Modal.Footer>
        <Modal.CloseButton />
      </Modal.Content>
    </Modal>
  );
}
