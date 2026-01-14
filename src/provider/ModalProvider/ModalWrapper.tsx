import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useModalContext } from './IndividualModalContext';
import { Modal } from './types';

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
export default function ModalWrapper({
  modal,
  isTop,
  close,
}: ModalWrapperProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { labelId, descriptionId } = useModalContext();

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

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed inset-0 m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0',
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
      {modal.render()}
    </dialog>
  );
}
