'use client';

import { ErrorBoundary } from '@suspensive/react';
import MyInfo from '@/components/my/MyInfo';
import MyTabs from '@/components/my/MyTabs';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const dynamic = 'force-dynamic';

function ErrorFallback() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
      <p className="text-body2-medium text-error-100">
        페이지를 불러오는데 실패했습니다.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="text-body3-medium text-brand-300 underline"
      >
        다시 시도
      </button>
    </div>
  );
}

export default function MyLayout({ children }: { children: React.ReactNode }) {
  const isSmallDevice = useMediaQuery({ max: 'laptop' });

  return (
    <div className="tablet:pt-7.5 laptop:pt-[47px] tablet:mx-20 laptop:mx-auto mx-6 flex max-w-[1320px] gap-20 pt-3.5">
      <aside className="laptop:block ml-5 hidden w-[327px]">
        <MyInfo />
      </aside>

      <div className="tablet:gap-16 laptop:gap-10 mx-5 flex min-w-0 flex-1 flex-col gap-[27px]">
        <div className="block w-full">
          <MyTabs isSmallDevice={isSmallDevice} />
        </div>
        <main className="flex-1">
          <ErrorBoundary fallback={ErrorFallback}>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
