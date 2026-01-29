'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export const FIXED_BOTTOM_BAR_CONTAINER_ID = 'fixed-bottom-bar-container';

type FixedBottomBarProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FixedBottomBar({
  children,
  className,
}: FixedBottomBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [barHeight, setBarHeight] = useState(0);
  const portalTarget =
    typeof document !== 'undefined'
      ? document.getElementById(FIXED_BOTTOM_BAR_CONTAINER_ID)
      : null;

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const h = bar.getBoundingClientRect().height;
      setBarHeight((prev) => (prev === h ? prev : h));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(bar);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="laptop:hidden"
        style={{ height: barHeight }}
      />
      {portalTarget
        ? createPortal(
            <div
              ref={barRef}
              aria-label="하단 액션 바"
              className={cn(
                'laptop:hidden fixed inset-x-0 bottom-0 z-10',
                'bg-gray-750 p-6',
                'pb-[calc(1.5rem+env(safe-area-inset-bottom))]',
                className
              )}
            >
              {children}
            </div>,

            portalTarget
          )
        : null}
    </>
  );
}
