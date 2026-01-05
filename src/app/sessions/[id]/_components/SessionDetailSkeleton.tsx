import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import CrewShortInfoSkeleton from './CrewShortInfo/CrewShortInfoSkeleton';
import ParticipantsListSkeleton from './SessionDetailInfo/ParticipantsListSkeleton';
import SessionDetailInfoSkeleton from './SessionDetailInfo/SessionDetailInfoSkeleton';
import SessionShortInfoSkeleton from './SessionShortInfo/SessionShortInfoSkeleton';

export default function SessionDetailSkeleton() {
  return (
    <>
      {/* Mobile & Tablet Layout */}
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        <Skeleton className="tablet:aspect-744/313 laptop:aspect-680/374 laptop:rounded-[20px] relative aspect-375/267 w-full" />
        <SessionShortInfoSkeleton />
        <SessionDetailInfoSkeleton />
        <CrewShortInfoSkeleton />
      </div>

      {/* Desktop Layout */}
      <div
        className={cn(
          'laptop:flex hidden',
          'mx-auto max-w-[1120px] gap-10 bg-gray-900 py-10'
        )}
      >
        <div className="flex flex-1 flex-col gap-10 px-5">
          <Skeleton className="tablet:aspect-744/313 laptop:aspect-680/374 laptop:rounded-[20px] relative aspect-375/267 w-full" />
          <SessionDetailInfoSkeleton />
          <ParticipantsListSkeleton />
        </div>
        <div className="laptop:w-[360px] flex flex-col gap-10">
          <SessionShortInfoSkeleton />
          <CrewShortInfoSkeleton />
        </div>
      </div>
    </>
  );
}
