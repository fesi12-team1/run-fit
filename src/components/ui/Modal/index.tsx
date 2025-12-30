'use client';

import XIcon from '@assets/icons/x.svg?react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
import { cn } from '@/lib/utils';

function ModalRoot({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function ModalTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function ModalClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

function ModalContent({
  className,
  children,
  fullscreenWhenMobile,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  fullscreenWhenMobile?: boolean;
}) {
  return (
    <ModalPortal data-slot="dialog-portal">
      <ModalOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // base (모바일 기준)
          'fixed z-50 flex flex-col items-center gap-6 border border-gray-600 bg-gray-700 p-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)] duration-200',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',

          fullscreenWhenMobile
            ? [
                'top-0 left-0 h-dvh w-dvw translate-x-0 translate-y-0 rounded-none',
                'tablet:top-1/2 tablet:left-1/2 tablet:h-auto tablet:w-auto tablet:-translate-x-1/2 tablet:-translate-y-1/2 tablet:rounded-[20px]',
              ]
            : [
                // 일반 모달(항상 중앙)
                'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px]',
              ],
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ModalPortal>
  );
}

function ModalCloseButton({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close-button"
      className={cn(
        "absolute top-4 right-4 outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <XIcon className="size-6 text-gray-400" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  );
}

function ModalHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 self-start', className)}
      {...props}
    />
  );
}

function ModalFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex gap-2', className)}
      {...props}
    />
  );
}

function ModalTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-title3-semibold leading-none', className)}
      {...props}
    />
  );
}

function ModalDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-body2-medium', className)}
      {...props}
    />
  );
}

const Modal = Object.assign(ModalRoot, {
  Close: ModalClose,
  CloseButton: ModalCloseButton,
  Content: ModalContent,
  Description: ModalDescription,
  Footer: ModalFooter,
  Header: ModalHeader,
  Overlay: ModalOverlay,
  Portal: ModalPortal,
  Title: ModalTitle,
  Trigger: ModalTrigger,
});

export default Modal;
