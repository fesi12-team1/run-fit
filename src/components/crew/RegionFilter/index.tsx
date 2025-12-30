'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import FilterModalTrigger from '@/components/ui/FilterModalTrigger';
import Popover from '@/components/ui/FilterPopover';
import ResponsiveBottomSheet from '@/components/ui/ResponsiveBottomSheet';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { SIDO_LIST } from '@/types/region';

interface RegionFilterProps {
  value?: string[];
  onChange: (value?: string[]) => void;
}

export default function RegionFilter({ value, onChange }: RegionFilterProps) {
  const isMobile = useMediaQuery({ max: 'tablet' });

  const [open, setOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<string[]>(value || []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) setTempSelected(value || []);
  };

  const handleToggle = (sido: string, checked: boolean) => {
    setTempSelected((prev) =>
      checked ? [...prev, sido] : prev.filter((v) => v !== sido)
    );
  };

  const handleReset = () => {
    setTempSelected([]);
    onChange(undefined);
    setOpen(false);
  };

  const handleApply = () => {
    onChange(tempSelected.length > 0 ? tempSelected : undefined);
    setOpen(false);
  };

  const getLabel = () => {
    const defaultLabel = isMobile ? '지역' : '지역 전체';

    if (!value || value.length === 0) return defaultLabel;

    const [first, ...rest] = value;
    if (rest.length === 0) return first;

    return `${first} 외 ${rest.length}`;
  };

  const label = getLabel();

  if (isMobile) {
    return (
      <>
        <FilterModalTrigger
          hasSelected={Boolean(value?.length)}
          size="lg"
          onClick={() => handleOpenChange(true)}
        >
          {label}
        </FilterModalTrigger>

        <ResponsiveBottomSheet open={open} onClose={() => setOpen(false)}>
          <h4 className="text-body2-semibold mb-4">지역 필터</h4>

          <div className="grid w-full grid-cols-5 gap-3">
            {SIDO_LIST.map((sido) => (
              <Chip
                key={sido}
                tone="secondary"
                state={tempSelected.includes(sido) ? 'active' : 'default'}
                onClick={() => handleToggle(sido, !tempSelected.includes(sido))}
              >
                {sido}
              </Chip>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              className="text-body3-regular py-2 pr-3 pl-6"
              onClick={handleReset}
            >
              초기화
            </button>
            <Button
              className="text-body2-semibold flex-1"
              onClick={handleApply}
            >
              결과 보기
            </Button>
          </div>
        </ResponsiveBottomSheet>
      </>
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger hasSelected={Boolean(value)} size="lg">
        {label}
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className="flex w-auto shrink-0 flex-col gap-6 overflow-hidden rounded-xl border-none bg-gray-700 px-5 py-6"
      >
        <h4 className="text-body3-semibold">지역 필터</h4>

        <div className="grid h-[180px] w-[308px] grid-cols-5 gap-3">
          {SIDO_LIST.map((sido) => (
            <Chip
              key={sido}
              tone="secondary"
              state={tempSelected.includes(sido) ? 'active' : 'default'}
              onClick={() => handleToggle(sido, !tempSelected.includes(sido))}
            >
              {sido}
            </Chip>
          ))}
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <button
            className="text-body3-regular py-2 pr-3 pl-6"
            onClick={handleReset}
          >
            초기화
          </button>
          <Button className="text-body2-semibold flex-1" onClick={handleApply}>
            결과 보기
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
