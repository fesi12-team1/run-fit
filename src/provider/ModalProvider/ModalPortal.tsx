'use client';

import React, { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { ModalContext } from './ModalContext';

const MODAL_CONTAINER_ID = 'modal-container';

/** 모달 스택에 저장되는 모달 정보 */
export type Modal = {
  id: string;
  render: () => React.ReactNode;
};

/** 개별 모달 내부에서 사용하는 Context 값 */
export interface ModalContextValue {
  /** aria-labelledby 연결용 ID */
  labelId: string;
  /** aria-describedby 연결용 ID */
  descriptionId: string;
  /** 현재 모달 닫기 */
  close: () => void;
}

interface ModalPortalProps {
  modals: Modal[];
  close: () => void;
}

export default function ModalPortal({ modals, close }: ModalPortalProps) {
  useEffect(() => {
    if (document.getElementById(MODAL_CONTAINER_ID)) return;

    const modalDOM = document.createElement('div');
    modalDOM.id = MODAL_CONTAINER_ID;
    document.body.appendChild(modalDOM);

    return () => {
      document.body.removeChild(modalDOM);
    };
  }, []);

  const modalContainer =
    typeof window !== 'undefined'
      ? document.getElementById(MODAL_CONTAINER_ID)
      : null;

  if (!modalContainer || modals.length === 0) return null;

  const topModalIndex = modals.length - 1;

  return createPortal(
    <>
      {modals.map((modal, idx) => (
        <ModalDialog
          key={modal.id}
          modal={modal}
          isTop={idx === topModalIndex}
          close={close}
        />
      ))}
    </>,
    modalContainer
  );
}

interface ModalDialogProps {
  modal: Modal;
  isTop: boolean;
  close: () => void;
}

/**
 * 개별 모달을 <dialog>로 감싸는 Wrapper
 * - 브라우저 네이티브 Focus trap, Top Layer 사용
 * - 접근성 속성 (aria-modal, aria-labelledby, aria-describedby) 제공
 * - ESC 키, backdrop 클릭 처리
 */
function ModalDialog({ modal, isTop, close }: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const labelId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    if (isTop) {
      close();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && isTop) {
      close();
    }
  };

  const contextValue: ModalContextValue = {
    labelId,
    descriptionId,
    close,
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed inset-0 m-0 h-dvh w-dvw bg-transparent p-0',
        'flex items-center justify-center outline-none',
        isTop
          ? 'backdrop:animate-in backdrop:fade-in-0 backdrop:bg-black/50'
          : 'backdrop:bg-transparent',
        !isTop && 'pointer-events-none *:pointer-events-auto'
      )}
      aria-modal="true"
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <ModalContext.Provider value={contextValue}>
        {modal.render()}
      </ModalContext.Provider>
    </dialog>
  );
}
