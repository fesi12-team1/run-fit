import Image from 'next/image';
import CrewCard from '@/components/crew/CrewCard';
import { cn } from '@/lib/utils';
import { Crew } from '@/types';

export default function CrewList({
  data: crews,
  loadMoreRef,
}: {
  data?: Crew[];
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
}) {
  const hasData = crews && crews.length > 0;

  return (
    <div
      className={cn(
        'flex w-full flex-1',
        hasData ? 'items-start' : 'items-center justify-center'
      )}
    >
      {crews?.length ? (
        <div className="tablet:gap-0 grid w-full grid-cols-1 gap-5 border-b border-gray-700">
          {crews.map((crew) => (
            <CrewCard key={crew.id} crew={crew} />
          ))}
          <div ref={loadMoreRef} className="h-1" />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center gap-10">
      <Image
        alt="No Crews"
        height={150}
        src="/assets/crew-default.png"
        width={300}
      />
      <span className="text-body2-medium text-center text-gray-300">
        아직 생성된 크루가 없어요 <br /> 나와 FIT한 러닝 크루를 직접
        만들어보세요!
      </span>
    </div>
  );
}
