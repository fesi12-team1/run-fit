'use client';

import { useEffect } from 'react';

declare global {
  // msw가 한 번만 시작되도록 전역 플래그를 설정합니다.
  var __mswStarted: boolean | undefined;
}

export default function MockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (process.env.NEXT_PUBLIC_USE_MSW !== 'true') return;
    if (globalThis.__mswStarted) return;
    globalThis.__mswStarted = true;

    import('.')
      .then(({ worker }) => worker.start())
      .then(() => console.log('[MSW] Mock Service Worker is running'));
  }, []);

  return <>{children}</>;
}
