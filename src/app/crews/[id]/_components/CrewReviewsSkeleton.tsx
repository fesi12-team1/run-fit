import Skeleton from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';

export default function CrewReviewsSkeleton() {
  return (
    <>
      <div className="flex gap-2">
        <h2
          className={cn(
            'text-gray-50',
            'tablet:text-title3-semibold text-body2-semibold'
          )}
        >
          후기
        </h2>
        <Skeleton className="text-title3-semibold h-7 w-8" />
      </div>

      <ul
        className={cn(
          'flex flex-col divide-y divide-dashed divide-gray-500',
          '*:pb-4 not-first:*:pt-4'
        )}
      >
        {[1, 2, 3].map((i) => (
          <li key={i} className="flex flex-col gap-2">
            {/* Rating stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Skeleton key={star} className="size-5" />
              ))}
            </div>

            {/* Review description - text-body3-regular */}
            <Skeleton className="text-body3-regular h-4 w-3/4" />

            {/* User info and date - text-caption-regular */}
            <div className="text-caption-regular flex items-center gap-2 text-gray-300">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-1" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* SessionInfo - bg-gray-700 rounded-xl p-2 */}
            <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
              <Skeleton className="aspect-video w-16 rounded-lg" />
              <div className="flex flex-col justify-end gap-1">
                <Skeleton className="text-caption-semibold h-4 w-32" />
                <Skeleton className="text-caption-regular h-3 w-24" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
