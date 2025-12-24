'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';
import FilterBar from '../FilterBar';
import SessionList from '../SessionList';

export default function SessionPageInner() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery(
    sessionQueries.list({
      size: 10,
      ...queryFilters,
    })
  );

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center text-gray-300">
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-main text-error-100 flex items-center justify-center">
        세션 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <SessionFilterProvider initialFilters={filters} applyFilters={applyFilters}>
      <PageLayout>
        <FilterBar
          filters={filters}
          applyFilters={applyFilters}
          activeFilterCount={activeFilterCount}
        />
        <SessionList data={sessions?.content} />
      </PageLayout>
    </SessionFilterProvider>
  );
}

function PageLayout({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery({ min: 'laptop' });
  const isTablet = useMediaQuery({ min: 'tablet', max: 'laptop' });
  const isMobile = useMediaQuery({ max: 'tablet' });

  return (
    <main
      className={cn(
        'h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start',
        isMobile && 'px-4 pt-6',
        isTablet && 'px-8',
        isDesktop && 'px-0'
      )}
    >
      <div
        className={cn(
          'flex w-full items-center justify-between',
          isMobile && 'hidden',
          isTablet && 'py-[26px]',
          isDesktop && 'pt-[33px]'
        )}
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
            width={isDesktop ? 417 : 302}
            height={isDesktop ? 235 : 170}
          />
        </div>
      </div>
      {children}
    </main>
  );
}
