'use client';

import Image from 'next/image';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SessionPageContent from '@/components/session/SessionPageContent';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Page() {
  return (
    <Layout>
      <ErrorBoundary
        fallback={
          <div className="h-main text-error-100 flex items-center justify-center">
            세션 목록을 불러오는데 실패했습니다.
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="h-main flex items-center justify-center text-gray-300">
              로딩 중...
            </div>
          }
        >
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
  const isLaptopUp = useMediaQuery({ min: 'laptop' });

  return (
    <div
      className={
        'laptop:pt-[33px] tablet:py-[26px] tablet:flex tablet:items-center tablet:justify-between hidden w-full'
      }
    >
      <div>
        <h2 className="text-title1-bold mb-4 italic">
          <Image
            src="/assets/session-list-title.png"
            alt="Sessions"
            width={245.18}
            height={70}
          />
        </h2>
        <span className="text-body3-regular text-gray-200">
          러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
        </span>
      </div>
      <div className="pt-[30px] pb-5">
        <Image
          src="/assets/session-list.png"
          alt="Session List"
          width={isLaptopUp ? 417 : 302}
          height={isLaptopUp ? 235 : 170}
        />
      </div>
    </div>
  );
}
