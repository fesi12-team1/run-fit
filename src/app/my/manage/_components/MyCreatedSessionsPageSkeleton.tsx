import SessionCardSkeleton from '@/components/session/SessionCard/SessionCardSkeleton';

export default function MyCreatedSessionsPageSkeleton() {
  return (
    <div className="tablet:gap-x-4 tablet:gap-y-10 laptop:grid-cols-3 grid grid-cols-2 gap-x-3 gap-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative flex w-full flex-col">
          <SessionCardSkeleton key={i} />
        </div>
      ))}
    </div>
  );
}
