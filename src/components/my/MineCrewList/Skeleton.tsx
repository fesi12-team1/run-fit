export default function MineCrewListSkeleton() {
  return (
    <div>
      <div className="tablet:gap-3 flex min-w-0 flex-col gap-2">
        {/* 제목 */}
        <div className="h-5 w-28 animate-pulse rounded bg-gray-600" />

        {/* 크루 리스트 */}
        <div className="flex w-full flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              {/* 크루 이미지 */}
              <div className="h-11 w-[66px] shrink-0 animate-pulse rounded-xl bg-gray-600" />

              {/* 크루 정보 */}
              <div className="flex min-w-0 flex-col gap-1">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-600" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
