import Skeleton from '@/components/ui/Skeleton';

export default function SessionDetailInfoSkeleton() {
  return (
    <div className="tablet:px-12 laptop:px-3 laptop:py-0 tablet:py-8 tablet:gap-8 laptop:bg-gray-900 flex flex-col gap-6 bg-gray-800 px-6 py-6">
      {/* 세션 소개 */}
      <div className="tablet:gap-2 flex flex-col gap-1">
        <Skeleton className="h-6 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <Skeleton className="mt-1 h-4 w-32" />
      </div>

      {/* 일정 */}
      <div className="tablet:gap-2 flex flex-col gap-1">
        <Skeleton className="h-6 w-16" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>

      {/* 장소 */}
      <div className="tablet:gap-2 flex flex-col gap-1">
        <Skeleton className="h-6 w-16" />
        <div className="tablet:h-[312px] tablet:rounded-[20px] flex h-[218px] flex-col overflow-hidden rounded-xl">
          <Skeleton className="min-h-0 flex-1" />
          <div className="flex-none px-4 py-5">
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
