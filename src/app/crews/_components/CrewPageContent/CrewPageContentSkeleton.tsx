import CrewCardSkeleton from '@/components/crew/CrewCard/CrewCardSkeleton';
import Skeleton from '@/components/ui/Skeleton';

export default function CrewPageContentSkeleton() {
  return (
    <>
      {/* FilterBar Skeleton */}
      <div className="flex w-full items-center justify-between">
        <Skeleton className="h-9 w-26" />
        <Skeleton className="h-9 w-32" />
      </div>

      {/* CrewList Skeleton */}
      <div className="tablet:my-6 my-2 w-full">
        <div className="tablet:divide-y tablet:divide-gray-700 tablet:border-t tablet:border-gray-700 tablet:gap-0 grid w-full grid-cols-1 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CrewCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
