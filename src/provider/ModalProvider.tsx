'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type Modal = {
  id: string;
  render: () => React.ReactNode;
};

interface ModalActions {
  open: (id: string, render: () => React.ReactNode) => void;
  close: () => void;
}

const ModalActionsContext = React.createContext<ModalActions | null>(null);
const ModalStateContext = React.createContext<Modal[] | null>(null);

type Action = { type: 'OPEN'; modal: Modal } | { type: 'CLOSE' };

function reducer(state: Modal[], action: Action): Modal[] {
  switch (action.type) {
    case 'OPEN': {
      // 같은 id 중복 방지(정책): 있으면 제거하고 top으로 올리기
      const withoutSame = state.filter((m) => m.id !== action.modal.id);
      return [...withoutSame, action.modal];
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
      <ModalStateContext.Provider value={modals}>
        {children}
        <ModalContainer />
      </ModalStateContext.Provider>
    </ModalActionsContext.Provider>
  );
}

export function useModal() {
  const ctx = React.useContext(ModalActionsContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}

function useModalState() {
  const ctx = React.useContext(ModalStateContext);
  if (!ctx)
    throw new Error('useModalState must be used within a ModalProvider');
  return ctx;
}

const MODAL_CONTAINER_ID = 'modal-container';

function ModalContainer() {
  const modals = useModalState();
  const { close } = useModal(); // overlay 클릭으로 닫을 거면

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

  const topModalIndex = modals.length - 1; // 최상단 모달의 인덱스

  return createPortal(
    <>
      {/* overlay 1개 */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={close} // top 닫기
        style={{ zIndex: 51 + topModalIndex }}
      />

      {/* 모달들 */}
      {modals.map((m, idx) => {
        const isTop = idx === modals.length - 1;
        return (
          <div
            key={m.id}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ zIndex: 51 + idx }}
          >
            <div className={isTop ? '' : 'pointer-events-none opacity-95'}>
              {m.render()}
            </div>
          </div>
        );
      })}
    </>,
    el
  );
}
