'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { cn } from '@/lib/utils';
import { Session } from '@/types';
import CrewShortInfo from './CrewShortInfo';
import CrewShortInfoSkeleton from './CrewShortInfo/CrewShortInfoSkeleton';
import SessionDetailInfo from './SessionDetailInfo';
import SessionImage from './SessionImage';
import SessionShortInfo from './SessionShortInfo';

interface SessionDetailProps {
  sessionId: Session['id'];
}

export default function SessionDetail({ sessionId }: SessionDetailProps) {
  const sessionQuery = useSuspenseQuery(
    sessionQueries.detail(Number(sessionId))
  );
  const session = sessionQuery.data;
  const crewId = session?.crewId;

  return (
    <>
      {/* Mobile & Tablet Layout */}
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        <SessionImage image={session.image} name={session.name} />
        <SessionShortInfo session={session} crewId={crewId} />
        <SessionDetailInfo session={session} />
        <Suspense fallback={<CrewShortInfoSkeleton />}>
          <CrewShortInfo crewId={crewId} />
        </Suspense>
      </div>

      {/* Desktop Layout */}
      <div
        className={cn(
          'laptop:flex hidden',
          'mx-auto max-w-[1120px] gap-10 bg-gray-900 py-10'
        )}
      >
        <div className="flex flex-1 flex-col gap-10 px-5">
          <SessionImage image={session.image} name={session.name} />
          <SessionDetailInfo session={session} />
        </div>
        <div className="laptop:w-[360px] flex flex-col gap-10">
          <SessionShortInfo session={session} crewId={crewId} />
          <Suspense fallback={<CrewShortInfoSkeleton />}>
            <CrewShortInfo crewId={crewId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
