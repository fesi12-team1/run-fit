'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { sessionQueries } from '@/api/queries/sessionQueries';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import CopyUrlButton from './_components/CopyUrlButton';
import LikeButton from './_components/LikeButton';
import ParticipateButton from './_components/ParticipateButton';
import SessionDetailView from './_components/SessionDetailView';
import SessionDetailSkeleton from './SessionDetailSkeleton';

export default function Page() {
  return (
    <Suspense fallback={<SessionDetailSkeleton />}>
      <SessionDetailContent />
    </Suspense>
  );
}

function SessionDetailContent() {
  const { id } = useParams();
  const { data: session } = useSuspenseQuery(sessionQueries.detail(Number(id)));

  return (
    <>
      <main className="h-main laptop:bg-gray-900 bg-gray-800">
        <SessionDetailView session={session} />
      </main>
      <FixedBottomBar>
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4">
            <LikeButton liked={session.liked} sessionId={session.id} />
            <CopyUrlButton />
          </div>
          <ParticipateButton className="flex-1" sessionId={session.id} />
        </div>
      </FixedBottomBar>
    </>
  );
}
