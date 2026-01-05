import Skeleton from '@/components/ui/Skeleton';

export default function CrewInfoSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="tablet:aspect-84/56 relative flex aspect-66/44 w-20 items-center justify-center overflow-hidden rounded-lg">
        <Skeleton className="size-full animate-pulse bg-gray-600" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-5 w-24 animate-pulse rounded bg-gray-600" />
        <Skeleton className="h-4 w-32 animate-pulse rounded bg-gray-600" />
      </div>
    </div>
  );
}
