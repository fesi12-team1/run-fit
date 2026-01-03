// 예정된 세션 스켈레톤
function ScheduledSkeleton() {
  return (
    <div className="tablet:gap-4 flex gap-3 overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="laptop:w-[calc((100%-32px)/3)] tablet:w-[calc((100%-16px)/2)] w-[calc((100%-12px)/2)] shrink-0"
        >
          {/* SessionCard */}
          <div className="relative flex w-full flex-col">
            {/* 세션 이미지 */}
            <div className="tablet:aspect-video relative aspect-165/185 w-full overflow-hidden rounded-lg">
              <div className="h-full w-full animate-pulse bg-gray-600" />
            </div>

            {/* 세션 정보 */}
            <div className="tablet:mt-[18px] my-3">
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />
              <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-600" />
              <div className="flex items-center gap-1">
                <div className="h-5 w-16 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-12 animate-pulse rounded bg-gray-600" />
              </div>
            </div>

            {/* 참가자 */}
            <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
          </div>
        </div>
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
              <div className="tablet:h-[92px] tablet:w-[148px] h-[90px] w-[126px] shrink-0 animate-pulse rounded-lg bg-gray-600" />

              {/* 세션 정보 */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <div className="tablet:h-6 h-5 w-40 animate-pulse rounded bg-gray-600" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
                </div>

                {/* 배지들 (태블릿 이상) */}
                <div className="tablet:flex hidden items-center gap-1">
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-600" />
                  <div className="h-5 w-12 animate-pulse rounded bg-gray-600" />
                </div>
              </div>
            </div>

            {/* 리뷰 작성 버튼 (태블릿 이상) */}
            <div className="tablet:block hidden shrink-0">
              <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-600" />
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
