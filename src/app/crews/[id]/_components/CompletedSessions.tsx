'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import CompletedSessionCard from '@/components/session/CompletedSessionCard';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CompletedSessionsProps {
  crewId: number;
}

export default function CompletedSessions({ crewId }: CompletedSessionsProps) {
  const { data: completedSessions } = useSuspenseQuery(
    sessionQueries.list({
      page: 0,
      size: 3,
      crewId,
      sort: 'sessionAtAsc',
      status: 'CLOSED',
    })
  );

  if (!completedSessions || completedSessions.content.length === 0) {
    return (
      <span
        className={cn(
          'self-center justify-self-center text-gray-300',
          'text-body3-regular py-2.5',
          'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
        )}
      >
        아직 마감된 세션이 없어요
      </span>
    );
  }

  return (
    <>
      <div className="flex flex-col divide-y divide-gray-700 *:py-2">
        {completedSessions.content.map((session) => (
          <CompletedSessionCard key={session.id} session={session} />
        ))}
      </div>
      <Button
        variant="neutral"
        size="xs"
        className={cn(
          'self-center rounded-[10px]',
          'tablet:w-[620px] laptop:w-[140px] w-[270px]'
        )}
        disabled={!completedSessions.hasNext}
      >
        더 보기
      </Button>
    </>
  );
}
