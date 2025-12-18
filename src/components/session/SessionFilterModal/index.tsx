'use client';

import { DateRange } from 'react-day-picker';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Chip from '@/components/ui/Chip';
import Modal from '@/components/ui/Modal';
import Tabs from '@/components/ui/Tabs';
import TimeSlider from '@/components/ui/TimeSlider';
import { FILTER_TABS, LEVEL_OPTIONS } from '@/constants/session-filter';
import type { LevelValue, RegionValue } from '@/types';

interface SessionFilterModalProps {
  children: React.ReactNode;
  uiFilters: {
    region?: RegionValue;
    date?: DateRange;
    time?: [number, number];
    level?: LevelValue;
  };
  changeRegion: (v?: RegionValue) => void;
  changeDate: (v?: DateRange) => void;
  changeTime: (v?: [number, number]) => void;
  changeLevel: (v?: LevelValue) => void;
  resetFilters: () => void;
}

export default function SessionFilterModal({
  uiFilters,
  changeDate,
  changeRegion,
  changeLevel,
  changeTime,
  resetFilters,
  children,
}: SessionFilterModalProps) {
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
                {/* <RegionFilter value={uiFilters.region} onChange={changeRegion} /> */}
              </Tabs.Content>
              <Tabs.Content value="date">
                <Calendar.Range
                  className="w-[315px]"
                  selected={uiFilters.date}
                  onSelect={changeDate}
                />
              </Tabs.Content>
              <Tabs.Content value="time" className="w-full px-[78px]">
                <TimeSlider
                  value={[uiFilters.time?.[0] || 0, uiFilters.time?.[1] || 720]}
                  onValueChange={changeTime}
                />
              </Tabs.Content>
              <Tabs.Content value="level" className="flex w-full gap-2">
                {LEVEL_OPTIONS.map(({ label, value }) => (
                  <Chip
                    key={value}
                    tone="secondary"
                    state={uiFilters.level === value ? 'active' : 'default'}
                    onClick={() => changeLevel(value)}
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
