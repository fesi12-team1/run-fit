export default function ProfileSkeleton() {
  return (
    <div className="w-full">
      <div className="tablet:gap-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          {/* 프로필 이미지 */}
          <div className="size-20 animate-pulse rounded-full bg-gray-600" />
          {/* 내 정보 수정 버튼 */}
          <div className="tablet:h-9 tablet:w-[100px] h-8 w-[90px] animate-pulse rounded-lg bg-gray-600" />
        </div>

        {/* 이름 */}
        <div className="h-7 w-24 animate-pulse rounded bg-gray-600" />
      </div>

      {/* 소개 */}
      <div className="tablet:mt-3 mt-1 flex flex-col gap-2">
        <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-600" />
      </div>

      {/* 페이스 + 활동지역 그리드 */}
      <div className="tablet:mt-6 mt-3 grid grid-cols-2 gap-3">
        <div className="h-[88px] animate-pulse rounded-xl bg-gray-600" />
        <div className="h-[88px] animate-pulse rounded-xl bg-gray-600" />
      </div>

      {/* 러닝 스타일 */}
      <div className="tablet:mt-6 mt-5 flex flex-col gap-2">
        <div className="h-5 w-20 animate-pulse rounded bg-gray-600" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="tablet:h-9 tablet:w-24 h-8 w-20 animate-pulse rounded-xl bg-gray-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
