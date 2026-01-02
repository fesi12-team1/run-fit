'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import Spinner from '@/components/ui/Spinner';
import { Crew } from '@/types';
import CrewInfo from './CrewInfo';
import ReviewList from './ReviewList';

interface CrewShortInfoProps {
  crewId: Crew['id'];
}

export default function CrewShortInfo({ crewId }: CrewShortInfoProps) {
  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3 px-3 py-3">
      <ErrorBoundary fallback={<div>크루 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<Spinner />}>
          <CrewInfo crewId={crewId} />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>크루 리뷰 정보를 불러올 수 없습니다.</div>}>
        <Suspense fallback={<Spinner />}>
          <ReviewList crewId={crewId} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
