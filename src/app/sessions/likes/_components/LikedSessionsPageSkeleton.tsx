import SessionCardSkeleton from '@/components/session/SessionCard/SessionCardSkeleton';

export default function LikedSessionsPageSkeleton() {
  return (
    <ul className="laptop:grid-cols-3 grid w-full grid-cols-2 gap-6">
      {[1, 2, 3].map((i) => (
        <SessionCardSkeleton key={i} />
      ))}
    </ul>
  );
}
