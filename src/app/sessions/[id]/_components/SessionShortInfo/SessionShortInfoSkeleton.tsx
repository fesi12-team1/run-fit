import Skeleton from '@/components/ui/Skeleton';

export default function SessionShortInfoSkeleton() {
  return (
    <div className="laptop:bg-gray-750 laptop:rounded-b-[20px] laptop:px-6 laptop:pt-7 laptop:pb-6 laptop:mt-0 tablet:px-12 tablet:pt-10 laptop:gap-8 relative z-10 -mt-5 flex flex-col gap-6 rounded-t-[20px] bg-gray-800 px-7 pt-6">
      <div>
        {/* D-day Badge */}
        <div className="mb-1 flex w-full items-center justify-between gap-2">
          <Skeleton className="h-7 w-16 rounded-lg" />
        </div>

        {/* Title & DateTime */}
        <div className="mb-2">
          <Skeleton className="mb-1 h-7 w-2/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-7 w-14 rounded-lg" />
          <Skeleton className="h-7 w-14 rounded-lg" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex h-[38px] flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-5 w-10" />
          <div className="flex items-center gap-0.5">
            <Skeleton className="h-5 w-18" />
          </div>
        </div>
        <Skeleton className="h-2.5 w-full rounded-md" />
      </div>

      <hr className="text-gray-500" />

      {/* Action Buttons - Desktop */}
      <div className="laptop:flex hidden items-center gap-7">
        <div className="flex items-center gap-4">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="size-7 rounded-full" />
        </div>
        <Skeleton className="h-12 flex-1 rounded-lg" />
      </div>
    </div>
  );
}
