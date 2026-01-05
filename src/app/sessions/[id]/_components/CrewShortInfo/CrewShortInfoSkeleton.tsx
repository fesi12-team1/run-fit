import Skeleton from '@/components/ui/Skeleton';

export default function CrewShortInfoSkeleton() {
  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3 px-3 py-3">
      {/* Crew Info */}
      <div className="flex items-center gap-3">
        <Skeleton className="tablet:w-[84px] tablet:h-14 relative h-11 w-[66px] rounded-lg" />
        <div className="flex flex-col gap-0.5">
          <Skeleton className="tablet:h-5 h-4 w-24" />
          <Skeleton className="tablet:h-4 h-3 w-32" />
        </div>
      </div>

      <hr className="border-gray-600" />

      {/* Review List */}
      <div>
        {/* Rating Stars */}
        <div className="mb-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="size-5" />
          ))}
        </div>
        {/* Review Text */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
