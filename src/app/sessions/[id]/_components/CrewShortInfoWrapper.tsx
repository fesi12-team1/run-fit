'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import CrewShortInfo from './CrewShortInfo';

function CrewShortInfoSkeleton() {
  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3">
      {/* 크루 정보 */}
      <div className="flex items-center gap-3">
        <div className="tablet:aspect-84/56 relative flex aspect-66/44 w-20 items-center justify-center overflow-hidden rounded-lg">
          <div className="size-full animate-pulse bg-gray-600" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-600" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
        </div>
      </div>
    </div>
  );
}

function CrewShortInfoContent({ crewId }: { crewId: number }) {
  const { data: crew } = useSuspenseQuery(crewQueries.detail(crewId));

  return <CrewShortInfo crew={crew} />;
}

export default function CrewShortInfoWrapper({ crewId }: { crewId: number }) {
  return (
    <Suspense fallback={<CrewShortInfoSkeleton />}>
      <CrewShortInfoContent crewId={crewId} />
    </Suspense>
  );
}
