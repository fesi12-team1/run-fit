import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export default function CompletedSessionsSkeleton() {
  return (
    <>
      <div className="flex flex-col divide-y divide-gray-700 *:py-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex w-full items-center">
            <div className="flex w-full items-center gap-3">
              {/* Image - size="sm" default: h-[90px] w-[126px] */}
              <Skeleton className="h-[90px] w-[126px] rounded-lg" />

              {/* Info */}
              <div className="pointer-events-none flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div>
                    {/* Session name - text-body3-semibold */}
                    <Skeleton className="text-body3-semibold mb-1 h-5 w-40" />
                    {/* Date & Time - text-caption-regular */}
                    <Skeleton className="text-caption-regular h-4 w-24" />
                  </div>
                </div>
                {/* Star rating - showRanks={true} default */}
                <div className="flex items-center gap-0.5">
                  <Skeleton className="size-3 rounded-full" />
                  <Skeleton className="text-caption-medium h-3 w-6" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Skeleton
        className={cn(
          'h-10 self-center rounded-[10px]',
          'tablet:w-[620px] laptop:w-[140px] w-[270px]'
        )}
      />
    </>
  );
}
