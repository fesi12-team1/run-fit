'use client';

import { cn } from '@/lib/utils';

interface ResponsiveBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Desktop → Popover처럼 그대로 렌더링
 * Mobile → Bottom Sheet
 */
export default function ResponsiveBottomSheet({
  open,
  onClose,
  children,
  className,
}: ResponsiveBottomSheetProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-gray-700 px-8 pt-8 pb-10',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
