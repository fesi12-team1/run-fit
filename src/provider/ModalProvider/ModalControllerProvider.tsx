'use client';

import React from 'react';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import stackReducer from '@/lib/stackReducer';
import ModalPortal from './ModalPortal';

export type Modal = {
  id: string;
  render: () => React.ReactNode;
};

interface ModalActions {
  open: (id: string, render: () => React.ReactNode) => void;
  close: () => void;
  topModalId: string | null;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);

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

  const topModalId = modals.at(-1)?.id ?? null;

  useBodyScrollLock(modals.length > 0);

  return (
    <ModalActionsContext.Provider value={{ open, close, topModalId }}>
      {children}
      <ModalPortal modals={modals} close={close} topModalId={topModalId} />
    </ModalActionsContext.Provider>
  );
}

export function useModalController() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx)
    throw new Error(
      'useModalController must be used within a ModalControllerProvider'
    );
  return ctx;
}
