'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Calendar from '@/components/ui/Calendar';
import Checkbox from '@/components/ui/Checkbox';
import Chip from '@/components/ui/Chip';
import Modal from '@/components/ui/Modal';
import Tabs from '@/components/ui/Tabs';
import TimeSlider from '@/components/ui/TimeSlider';
import {
  DEFAULT_SESSION_FILTER,
  SESSION_FILTER_TABS,
  SESSION_LEVEL_OPTIONS,
} from '@/constants/session';
import { useSessionFilterContext } from '@/provider/SessionFilterProvider';
import { SessionFilterState } from '@/types';
import { Sido, SIDO_LIST, SIGUNGU_MAP } from '@/types/region';

interface FilterModalProps {
  children: React.ReactNode;
}

export default function FilterModal({ children }: FilterModalProps) {
  const { draft, reset, apply } = useSessionFilterContext();

  // 모든 필터를 내부 임시 상태로 관리
  const [tempRegion, setTempRegion] = useState<SessionFilterState['region']>(
    draft.region
  );
  const [tempDate, setTempDate] = useState<SessionFilterState['date']>(
    draft.date
  );
  const [tempTime, setTempTime] = useState<SessionFilterState['time']>(
    draft.time
  );
  const [tempLevel, setTempLevel] = useState<SessionFilterState['level']>(
    draft.level
  );

  const [activeSido, setActiveSido] = useState<Sido>('서울');

  // 체크박스 토글 함수
  const handleToggle = (sido: string, sigungu: string, checked: boolean) => {
    setTempRegion((prev) => {
      const currentList = prev?.[sido] || [];
      const newList = checked
        ? [...currentList, sigungu]
        : currentList.filter((i) => i !== sigungu);

      if (newList.length === 0) {
        const next = { ...prev };
        delete next[sido];
        return next;
      }

      return { ...prev, [sido]: newList };
    });
  };

  // 전체 draft 적용
  const applyAll = () => {
    apply({
      ...draft,
      region: tempRegion,
      date: tempDate,
      time: tempTime,
      level: tempLevel,
    });
  };

  // 모달 열 때: draft 기준으로 temp 상태만 초기화
  const initializeFromDraft = () => {
    setTempRegion(draft.region);
    setTempDate(draft.date);
    setTempTime(draft.time);
    setTempLevel(draft.level);
    setActiveSido('서울');
  };

  const resetAll = () => {
    reset();
    setTempRegion(DEFAULT_SESSION_FILTER.region);
    setTempDate(DEFAULT_SESSION_FILTER.date);
    setTempTime(DEFAULT_SESSION_FILTER.time);
    setTempLevel(DEFAULT_SESSION_FILTER.level);
    setActiveSido('서울');
  };

  useEffect(() => {
    setTempRegion(draft.region);
    setTempDate(draft.date);
    setTempTime(draft.time);
    setTempLevel(draft.level);
  }, [draft]);

  return (
    <Modal
      onOpenChange={(open) => {
        if (open) initializeFromDraft();
      }}
    >
      <Modal.Trigger asChild>{children}</Modal.Trigger>

      <Modal.Content className="max-h-[546px] min-h-[356px] w-[540px] p-7">
        <Modal.Header className="w-full">
          <Modal.Title>필터</Modal.Title>
        </Modal.Header>

        <Modal.Description asChild className="min-h-[120px] w-full">
          <div className="min-h-[120px] w-full">
            <Tabs className="w-full" defaultValue="region">
              <Tabs.List className="mb-3">
                {SESSION_FILTER_TABS.map((tab) => (
                  <Tabs.Trigger key={tab.key} size="sm" value={tab.key}>
                    {tab.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <div className="flex min-h-[120px] w-full flex-col items-center">
                {/* 지역 필터 */}
                <Tabs.Content className="w-full" value="region">
                  <div className="grid h-[310px] w-full grid-cols-[160px_1fr]">
                    {/* 시/도 리스트 */}
                    <ul className="w-40 overflow-y-auto rounded-lg bg-gray-600 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent">
                      {SIDO_LIST.map((sido) => (
                        <li key={sido}>
                          <button
                            className="text-body3-regular w-full px-4 py-3 text-left text-gray-100 hover:bg-gray-800"
                            onClick={() => setActiveSido(sido)}
                          >
                            {sido}
                            {tempRegion && tempRegion[sido]?.length > 0 && (
                              <span className="bg-brand-400 ml-2 inline-block size-1.5 rounded-full" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* 시/군/구 리스트 */}
                    <div className="scrollbar-hide overflow-y-auto bg-gray-700 px-3 py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent">
                      <div className="grid grid-cols-2">
                        {SIGUNGU_MAP[activeSido]?.map((sigungu) => {
                          const checked =
                            tempRegion?.[activeSido]?.includes(sigungu) ??
                            false;

                          return (
                            <label
                              key={sigungu}
                              className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:opacity-80"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(v) =>
                                  handleToggle(activeSido, sigungu, v === true)
                                }
                              />
                              <span className="text-body3-regular text-gray-50 select-none">
                                {sigungu}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Tabs.Content>

                {/* 날짜 필터 */}
                <Tabs.Content value="date">
                  <Calendar.Range
                    className="w-[315px]"
                    selected={tempDate}
                    onSelect={setTempDate}
                  />
                </Tabs.Content>

                {/* 시간 필터 */}
                <Tabs.Content className="w-full px-[78px]" value="time">
                  <TimeSlider
                    value={tempTime || [0, 720]}
                    onValueChange={setTempTime}
                  />
                </Tabs.Content>

                {/* 난이도 필터 */}
                <Tabs.Content className="flex w-full gap-2" value="level">
                  {SESSION_LEVEL_OPTIONS.map(({ label, value }) => (
                    <Chip
                      key={value ?? 'all'}
                      state={tempLevel === value ? 'active' : 'default'}
                      tone="secondary"
                      onClick={() => setTempLevel(value)}
                    >
                      {label}
                    </Chip>
                  ))}
                </Tabs.Content>
              </div>
            </Tabs>
          </div>
        </Modal.Description>

        {/* FOOTER */}
        <Modal.Footer className="flex w-full justify-between">
          <Modal.Close asChild>
            <button className="px-6 py-2" onClick={resetAll}>
              초기화
            </button>
          </Modal.Close>

          <Modal.Close asChild>
            <Button className="flex-1" onClick={applyAll}>
              결과 보기
            </Button>
          </Modal.Close>
        </Modal.Footer>

        <Modal.CloseButton />
      </Modal.Content>
    </Modal>
  );
}
