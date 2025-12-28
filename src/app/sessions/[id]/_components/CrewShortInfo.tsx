import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import Rating from '@/components/ui/Rating';
import SafeImage from '@/components/ui/SafeImage';
import { Crew } from '@/types';

export default function CrewShortInfo({ crew }: { crew: Crew }) {
  const { name, image } = crew;
  const reviewsQuery = useQuery({
    ...crewQueries.reviews(Number(crew.id)).list({ page: 0, size: 1 }),
  });
  const review = reviewsQuery.data?.content?.[0] || null;

  if (reviewsQuery.isLoading) return null;

  return (
    <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3 px-3 py-3">
      <Link href={`/crews/${crew.id}`} className="flex items-center gap-3">
        <div className="tablet:aspect-84/56 relative aspect-66/44 w-20">
          <SafeImage
            src={image}
            alt={name}
            fallbackSrc="/assets/crew-default.png"
            height={44}
            width={66}
            className="object-cover"
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

      {reviewsQuery.isError ? (
        <div>
          {reviewsQuery.error?.message === 'UNAUTHORIZED'
            ? '크루 리뷰를 보려면 로그인이 필요합니다.'
            : '크루 리뷰를 불러올 수 없습니다.'}
        </div>
      ) : (
        review && (
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
        )
      )}
    </div>
  );
}
