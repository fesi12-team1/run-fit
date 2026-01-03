export default function CrewPageSkeleton() {
  return (
    <>
      {/* FilterBar Skeleton */}
      <div className="flex w-full items-center justify-between">
        {/* 지역 필터 */}
        <div className="h-9 w-24 animate-pulse rounded-lg bg-gray-600" />
        {/* 정렬 드롭다운 */}
        <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-600" />
      </div>

      {/* CrewList Skeleton */}
      <div className="tablet:my-6 my-2 w-full">
        <div className="tablet:divide-y tablet:divide-gray-700 tablet:border-t tablet:border-gray-700 tablet:gap-0 grid w-full grid-cols-1 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="tablet:py-5 flex justify-between">
              {/* CrewCardLeft */}
              <div className="tablet:flex-row flex w-full flex-col gap-3">
                {/* 크루 이미지 */}
                <div className="tablet:w-60 tablet:aspect-video aspect-327/75 shrink-0 animate-pulse rounded-xl bg-gray-600" />

                {/* 크루 정보 */}
                <div className="tablet:w-[500px] flex flex-col justify-evenly gap-2 p-3">
                  {/* 크루 이름 */}
                  <div className="h-6 w-1/3 animate-pulse rounded bg-gray-600" />

                  {/* 크루 설명 */}
                  <div className="flex flex-col gap-1">
                    <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
                    <div className="h-5 w-2/3 animate-pulse rounded bg-gray-600" />
                  </div>

                  {/* 지역 + 멤버 수 + 프로필 리스트 */}
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-16 animate-pulse rounded-lg bg-gray-600" />
                    <div className="h-5 w-20 animate-pulse rounded bg-gray-600" />
                    <div className="flex gap-1">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="size-6 animate-pulse rounded-full bg-gray-600"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CrewCardRight - 최근 세션 (laptop 이상에서만) */}
              <div className="laptop:flex hidden w-[300px] shrink-0 flex-col p-3">
                <div className="mb-2 h-5 w-20 animate-pulse rounded bg-gray-600" />
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-5 w-32 animate-pulse rounded bg-gray-600" />
                      <div className="h-5 w-16 animate-pulse rounded bg-gray-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
