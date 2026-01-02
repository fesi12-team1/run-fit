import Image from 'next/image';
import CrewCard from '@/components/crew/CrewCard';
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
    <div className="tablet:my-6 my-2 w-full">
      {hasData ? (
        <>
          <div className="tablet:divide-y tablet:divide-gray-700 tablet:border-t tablet:border-gray-700 tablet:gap-0 grid w-full grid-cols-1 gap-5">
            {crews.map((crew) => (
              <CrewCard key={crew.id} crew={crew} />
            ))}
          </div>
          <div ref={loadMoreRef} className="h-1" />
        </>
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
