import Skeleton from '@/components/ui/Skeleton';
import { CREW_DETAIL_SECTIONS } from '@/constants/crew';
import { cn } from '@/lib/utils';
import CompletedSessionsSkeleton from './CompletedSessionsSkeleton';
import CrewReviewsSkeleton from './CrewReviewsSkeleton';
import RecruitingSessionsSkeleton from './RecruitingSessionsSkeleton';

export default function CrewDetailContentSkeleton() {
  return (
    <div className="h-main laptop:bg-gray-850 flex flex-col items-center bg-gray-800 pb-20">
      {/* Crew Image Skeleton */}
      <div
        className={cn(
          'relative w-full bg-gray-800',
          'laptop:mt-10 laptop:mb-[52px] laptop:max-w-[1120px] laptop:bg-gray-850',
          'laptop:h-[300px] tablet:h-60 h-[174px]'
        )}
      >
        <Skeleton className={cn('laptop:rounded-[20px] h-full w-full')} />
      </div>

      {/* Main Content */}
      <div className="laptop:max-w-[1120px] laptop:flex-row laptop:gap-10 flex w-full flex-col-reverse">
        {/* Left Section */}
        <div
          className={cn(
            'laptop:px-3 flex w-full flex-col px-6',
            'tablet:gap-y-8 laptop:gap-y-10 laptop:max-w-[720px] gap-y-6'
          )}
        >
          {/* Tabs Skeleton */}
          <div className="tablet:top-15 laptop:bg-gray-850 sticky top-14 z-10 bg-gray-800">
            <div className="flex gap-2 border-b border-gray-700">
              {CREW_DETAIL_SECTIONS.map((section) => (
                <Skeleton
                  key={section.id}
                  className="laptop:bg-gray-850 h-10 w-20 bg-gray-800"
                />
              ))}
            </div>
          </div>

          {/* Crew Introduction Skeleton */}
          <section className="flex flex-col gap-2">
            <Skeleton
              className={cn(
                'text-gray-50',
                'tablet:text-title3-semibold text-body2-semibold',
                'h-6 w-24'
              )}
            />
            <div className="space-y-2">
              <Skeleton className="tablet:text-body2-regular text-body3-regular h-4 w-full" />
              <Skeleton className="tablet:text-body2-regular text-body3-regular h-4 w-5/6" />
              <Skeleton className="tablet:text-body2-regular text-body3-regular h-4 w-4/5" />
            </div>
          </section>

          {/* Recruiting Sessions Skeleton */}
          <section className="flex flex-col gap-4">
            <Skeleton
              className={cn(
                'text-gray-50',
                'tablet:text-title3-semibold text-body2-semibold',
                'h-6 w-32'
              )}
            />
            <RecruitingSessionsSkeleton />
          </section>

          {/* Completed Sessions Skeleton */}
          <section className="flex flex-col gap-4">
            <Skeleton
              className={cn(
                'text-gray-50',
                'tablet:text-title3-semibold text-body2-semibold',
                'h-6 w-28'
              )}
            />
            <CompletedSessionsSkeleton />
          </section>

          {/* Crew Reviews Skeleton */}
          <section className="flex flex-col gap-3 border-t border-t-gray-700 py-5">
            <CrewReviewsSkeleton />
          </section>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="laptop:w-[360px] laptop:shrink-0 laptop:bg-gray-850 z-1 -mt-8 w-full flex-col self-start rounded-[20px] bg-gray-800 px-6 py-7 shadow-[0px_10px_30px_-5px_rgba(0,0,0,0.20)]">
          {/* Crew Title */}
          <Skeleton className="text-title3-semibold mb-2 h-7 w-3/4" />
          <Skeleton className="text-body3-regular mb-4 h-4 w-1/2" />

          {/* Desktop Action Buttons (hidden on mobile) */}
          <div className="laptop:flex my-8 hidden items-center gap-7">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="text-body2-semibold h-12 flex-1 rounded-lg" />
          </div>

          {/* Members Section */}
          <div className="tablet:border-t-0 border-t border-t-gray-500 pt-4">
            <div className="mb-4 flex items-center gap-1">
              <Skeleton className="text-body2-semibold h-5 w-12" />
              <Skeleton className="text-body1-semibold h-5 w-6" />
            </div>

            {/* Member List */}
            <div className="flex flex-col">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="mb-5 flex items-center gap-3">
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex w-full items-center gap-1.5">
                      <Skeleton className="text-body3-semibold h-5 w-24" />
                      <Skeleton className="h-5 w-12 rounded-full" />
                    </div>
                    <Skeleton className="text-caption-regular h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            {/* View All Members Button */}
            <Skeleton className="mt-8 h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
