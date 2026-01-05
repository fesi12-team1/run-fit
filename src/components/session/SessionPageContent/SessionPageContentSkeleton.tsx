import FilterBarSkeleton from '../FilterBar/FilterBarSkeleton';
import SessionListSkeleton from '../SessionList/SessionListSkeleton';

export default function SessionPageContentSkeleton() {
  return (
    <div className="flex w-full flex-col">
      <FilterBarSkeleton />
      <SessionListSkeleton />
    </div>
  );
}
