'use client';

import { useQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { cn } from '@/lib/utils';
import { Session } from '@/types';
import CrewShortInfo from './CrewShortInfo';
import SessionDetailInfo from './SessionDetailInfo';
import SessionImage from './SessionImage';
import SessionShortInfo from './SessionShortInfo';

export default function SessionDetailView({
  sessionId,
}: {
  sessionId: Session['id'];
}) {
  const sessionQuery = useQuery(sessionQueries.detail(Number(sessionId)));
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
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        <SessionImage image={session.image} name={session.name} />
        <SessionShortInfo session={session} crewId={crewQuery.data.id} />
        <SessionDetailInfo session={session} />
        <CrewShortInfo crew={crewQuery.data} />
      </div>

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
          <SessionShortInfo session={session} crewId={crewQuery.data.id} />
          <CrewShortInfo crew={crewQuery.data} />
        </div>
      </div>
    </>
  );
}
