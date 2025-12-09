'use client';

import SessionCard from '@/components/session/SessionCard';
import { mockSessions } from '@/mocks/data';

export default function Page() {
  // const { status, data: sessions, error } = useSessionList(); // tanstack-query hook
  return (
    <div className="tablet:mx-8 laptop:mx-100 h-main mx-4 flex flex-col items-center gap-12">
      {process.env.NODE_ENV === 'development' && (
        <div>
          <span className="tablet:hidden text-white">mobile</span>
          <span className="tablet:inline-flex laptop:hidden hidden text-white">
            tablet
          </span>
          <span className="laptop:inline-flex hidden text-white">laptop</span>
        </div>
      )}
      <ul className="tablet:grid-cols-3 tablet:gap-6 tablet:gap-x-4 tablet:gap-y-10 grid w-full grid-cols-2 gap-x-3 gap-y-8">
        {mockSessions.map((session) => (
          <SessionCard key={session.id} data={session} />
        ))}
      </ul>
    </div>
  );
}
