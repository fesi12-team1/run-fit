'use client';

import { useEffect, useRef, useState } from 'react';

interface FixedBottomBarProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function FixedBottomBar({ children, ref }: FixedBottomBarProps) {
  return (
    <nav
      ref={ref}
      className="bg-gray-750 laptop:hidden fixed right-0 bottom-0 left-0 z-10 p-6"
      role="navigation"
      aria-label="하단 고정 메뉴"
    >
      {children}
    </nav>
  );
}

export function useFixedBottomBar() {
  const extraPadding = 30;
  const [height, setHeight] = useState(extraPadding);

  const ref = useRef<HTMLDivElement>(null);
  const blockHeight = useRef(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBlockHeight = entry.target.getBoundingClientRect().height;
        if (blockHeight.current !== newBlockHeight) {
          blockHeight.current = newBlockHeight;
          setHeight(newBlockHeight + extraPadding);
        }
      }, 100);
    });

    const currentRef = ref.current;
    if (currentRef) {
      blockHeight.current = currentRef.offsetHeight;
      setHeight(blockHeight.current + extraPadding);

      observer.observe(currentRef);

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { ref, height };
}
