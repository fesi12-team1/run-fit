'use client';

import SessionCard from '@/components/session/SessionCard';
import { mockSessions } from '@/mocks/data';

export default function Page() {
  // const { status, data: sessions, error } = useSessionList(); // tanstack-query hook
  return (
    <div className="tablet:mx-8 h-main mx-4 flex flex-col items-center gap-12">
      <ul className="tablet:grid-cols-3 tablet:gap-6 tablet:gap-x-4 tablet:gap-y-10 laptop:max-w-[1120px] grid w-full grid-cols-2 gap-x-3 gap-y-8">
        {mockSessions.map((session) => (
          <SessionCard key={session.id} data={session} />
        ))}
        {mockSessions.map((session) => (
          <SessionCard key={session.id} data={session} />
        ))}
      </ul>
    </div>
  );
}
