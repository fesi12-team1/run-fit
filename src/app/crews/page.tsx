'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import CreateCrewButton from './_components/CreateCrewButton';
import CrewPageContent from './_components/CrewPageContent';
import CrewPageContentErrorFallback from './_components/CrewPageContent/CrewPageContentErrorFallback';
import CrewPageContentSkeleton from './_components/CrewPageContent/CrewPageContentSkeleton';

export default function Page() {
  return (
    <Layout>
      <ErrorBoundary fallback={<CrewPageContentErrorFallback />}>
        <Suspense fallback={<CrewPageContentSkeleton />}>
          <CrewPageContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start p-6">
      <Header />
      {children}
      <CreateCrewButton />
    </main>
  );
}

function Header() {
  return (
    <div className="tablet:flex hidden w-full items-center justify-between">
      <div className="my-[45px]">
        <h1 className="text-title2-semibold mb-1 text-gray-50">
          나와 FIT한 러닝 메이트를 찾다
        </h1>
        <p className="text-body3-regular text-gray-200">
          나와 잘 맞는 러닝 크루를 찾아보세요!
        </p>
      </div>
    </div>
  );
}
