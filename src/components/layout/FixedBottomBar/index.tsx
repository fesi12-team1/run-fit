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
  const [height, setHeight] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const blockHeight = useRef(0);

  useEffect(() => {
    // console.log('useEffect starts');
    const observer = new ResizeObserver(([entry]) => {
      const newBlockHeight = entry.target.getBoundingClientRect().height;
      if (blockHeight.current !== newBlockHeight) {
        blockHeight.current = newBlockHeight;
        setHeight(newBlockHeight);
      }
    });

    const currentRef = ref.current;
    if (currentRef) {
      blockHeight.current = currentRef.offsetHeight;
      setHeight(blockHeight.current);

      observer.observe(currentRef);
      // console.log('ResizeObserver observe');

      return () => {
        observer.disconnect();
        // console.log('ResizeObserver disconnect');
      };
    }
  }, []);

  return { ref, height };
}
