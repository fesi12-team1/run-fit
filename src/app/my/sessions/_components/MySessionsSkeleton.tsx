import SessionCardSkeleton from '@/components/session/SessionCard/SessionCardSkeleton';
import Skeleton from '@/components/ui/Skeleton';

// 예정된 세션 스켈레톤
function ScheduledSkeleton() {
  return (
    <div className="tablet:gap-4 flex gap-3 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <SessionCardSkeleton key={i} />
      ))}
    </div>
  );
}

// 완료된 세션 스켈레톤
function CompletedSkeleton() {
  return (
    <div className="tablet:gap-3 flex flex-col gap-2">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-3">
          {/* CompletedSessionCard */}
          <div className="flex w-full items-center">
            <div className="flex w-full items-center gap-3">
              {/* 세션 이미지 */}
              <Skeleton className="tablet:h-[92px] tablet:w-[148px] h-[90px] w-[126px] shrink-0 rounded-lg" />

              {/* 세션 정보 */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <Skeleton className="tablet:h-6 h-5 w-40 rounded" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>

                {/* 배지들 (태블릿 이상) */}
                <div className="tablet:flex hidden items-center gap-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-750 w-full" />
        </div>
      ))}
    </div>
  );
}

const MySessionsSkeleton = {
  Scheduled: ScheduledSkeleton,
  Completed: CompletedSkeleton,
};

export default MySessionsSkeleton;
