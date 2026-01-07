import SessionCardSkeleton from '@/components/session/SessionCard/SessionCardSkeleton';

export default function SessionListSkeleton() {
  return (
    <div className="tablet:my-6 my-2 flex w-full flex-1">
      <ul className="laptop:grid-cols-3 tablet:gap-x-6 tablet:gap-y-10 grid w-full grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SessionCardSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
}
