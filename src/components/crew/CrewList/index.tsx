import CrewCard from '@/components/crew/CrewCard';
import Spinner from '@/components/ui/Spinner';
import { Crew } from '@/types';
import CrewListEmptyState from './CrewListEmptyState';

export default function CrewList({
  data: crews,
  loadMoreRef,
  isFetchingNextPage,
}: {
  data?: Crew[];
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
}) {
  const hasData = crews && crews.length > 0;

  return (
    <div className="tablet:my-6 my-2 flex w-full flex-1">
      {hasData ? (
        <div className="flex w-full flex-col">
          <div className="tablet:divide-y tablet:divide-gray-700 tablet:border-t tablet:border-gray-700 tablet:gap-0 grid w-full grid-cols-1 gap-5">
            {crews.map((crew) => (
              <CrewCard key={crew.id} crew={crew} />
            ))}
          </div>
          <div ref={loadMoreRef} className="h-1" />
          {isFetchingNextPage && <Spinner.Scroll />}
        </div>
      ) : (
        <CrewListEmptyState />
      )}
    </div>
  );
}
