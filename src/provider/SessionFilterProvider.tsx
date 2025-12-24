'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_SESSION_FILTER,
  type SessionFilterState,
} from '@/constants/session-filter';

type Ctx = {
  draft: SessionFilterState;
  setDraft: React.Dispatch<React.SetStateAction<SessionFilterState>>;
  reset: () => void;
  apply: (next: SessionFilterState) => void;
};

const SessionFilterContext = createContext<Ctx | null>(null);

interface SessionFilterProviderProps {
  initialFilters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  children: React.ReactNode;
}

/**
 * 세션 필터 모달의 임시 상태(draft)를 관리하는 Provider
 *
 * - initialFilters 기준 모달 내부 상태 유지
 * - 초기화/적용 시 외부 필터(applyFilters) 업데이트
 *
 * @param initialFilters URL에서 계산된 현재 필터 상태
 * @param applyFilters 필터 적용 시 호출되는 콜백 (useSessionFilters.applyFilters)
 * @param children Provider 하위 노드
 */
export function SessionFilterProvider({
  initialFilters,
  applyFilters,
  children,
}: SessionFilterProviderProps) {
  // draft = 모달 내부 임시 상태
  const [draft, setDraft] = useState<SessionFilterState>(initialFilters);

  // URL 변경 -> initialFilters 변경 -> 모달 열 때 기준이 바뀌어야 함
  useEffect(() => {
    setDraft(initialFilters);
  }, [initialFilters]);

  // 초기화 = DEFAULT_SESSION_FILTER로 즉시 화면/URL도 리셋
  const reset = () => {
    setDraft(DEFAULT_SESSION_FILTER);
    applyFilters(DEFAULT_SESSION_FILTER);
  };

  // 적용 = draft를 화면/URL에 반영
  const apply = (next: SessionFilterState) => {
    setDraft(next);
    applyFilters(next);
  };

  return (
    <SessionFilterContext.Provider value={{ draft, setDraft, reset, apply }}>
      {children}
    </SessionFilterContext.Provider>
  );
}

export function useSessionFilterContext() {
  const ctx = useContext(SessionFilterContext);
  if (!ctx) throw new Error('SessionFilterProvider 필요');
  return ctx;
}
