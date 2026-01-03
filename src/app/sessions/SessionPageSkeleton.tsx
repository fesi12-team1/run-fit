export default function SessionPageSkeleton() {
  return (
    <div className="flex w-full flex-col">
      {/* FilterBar Skeleton */}
      <div className="flex w-full items-center">
        <div className="tablet:pt-5 relative flex flex-1 items-center gap-2">
          <div className="scrollbar-hide flex w-max items-center gap-2">
            {/* 지역, 날짜, 시간, 레벨 필터 */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-9 w-20 animate-pulse rounded-lg bg-gray-600"
              />
            ))}
          </div>
        </div>
        {/* 정렬 드롭다운 */}
        <div className="tablet:pt-5 ml-auto">
          <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-600" />
        </div>
      </div>

      {/* SessionList Skeleton - 그리드 레이아웃 */}
      <div className="tablet:my-6 my-2 flex w-full flex-1">
        <ul className="laptop:grid-cols-3 tablet:gap-x-6 tablet:gap-y-10 grid w-full grid-cols-2 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i} className="relative flex w-full flex-col">
              {/* 하트 아이콘 위치 */}
              <div className="absolute top-3 right-3 z-3">
                <div className="size-7 animate-pulse rounded-full bg-gray-600" />
              </div>

              {/* 세션 이미지 */}
              <div className="tablet:aspect-video relative aspect-165/185 w-full overflow-hidden rounded-lg">
                <div className="h-full w-full animate-pulse bg-gray-600" />

                {/* D-day 뱃지 위치 */}
                <div className="pointer-events-none absolute top-3 left-3">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-600" />
                </div>

                {/* 위치 정보 */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <div className="size-4 animate-pulse rounded-full bg-gray-600" />
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-600" />
                </div>
              </div>

              {/* 세션 정보 */}
              <div className="tablet:mt-[18px] my-3">
                {/* 세션 이름 */}
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />

                {/* 날짜/시간 */}
                <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-600" />

                {/* 페이스 + 레벨 배지 */}
                <div className="flex items-center gap-1">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-600" />
                  <div className="h-6 w-12 animate-pulse rounded-full bg-gray-600" />
                </div>
              </div>

              {/* 참가자 정보 */}
              <div className="flex items-center gap-2">
                {/* 프로필 리스트 */}
                <div className="flex gap-1">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="size-6 animate-pulse rounded-full bg-gray-600"
                    />
                  ))}
                </div>
                {/* 참가 인원 + 크루 이름 */}
                <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
