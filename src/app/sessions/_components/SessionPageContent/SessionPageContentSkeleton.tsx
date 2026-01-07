import SessionFiltersSkeleton from '../SessionFilters/SessionFiltersSkeleton';
import SessionListSkeleton from '../SessionList/SessionListSkeleton';

export default function SessionPageContentSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <SessionFiltersSkeleton />
      <SessionListSkeleton />
    </div>
  );
}
