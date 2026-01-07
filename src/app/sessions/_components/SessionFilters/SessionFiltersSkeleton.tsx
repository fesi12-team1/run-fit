import Skeleton from '@/components/ui/Skeleton';

export default function SessionFiltersSkeleton() {
  return (
    <div className="flex w-full items-center">
      <div className="tablet:pt-5 relative flex flex-1 items-center gap-2">
        <div className="scrollbar-hide flex w-max items-center gap-2">
          {/* 지역, 날짜, 시간, 레벨 필터 */}
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-9 w-20" />
          ))}
        </div>
      </div>
      {/* 정렬 드롭다운 */}
      <div className="tablet:pt-5 ml-auto">
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
}
