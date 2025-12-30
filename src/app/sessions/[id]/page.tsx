'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import FixedBottomBar from '@/components/layout/FixedBottomBar';
import CopyUrlButton from './_components/CopyUrlButton';
import LikeButton from './_components/LikeButton';
import ParticipateButton from './_components/ParticipateButton';
import SessionDetailView from './_components/SessionDetailView';

export default function Page() {
  const { id } = useParams();
  const sessionQuery = useQuery(sessionQueries.detail(Number(id)));
  const session = sessionQuery.data;
  const crewId = session?.crewId;
  const crewQuery = useQuery({
    ...crewQueries.detail(Number(crewId)),
    enabled: !!crewId,
  });

  if (sessionQuery.isLoading) return null;
  if (sessionQuery.isError) return null;
  if (!session) return null;

  if (crewQuery.isLoading) return null;
  if (crewQuery.isError) return null;
  if (!crewQuery.data) return null;

  return (
    <>
      <main className="h-main laptop:bg-gray-900 bg-gray-800">
        <SessionDetailView session={session} crew={crewQuery.data} />
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
