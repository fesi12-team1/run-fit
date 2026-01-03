import { cn } from '@/lib/utils';
import { Session } from '@/types';
import CrewShortInfoWrapper from './CrewShortInfoWrapper';
import SessionDetailInfo from './SessionDetailInfo';
import SessionImage from './SessionImage';
import SessionShortInfo from './SessionShortInfo';

export default function SessionDetailView({ session }: { session: Session }) {
  const crewId = session.crewId;
  return (
    <>
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        <SessionImage image={session.image} name={session.name} />
        <SessionShortInfo session={session} crewId={crewId} />
        <SessionDetailInfo session={session} />
        <CrewShortInfoWrapper crewId={crewId} />
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
          <SessionShortInfo session={session} crewId={crewId} />
          <CrewShortInfoWrapper crewId={crewId} />
        </div>
      </div>
    </>
  );
}
