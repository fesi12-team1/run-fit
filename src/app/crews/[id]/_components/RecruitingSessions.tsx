'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionCard from '@/components/session/SessionCard';
import Spinner from '@/components/ui/Spinner';
import { cn } from '@/lib/utils';

interface RecruitingSessionsProps {
  crewId: number;
}

export default function RecruitingSessions({
  crewId,
}: RecruitingSessionsProps) {
  const {
    data: recruitingSessions,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery(
    sessionQueries.infiniteList({
      size: 10,
      crewId,
      sort: 'registerByAsc',
      status: 'OPEN',
    })
  );

  const recruitingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = recruitingRef.current;
    if (!el || !hasNextPage) return;

    const handleScroll = () => {
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 20;

      if (isEnd && !isFetching) {
        fetchNextPage();
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (!recruitingSessions || recruitingSessions.sessions.length === 0) {
    return (
      <span
        className={cn(
          'self-center justify-self-center text-gray-300',
          'text-body3-regular py-2.5',
          'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
        )}
      >
        현재 모집중인 세션이 없어요
      </span>
    );
  }

  return (
    <div ref={recruitingRef} className="flex gap-3 overflow-x-auto">
      {recruitingSessions.sessions.map((session) => (
        <div
          key={session.id}
          className="laptop:w-[calc((100%-24px)/3)] w-[calc((100%-12px)/2)] shrink-0"
        >
          <SessionCard
            session={session}
            displayParticipants={false}
            textSize="sm"
          />
        </div>
      ))}
      {isFetching && (
        <div className="flex shrink-0 items-center px-4">
          <Spinner className="text-brand-500 size-5" />
        </div>
      )}
    </div>
  );
}
