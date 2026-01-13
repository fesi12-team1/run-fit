'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { ModalContext } from './ModalContext';
import type { Modal, ModalContextValue } from './types';

const MODAL_CONTAINER_ID = 'modal-container';

interface ModalPortalProps {
  modals: Modal[];
  close: () => void;
}

/**
 * 모달을 DOM에 렌더링하는 Portal 컴포넌트
 * - Portal을 통해 body에 모달 렌더링
 * - 각 모달을 <dialog>로 감싸서 접근성 제공
 */
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

  const el =
    typeof window !== 'undefined'
      ? document.getElementById(MODAL_CONTAINER_ID)
      : null;

  if (!el || modals.length === 0) return null;

  const topModalIndex = modals.length - 1;

  return createPortal(
    <>
      {modals.map((modal, idx) => (
        <ModalWrapper
          key={modal.id}
          modal={modal}
          isTop={idx === topModalIndex}
          close={close}
        />
      ))}
    </>,
    el
  );
}

interface ModalWrapperProps {
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
function ModalWrapper({ modal, isTop, close }: ModalWrapperProps) {
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
        !isTop && 'pointer-events-none [&>*]:pointer-events-auto'
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
