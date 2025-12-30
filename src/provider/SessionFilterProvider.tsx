'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_SESSION_FILTER } from '@/constants/session';
import { SessionFilterState, SessionTabKey } from '@/types';

type Ctx = {
  draft: SessionFilterState;
  setDraft: React.Dispatch<React.SetStateAction<SessionFilterState>>;
  reset: () => void;
  apply: (next: SessionFilterState) => void;

  isModalOpen: boolean;
  modalTab: SessionTabKey;
  openModalTab: (tab: SessionTabKey) => void;
  closeModal: () => void;
};

const SessionFilterContext = createContext<Ctx | null>(null);

interface SessionFilterProviderProps {
  initialFilters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  children: React.ReactNode;
}

/**
 * 세션 필터 모달의 임시 상태(draft) + 모바일 모달 상태 관리 Provider
 */
export function SessionFilterProvider({
  initialFilters,
  applyFilters,
  children,
}: SessionFilterProviderProps) {
  const [draft, setDraft] = useState<SessionFilterState>(initialFilters);

  useEffect(() => {
    setDraft(initialFilters);
  }, [initialFilters]);

  const reset = () => {
    setDraft(DEFAULT_SESSION_FILTER);
    applyFilters(DEFAULT_SESSION_FILTER);
  };

  const apply = (next: SessionFilterState) => {
    setDraft(next);
    applyFilters(next);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<SessionTabKey>('region');

  const openModalTab = (tab: SessionTabKey) => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SessionFilterContext.Provider
      value={{
        draft,
        setDraft,
        reset,
        apply,

        isModalOpen,
        modalTab,
        openModalTab,
        closeModal,
      }}
    >
      {children}
    </SessionFilterContext.Provider>
  );
}

export function useSessionFilterContext() {
  const ctx = useContext(SessionFilterContext);
  if (!ctx) throw new Error('SessionFilterProvider 필요');
  return ctx;
}
