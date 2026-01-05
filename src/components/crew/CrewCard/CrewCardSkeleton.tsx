import Skeleton from '@/components/ui/Skeleton';

export default function CrewCardSkeleton() {
  return (
    <div className="tablet:py-5 flex justify-between">
      {/* Left Section */}
      <div className="tablet:flex-row flex w-full flex-col gap-3 rounded-xl">
        {/* Crew Image */}
        <div className="tablet:w-60 tablet:aspect-240/148 relative aspect-327/132 h-[132px] shrink-0 overflow-hidden rounded-xl">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>

        {/* Crew Info */}
        <div className="tablet:w-[500px] flex flex-col justify-evenly gap-2 p-3 pb-1">
          {/* Crew Name */}
          <Skeleton className="tablet:h-7 h-6 w-1/3" />

          {/* Description - 2 lines */}
          <div className="space-y-1">
            <Skeleton className="tablet:h-5 h-4 w-full" />
            <Skeleton className="tablet:h-5 h-4 w-4/5" />
          </div>

          {/* Members Info */}
          <div className="flex items-center gap-1">
            {/* City Badge */}
            <Skeleton className="tablet:h-7 h-6 w-12 rounded-lg" />
            {/* Member Count */}
            <Skeleton className="tablet:h-5 h-4 w-14" />
            {/* Profile List */}
            <div className="flex gap-1 -space-x-1">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="size-6 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Recent Sessions (laptop only) */}
      <div className="laptop:flex hidden w-[300px] shrink-0 flex-col p-3">
        <Skeleton className="mb-2 h-5 w-20" />
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
