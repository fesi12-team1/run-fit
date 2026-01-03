'use client';

import { useLikeButton } from '@/app/sessions/[id]/_components/SessionActionGroup/LikeButton';
import { Session } from '@/types';
import SessionCard from '../SessionCard';
import SessionListEmptyState from './SessionListEmptyState';

export default function SessionList({
  data: sessions,
  loadMoreRef,
}: {
  data?: Session[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const { handleClick } = useLikeButton();

  return (
    <div className="tablet:my-6 my-2 flex w-full flex-1">
      {sessions?.length ? (
        <>
          <ul className="laptop:grid-cols-3 tablet:gap-x-6 tablet:gap-y-10 grid w-full grid-cols-2 gap-6">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onLikeButtonClick={handleClick}
              />
            ))}
          </ul>
          <div ref={loadMoreRef} className="h-1" />
        </>
      ) : (
        <SessionListEmptyState />
      )}
    </div>
  );
}
