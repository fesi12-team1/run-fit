import Skeleton from '@/components/ui/Skeleton';

export default function ParticipantsListSkeleton() {
  return (
    <ul className="tablet:gap-5 mb-3 flex flex-col gap-2">
      {[1, 2, 3, 4].map((i) => (
        <li key={i} className="flex items-center gap-3">
          {/* Avatar */}
          <Skeleton className="size-12 shrink-0 rounded-full" />

          {/* User Info */}
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-14 rounded" />
              <Skeleton className="h-5 w-30" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
