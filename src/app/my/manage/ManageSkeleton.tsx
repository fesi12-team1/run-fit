export default function ManageSkeleton() {
  return (
    <section className="tablet:gap-3 flex flex-col gap-2">
      {/* 세션 그리드 */}
      <div className="tablet:gap-x-4 tablet:gap-y-8 laptop:gap-y-10 laptop:grid-cols-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex w-full flex-col">
            {/* 세션 이미지 - aspect-165/185 (모바일), tablet:aspect-video */}
            <div className="tablet:aspect-video relative aspect-165/185 w-full overflow-hidden rounded-lg bg-gray-600">
              <div className="size-full animate-pulse bg-gray-600" />
            </div>

            {/* 세션 정보 */}
            <div className="mobile:mb-2 tablet:mt-[18px] my-3">
              {/* 세션명 - text-body3-semibold tablet:text-title3-semibold */}
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />

              {/* 날짜/시간 - text-caption-regular tablet:text-body3-regular */}
              <div className="mobile:mb-1 mb-2 h-4 w-1/2 animate-pulse rounded bg-gray-600" />

              {/* 배지들 - PaceBadge + LevelBadge */}
              <div className="laptop:gap-1 flex items-center gap-0.5">
                <div className="h-5 w-16 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-12 animate-pulse rounded bg-gray-600" />
              </div>
            </div>

            {/* 참가자 정보 - ProfileList + 크루명 */}
            <div className="laptop:gap-2 flex items-center gap-1">
              {/* 프로필 리스트 스켈레톤 생략 (선택적 요소) */}
              <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
