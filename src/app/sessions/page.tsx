'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SessionPageContent from '@/components/session/SessionPageContent';
import SessionPageContentErrorFallback from '@/components/session/SessionPageContent/SessionPageContentErrorFallback';
import SessionPageContentSkeleton from '@/components/session/SessionPageContent/SessionPageContentSkeleton';
import { generateNextImageSizes } from '@/lib/Image';

export default function Page() {
  return (
    <Layout>
      <ErrorBoundary fallback={<SessionPageContentErrorFallback />}>
        <Suspense fallback={<SessionPageContentSkeleton />}>
          <SessionPageContent />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={
        'h-main tablet:px-8 tablet:pt-0 laptop:px-0 mx-auto flex max-w-[1120px] flex-col items-center justify-start px-4 pt-6'
      }
    >
      <Header />
      {children}
    </main>
  );
}

function Header() {
  return (
    <div
      className={
        'laptop:pt-[33px] tablet:py-[26px] tablet:flex tablet:items-center tablet:justify-between hidden w-full'
      }
    >
      <div>
        <Image
          src="/assets/session-list-title.png"
          alt="나와 FIT한 러닝 메이트를 찾다"
          width={245}
          height={70}
          className="mb-4 h-[70px] w-[245.175px]"
        />
        <p className="text-body3-regular text-gray-200">
          러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
        </p>
      </div>
      <div className="tablet:w-[302px] tablet:h-[170px] laptop:w-[417px] laptop:h-[235px] relative h-[170px] w-[302px] pt-[30px] pb-5">
        <Image
          src="/assets/session-list.png"
          alt="Session List"
          fill
          priority
          sizes={generateNextImageSizes({
            mobile: '302px',
            tablet: '302px',
            laptop: '417px',
          })}
          className="object-contain"
        />
      </div>
    </div>
  );
}
