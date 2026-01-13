'use client';

import XIcon from '@/assets/icons/x.svg';
import { cn } from '@/lib/utils';
import { useModalContext } from '@/provider/ModalProvider';

export function ModalContent({
  className,
  children,
  fullscreenWhenMobile,
  ...props
}: React.ComponentProps<'div'> & {
  fullscreenWhenMobile?: boolean;
}) {
  return (
    <div
      className={cn(
        // base 스타일
        'relative flex flex-col items-center gap-6 border border-gray-600 bg-gray-700 p-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)]',
        'animate-in fade-in-0 zoom-in-95 duration-200 outline-none',

        fullscreenWhenMobile
          ? [
              'h-dvh w-dvw rounded-none',
              'tablet:h-auto tablet:w-auto tablet:rounded-[20px]',
            ]
          : 'rounded-[20px]',
        className
      )}
      data-slot="modal-content"
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 self-start', className)}
      data-slot="modal-header"
      {...props}
    />
  );
}

export function ModalTitle({
  className,
  ...props
}: React.ComponentProps<'h2'>) {
  const { labelId } = useModalContext();

  return (
    <h2
      className={cn('text-title3-semibold leading-none text-white', className)}
      data-slot="modal-title"
      id={labelId}
      {...props}
    />
  );
}

export function ModalDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  const { descriptionId } = useModalContext();

  return (
    <p
      className={cn('text-body2-medium text-gray-300', className)}
      data-slot="modal-description"
      id={descriptionId}
      {...props}
    />
  );
}

export function ModalFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex gap-2', className)}
      data-slot="modal-footer"
      {...props}
    />
  );
}

export function ModalCloseButton({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) {
  const { close } = useModalContext();

  return (
    <button
      aria-label="닫기"
      className={cn('absolute top-4 right-4 outline-none', className)}
      data-slot="modal-close-button"
      type="button"
      onClick={close}
      {...props}
    >
      {children || <XIcon className="size-6 text-gray-400" />}
    </button>
  );
}
