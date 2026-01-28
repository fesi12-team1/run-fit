'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionDetail from '.';
import SessionDetailErrorFallback from './SessionDetailErrorFallback';
import SessionDetailSkeleton from './SessionDetailSkeleton';

export default function SessionDetailContainer({
  sessionId,
}: {
  sessionId: number;
}) {
  return (
    <ErrorBoundary
      fallback={({ error }) => <SessionDetailErrorFallback error={error} />}
    >
      <Suspense fallback={<SessionDetailSkeleton />} clientOnly>
        <SuspenseQuery {...sessionQueries.detail(sessionId)}>
          {({ data: session }) => <SessionDetail session={session} />}
        </SuspenseQuery>
      </Suspense>
    </ErrorBoundary>
  );
}
