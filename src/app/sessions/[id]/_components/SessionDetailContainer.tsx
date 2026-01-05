'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import SessionDetail from './SessionDetail';
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
        <SessionDetail sessionId={sessionId} />
      </Suspense>
    </ErrorBoundary>
  );
}
