'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import Popover from '@/components/ui/FilterPopover';
import { cn } from '@/lib/utils';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

type Sido = (typeof SIDO_LIST)[number];
type RegionValue = Record<string, string[]>;

interface RegionFilterProps {
  value?: RegionValue;
  onChange: (value?: RegionValue) => void;
}

export default function RegionFilter({ value, onChange }: RegionFilterProps) {
  const [open, setOpen] = useState(false);
  const [activeSido, setActiveSido] = useState<Sido>('서울');
  const [tempValue, setTempValue] = useState<RegionValue>(value || {});

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempValue(value || {});
    }
  };

  const handleReset = () => {
    setTempValue({});
    onChange(undefined);
    setOpen(false);
  };

  const handleApply = () => {
    const hasSelection = Object.keys(tempValue).some(
      (key) => tempValue[key].length > 0
    );
    onChange(hasSelection ? tempValue : undefined);
    setOpen(false);
  };

  const handleToggle = (sido: string, sigungu: string, checked: boolean) => {
    setTempValue((prev) => {
      const currentList = prev[sido] || [];
      let newList;

      if (checked) {
        newList = [...currentList, sigungu];
      } else {
        newList = currentList.filter((item) => item !== sigungu);
      }

      if (newList.length === 0) {
        const next = { ...prev };
        delete next[sido];
        return next;
      }

      return { ...prev, [sido]: newList };
    });
  };

  const getLabel = () => {
    if (!value || Object.keys(value).length === 0) return '지역';

    const sidos = Object.keys(value);
    const firstSido = sidos[0];
    const firstSigungu = value[firstSido][0];

    const totalCount = Object.values(value).reduce(
      (acc, curr) => acc + curr.length,
      0
    );

    if (totalCount === 1) {
      return `${firstSido} ${firstSigungu}`;
    }
    return `${firstSido} ${firstSigungu} 외 ${totalCount - 1}곳`;
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger hasSelected={Boolean(value)} size="lg">
        {getLabel()}
      </Popover.Trigger>

      <Popover.Content
        align="start"
        className="flex w-auto shrink-0 flex-col items-center justify-center gap-6 overflow-hidden border-none bg-gray-700"
      >
        <div className="flex h-[310px] w-[350px]">
          <ul className="w-[120px] overflow-y-auto rounded-lg bg-gray-600 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent">
            {SIDO_LIST.map((sido) => (
              <li key={sido}>
                <button
                  onClick={() => setActiveSido(sido)}
                  className="text-body3-regular w-full px-4 py-3 text-left text-gray-100 transition-colors hover:bg-gray-800"
                >
                  {sido}
                  {tempValue[sido]?.length > 0 && (
                    <span className="bg-brand-400 ml-2 inline-block size-1.5 rounded-full align-middle" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="scrollbar-hide w-2/3 overflow-y-auto bg-gray-700 px-3 py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="grid grid-cols-2">
              {SIGUNGU_MAP[activeSido]?.map((sigungu: string) => {
                const isChecked =
                  tempValue[activeSido]?.includes(sigungu) || false;

                return (
                  <label
                    key={sigungu}
                    className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:opacity-80"
                  >
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={(checked) =>
                        handleToggle(activeSido, sigungu, checked === true)
                      }
                      className="transition-colors"
                    />
                    <span
                      className={cn(
                        'text-body3-regular text-gray-50 select-none'
                      )}
                    >
                      {sigungu}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <button className="py-2 pr-3 pl-6" onClick={handleReset}>
            초기화
          </button>
          <Button className="flex-1" onClick={handleApply}>
            적용하기
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
