'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { notFound, useParams } from 'next/navigation';
import ErrorFallback from '@/components/ui/ErrorFallback';
import CrewDetailContent from './_components/CrewDetailContent';
import CrewDetailContentSkeleton from './_components/CrewDetailContentSkeleton';

export default function Page() {
  const params = useParams<{ id: string }>();
  const crewId = Number(params.id);

  if (isNaN(crewId)) {
    return notFound();
  }

  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          className="h-[60vh]"
          imageSrc="/assets/crew-default.png"
          message="크루 정보를 불러오는 중 오류가 발생했습니다."
          actionLabel="크루 목록으로 돌아가기"
          onAction={() => {
            window.location.href = '/crews';
          }}
        />
      }
    >
      <Suspense fallback={<CrewDetailContentSkeleton />}>
        <CrewDetailContent crewId={crewId} />
      </Suspense>
    </ErrorBoundary>
  );
}
