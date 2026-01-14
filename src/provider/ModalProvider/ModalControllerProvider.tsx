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

  useBodyScrollLock(modals.length > 0);

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
      'useModalController must be used within a ModalControllerProvider'
    );
  return ctx;
}
