import Skeleton from '@/components/ui/Skeleton';

export default function SessionCardSkeleton() {
  return (
    <li className="relative flex w-full flex-col">
      {/* 하트 아이콘 위치 */}
      <div className="absolute top-3 right-3 z-1">
        <Skeleton className="size-7 rounded-full" />
      </div>

      {/* 세션 이미지 */}
      <div className="tablet:aspect-171/100 relative aspect-165/185 w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />

        {/* D-day 뱃지 위치 */}
        <div className="pointer-events-none absolute top-3 left-3">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* 위치 정보 */}
        <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* 세션 정보 */}
      <div className="mobile:mb-2 tablet:mt-[18px] pointer-events-none my-3">
        {/* 세션 이름 */}
        <Skeleton className="mb-2 h-6 w-3/4" />

        {/* 날짜/시간 */}
        <Skeleton className="mobile:mb-1 mb-2 h-5 w-1/2" />

        {/* 페이스 + 레벨 배지 */}
        <div className="laptop:gap-1 flex items-center gap-0.5">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      {/* 참가자 정보 */}
      <div className="laptop:gap-2 flex items-center gap-1">
        {/* 프로필 리스트 */}
        <div className="flex gap-1 -space-x-2">
          {[1, 2, 3].map((j) => (
            <Skeleton key={j} className="size-6 rounded-full" />
          ))}
        </div>
        {/* 참가 인원 + 크루 이름 */}
        <Skeleton className="h-4 w-32" />
      </div>
    </li>
  );
}
