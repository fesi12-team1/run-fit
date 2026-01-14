'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalWrapper from './ModalWrapper';
import { Modal } from './types';

const MODAL_CONTAINER_ID = 'modal-container';

interface ModalPortalProps {
  modals: Modal[];
  topModalId: string | null;
  close: () => void;
}

export default function ModalPortal({
  modals,
  close,
  topModalId,
}: ModalPortalProps) {
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

  if (!modalContainer) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <ModalWrapper
          key={modal.id}
          modal={modal}
          isTop={modal.id === topModalId}
          close={close}
        />
      ))}
    </>,
    modalContainer
  );
}
