import Skeleton from '@/components/ui/Skeleton';

export default function MyCrewCardSkeleton() {
  return (
    <div className="tablet:flex-row flex flex-col">
      {/* 크루 이미지 */}
      <div className="tablet:w-60 tablet:h-37 relative aspect-327/132 w-full shrink-0 overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full rounded-xl" />
        {/* 모바일 역할 배지 */}
        <div className="tablet:hidden absolute right-3.5 bottom-[11px] flex items-center gap-1">
          <Skeleton className="size-3 rounded bg-gray-500" />
          <Skeleton className="h-4 w-10 rounded bg-gray-500" />
        </div>
      </div>

      {/* 크루 정보 */}
      <div className="flex flex-col justify-center gap-1 p-4 pb-1">
        {/* 크루명 */}
        <Skeleton className="tablet:h-7 h-6 w-40 rounded" />

        {/* 설명 */}
        <div className="flex flex-col gap-1">
          <Skeleton className="tablet:h-5 h-4 w-full rounded" />
          <Skeleton className="tablet:h-5 h-4 w-2/3 rounded" />
        </div>

        {/* 하단 정보 (지역, 멤버수, 프로필, 역할) */}
        <div className="mt-1 flex items-center gap-1">
          {/* 지역 배지 */}
          <Skeleton className="tablet:h-7 h-6 w-12" />
          {/* 멤버수 */}
          <Skeleton className="h-4 w-16 rounded" />
          {/* 프로필 리스트 */}
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="size-6 rounded-full border-2 border-gray-900"
              />
            ))}
          </div>
          {/* 구분선 (태블릿+) */}
          <div className="tablet:block mr-1 ml-1 hidden h-4 w-px bg-gray-400" />
          {/* 역할 (태블릿+) */}
          <div className="tablet:flex hidden items-center gap-1">
            <Skeleton className="h-5 w-12 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
