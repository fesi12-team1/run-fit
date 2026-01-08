'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type Modal = {
  id: string;
  render: () => React.ReactNode;
};

interface ModalActions {
  open: (id: string, render: () => React.ReactNode) => void;
  close: () => void;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);

type Action = { type: 'OPEN'; modal: Modal } | { type: 'CLOSE' };

function reducer(state: Modal[], action: Action): Modal[] {
  switch (action.type) {
    case 'OPEN': {
      return [...state, action.modal];
    }
    case 'CLOSE':
      return state.length ? state.slice(0, -1) : state;
    default:
      return state;
  }
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, dispatch] = React.useReducer(reducer, []);

  const open = React.useCallback(
    (id: string, render: () => React.ReactNode) => {
      dispatch({ type: 'OPEN', modal: { id, render } });
    },
    []
  );

  const close = React.useCallback(() => {
    dispatch({ type: 'CLOSE' });
  }, []);

  return (
    <ModalActionsContext.Provider value={{ open, close }}>
      {children}
      <ModalContainer modals={modals} />
    </ModalActionsContext.Provider>
  );
}

export function useModal() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}

const MODAL_CONTAINER_ID = 'modal-container';

const getModalZIndex = (index: number) => {
  return 50 + index * 10;
};

function ModalContainer({ modals }: { modals: Modal[] }) {
  const { close } = useModal();

  useEffect(() => {
    if (document.getElementById(MODAL_CONTAINER_ID)) return;

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_CONTAINER_ID;
    document.body.appendChild(modalDOM);

    return () => {
      document.body.removeChild(modalDOM);
    };
  }, []);

  const el =
    typeof window !== 'undefined'
      ? document.getElementById(MODAL_CONTAINER_ID)
      : null;

  if (!el || modals.length === 0) return null;

  const topModalIndex = modals.length - 1;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/50"
        style={{ zIndex: getModalZIndex(topModalIndex) }}
        onClick={close}
      />
      {modals.map((m, idx) => {
        const isTop = idx === topModalIndex;
        return (
          <div
            key={m.id}
            className={cn(
              'fixed inset-0 flex items-center justify-center',
              isTop || 'pointer-events-none'
            )}
            style={{ zIndex: getModalZIndex(idx) }}
          >
            {m.render()}
          </div>
        );
      })}
    </>,
    el
  );
}
