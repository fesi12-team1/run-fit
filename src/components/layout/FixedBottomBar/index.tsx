'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FixedBottomBarProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FixedBottomBar({
  children,
  className,
}: FixedBottomBarProps) {
  const barRef = useRef<HTMLElement>(null);
  const [barHeight, setBarHeight] = useState(0);

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

      <nav
        ref={barRef}
        aria-label="하단 고정 메뉴"
        className={cn(
          'laptop:hidden fixed inset-x-0 bottom-0 z-10',
          'bg-gray-750 p-6',
          'pb-[calc(1.5rem+env(safe-area-inset-bottom))]',
          className
        )}
        role="navigation"
      >
        {children}
      </nav>
    </>
  );
}
