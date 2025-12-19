'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import DateFilter from '@/components/session/DateFilter';
import FilterModal from '@/components/session/FilterModal';
import LevelFilter from '@/components/session/LevelFilter';
import RegionFilter from '@/components/session/RegionFilter';
import SessionCard from '@/components/session/SessionCard';
import SortOptions from '@/components/session/SortOptions';
import TimeFilter from '@/components/session/TimeFilter';
import FilterButton from '@/components/ui/FilterButton';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';

export default function SessionPage() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const { data: sessions } = useQuery(
    sessionQueries.list({
      size: 10,
      ...queryFilters,
    })
  );

  const isTabletUp = useMediaQuery({ min: 'tablet' });
  const isLaptopUp = useMediaQuery({ min: 'laptop' });

  const isDesktop = isLaptopUp;
  const isTablet = isTabletUp && !isLaptopUp;
  const isMobile = !isTabletUp;

  return (
    <SessionFilterProvider initialFilters={filters} applyFilters={applyFilters}>
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
              나와 FIT한
              <br />
              러닝 메이트를 찾다
            </h2>
            <span className="text-body3-regular text-gray-200">
              러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
            </span>
          </div>
          <div className="pt-[30px] pb-5">
            <Image
              src="/assets/session-list.png"
              alt="Session List"
              width={417}
              height={235}
            />
          </div>
        </div>
        <div className="mb-6 w-full">
          <div className="flex w-full items-center justify-between gap-2">
            <div
              className={cn(
                'flex items-center gap-2',
                (isMobile || isTablet) &&
                  'scrollbar-hidden w-full overflow-scroll'
              )}
            >
              <div className="shrink-0">
                <RegionFilter
                  value={filters.region}
                  onChange={(region) => applyFilters({ ...filters, region })}
                />
              </div>
              <div className="shrink-0">
                <DateFilter
                  value={filters.date}
                  onChange={(date) => applyFilters({ ...filters, date })}
                />
              </div>
              <div className="shrink-0">
                <TimeFilter
                  value={filters.time}
                  onChange={(time) => applyFilters({ ...filters, time })}
                />
              </div>
              <div className="shrink-0">
                <LevelFilter
                  value={filters.level}
                  onChange={(level) => applyFilters({ ...filters, level })}
                />
              </div>
              {isDesktop && (
                <FilterModal>
                  <FilterButton count={activeFilterCount} />
                </FilterModal>
              )}
            </div>
            {(isTablet || isDesktop) && (
              <div className="flex items-center gap-2">
                {isTablet && (
                  <FilterModal>
                    <FilterButton count={activeFilterCount} />
                  </FilterModal>
                )}
                <div className="shrink-0">
                  <SortOptions
                    value={filters.sort}
                    onChange={(sort) => applyFilters({ ...filters, sort })}
                  />
                </div>
              </div>
            )}
            {isMobile && (
              <div className="ml-auto flex items-center">
                <FilterModal>
                  <FilterButton count={activeFilterCount} />
                </FilterModal>
              </div>
            )}
          </div>
          {isMobile && (
            <div className="mt-2 flex w-full shrink-0 justify-end">
              <SortOptions
                value={filters.sort}
                onChange={(sort) => applyFilters({ ...filters, sort })}
              />
            </div>
          )}
        </div>
        <div
          className={cn(
            'grid w-full grid-cols-2 gap-6',
            isDesktop && 'grid-cols-3'
          )}
        >
          {sessions?.content?.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </main>
    </SessionFilterProvider>
  );
}
