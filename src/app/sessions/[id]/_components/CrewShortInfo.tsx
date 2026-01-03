'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Suspense } from 'react';
import { crewQueries } from '@/api/queries/crewQueries';
import Rating from '@/components/ui/Rating';
import SafeImage from '@/components/ui/SafeImage';
import { Crew } from '@/types';

export default function CrewShortInfo({ crew }: { crew: Crew }) {
  const { name, image } = crew;

  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3 px-3 py-3">
      <Link href={`/crews/${crew.id}`} className="flex items-center gap-3">
        <div className="tablet:aspect-84/56 relative flex aspect-66/44 w-20 items-center justify-center">
          <SafeImage
            src={image}
            alt={name}
            fallbackSrc="/assets/crew-default.png"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <div className="text-caption-semibold tablet:text-body2-semibold mb-0.5">
            {name}
          </div>
          <div className="text-caption-regular tablet:text-body3-regular text-gray-300">
            {`${crew.city} • 멤버 ${crew.memberCount}명`}
          </div>
        </div>
      </Link>

      <hr className="text-gray-600" />

      <Suspense fallback={<ReviewSkeleton />}>
        <CrewReviewSection crewId={crew.id} />
      </Suspense>
    </div>
  );
}

function CrewReviewSection({ crewId }: { crewId: number }) {
  const { data } = useSuspenseQuery({
    ...crewQueries.reviews(crewId).list({ page: 0, size: 1 }),
  });

  const review = data?.content?.[0] || null;

  if (!review) return null;

  return (
    <div>
      <Rating
        value={review.ranks}
        onChange={() => {}}
        disabled
        className="mb-2"
      />
      <p className="text-caption-regular tablet:text-body3-regular laptop:max-w-[320px] line-clamp-2 text-gray-200">
        {review.description}
      </p>
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <div>
      <Rating value={0} onChange={() => {}} disabled className="mb-2" />
      <div className="laptop:max-w-[320px] space-y-1">
        <div className="h-4 w-full animate-pulse rounded bg-gray-600" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-600" />
      </div>
    </div>
  );
}
