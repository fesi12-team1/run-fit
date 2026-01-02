'use client';

import Image from 'next/image';
import { useLikeButton } from '@/app/sessions/[id]/_components/SessionActionGroup/LikeButton';
import { Session } from '@/types';
import SessionCard from '../SessionCard';

export default function SessionList({
  data: sessions,
  loadMoreRef,
}: {
  data?: Session[];
  loadMoreRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const { handleClick } = useLikeButton();

  return (
    <>
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
          <EmptyState />
        )}
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
      <Image
        alt="No Sessions"
        height={150}
        src="/assets/session-default.png"
        width={300}
      />
      <span className="text-body2-medium text-center text-gray-300">
        아직 생성된 세션이 없어요 <br /> 세션은 크루를 개설하거나 <br />
        운영진으로 활동할 때 만들 수 있어요!
      </span>
    </div>
  );
}
