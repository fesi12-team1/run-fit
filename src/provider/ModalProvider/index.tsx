'use client';

import React from 'react';
import stackReducer from '@/lib/stackReducer';
import ModalPortal from './ModalPortal';
import type { Modal } from './types';

// Re-exports
export type { Modal, ModalContextValue } from './types';
export { useModalContext } from './ModalContext';

interface ModalActions {
  open: (id: string, render: () => React.ReactNode) => void;
  close: () => void;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);

/**
 * 모달 스택을 관리하는 Provider
 * - 모달 열기/닫기 액션 제공
 * - 배경 스크롤 방지
 */
export function ModalControllerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modals, dispatch] = React.useReducer(stackReducer<Modal>, []);

  const open = React.useCallback(
    (id: string, render: () => React.ReactNode) => {
      dispatch({ type: 'PUSH', item: { id, render } });
    },
    []
  );

  const close = React.useCallback(() => {
    dispatch({ type: 'POP' });
  }, []);

  // 배경 스크롤 방지
  React.useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modals.length]);

  return (
    <ModalActionsContext.Provider value={{ open, close }}>
      {children}
      <ModalPortal modals={modals} close={close} />
    </ModalActionsContext.Provider>
  );
}

export function useModalController() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx)
    throw new Error(
      'useModalController must be used within a ModalPModalControllerProviderrovider'
    );
  return ctx;
}
