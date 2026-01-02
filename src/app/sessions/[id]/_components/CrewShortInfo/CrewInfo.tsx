'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import SafeImage from '@/components/ui/SafeImage';
import { Crew } from '@/types';

interface CrewInfoProps {
  crewId: Crew['id'];
}

export default function CrewInfo({ crewId }: CrewInfoProps) {
  const { data: crew } = useSuspenseQuery({
    ...crewQueries.detail(Number(crewId)),
  });

  return (
    <Link href={`/crews/${crewId}`} className="flex items-center gap-3">
      <div className="tablet:aspect-84/56 relative aspect-66/44 w-20">
        <SafeImage
          src={crew.image}
          alt={crew.name}
          fallbackSrc="/assets/crew-default.png"
          height={44}
          width={66}
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-caption-semibold tablet:text-body2-semibold mb-0.5">
          {crew.name}
        </div>
        <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
          {`${crew.city} • 멤버 ${crew.memberCount}명`}
        </div>
      </div>
    </Link>
  );
}
