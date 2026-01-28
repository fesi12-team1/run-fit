'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { cn } from '@/lib/utils';
import { Session } from '@/types';
import CrewShortInfo from '../CrewShortInfo';
import CrewShortInfoSkeleton from '../CrewShortInfo/CrewShortInfoSkeleton';
import SessionDetailInfo from '../SessionDetailInfo';
import SessionImage from '../SessionImage';
import SessionShortInfo from '../SessionShortInfo';
import SessionShortInfoSkeleton from '../SessionShortInfo/SessionShortInfoSkeleton';

interface SessionDetailProps {
  session: Session;
}

export default function SessionDetail({ session }: SessionDetailProps) {
  const crewId = session?.crewId;

  return (
    <>
      {/* Mobile & Tablet Layout */}
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        <SessionImage image={session.image} name={session.name} />
        <ErrorBoundary fallback={<SessionShortInfoSkeleton />}>
          <Suspense fallback={<SessionShortInfoSkeleton />}>
            <SessionShortInfo session={session} crewId={crewId} />
          </Suspense>
        </ErrorBoundary>
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
          <ErrorBoundary fallback={<SessionShortInfoSkeleton />}>
            <Suspense fallback={<SessionShortInfoSkeleton />}>
              <SessionShortInfo session={session} crewId={crewId} />
            </Suspense>
          </ErrorBoundary>
          <Suspense fallback={<CrewShortInfoSkeleton />}>
            <CrewShortInfo crewId={crewId} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
