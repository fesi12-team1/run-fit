import Skeleton from '@/components/ui/Skeleton';

export default function ReviewListSkeleton() {
  return (
    <>
      <hr className="text-gray-600" />
      <div>
        {/* Rating Stars */}
        <div className="mb-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="size-5" />
          ))}
        </div>
        {/* Review Text */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </>
  );
}
