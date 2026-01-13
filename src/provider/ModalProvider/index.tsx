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
  closeAll: () => void;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);

/**
 * 모달 스택을 관리하는 Provider
 * - 모달 열기/닫기 액션 제공
 * - 배경 스크롤 방지
 * - 포커스 복귀
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { modals, open, close, closeAll } = useModalState();

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
    <ModalActionsContext.Provider value={{ open, close, closeAll }}>
      {children}
      <ModalPortal modals={modals} close={close} />
    </ModalActionsContext.Provider>
  );
}

/** 모달 스택 상태 관리 훅 */
function useModalState() {
  const [modals, dispatch] = React.useReducer(stackReducer<Modal>, []);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

  const open = React.useCallback(
    (id: string, render: () => React.ReactNode) => {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      dispatch({ type: 'PUSH', item: { id, render } });
    },
    []
  );

  const close = React.useCallback(() => {
    dispatch({ type: 'POP' });
  }, []);

  const closeAll = React.useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  // 모달이 모두 닫히면 포커스 복귀
  React.useEffect(() => {
    if (modals.length === 0 && previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, [modals.length]);

  return { modals, open, close, closeAll };
}

/**
 * 모달을 열고 닫는 액션을 가져오는 훅
 * @example
 * const { open, close } = useModal();
 * open('my-modal', () => <MyModalContent />);
 */
export function useModal() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}
