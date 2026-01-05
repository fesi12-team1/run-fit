import Skeleton from '@/components/ui/Skeleton';

export default function RecruitingSessionsSkeleton() {
  return (
    <div className="flex gap-3 overflow-x-auto">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="laptop:w-[calc((100%-24px)/3)] w-[calc((100%-12px)/2)] shrink-0"
        >
          {/* SessionCard Skeleton with displayParticipants={false}, textSize="sm" */}
          <li className="relative flex w-full flex-col">
            {/* 하트 아이콘 */}
            <div className="absolute top-3 right-3 z-1">
              <Skeleton className="size-7 rounded-full" />
            </div>

            {/* 세션 이미지 */}
            <div className="tablet:aspect-171/100 relative aspect-165/185 w-full overflow-hidden rounded-lg">
              <Skeleton className="h-full w-full rounded-lg" />

              {/* D-day 뱃지 */}
              <div className="absolute top-3 left-3">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* 위치 정보 */}
              <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            {/* 세션 정보 - textSize="sm" */}
            <div className="mobile:mb-2 tablet:mt-[18px] pointer-events-none my-3">
              {/* 세션 이름 - text-body3-semibold tablet:text-body2-semibold */}
              <Skeleton className="text-body3-semibold tablet:text-body2-semibold mb-2 h-5 w-3/4" />

              {/* 날짜/시간 - text-caption-regular tablet:text-body3-regular */}
              <Skeleton className="mobile:mb-1 text-caption-regular tablet:text-body3-regular mb-2 h-4 w-1/2" />

              {/* 페이스 + 레벨 배지 */}
              <div className="laptop:gap-1 flex items-center gap-0.5">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
            {/* displayParticipants={false}이므로 ProfileList 제거 */}
          </li>
        </div>
      ))}
    </div>
  );
}
