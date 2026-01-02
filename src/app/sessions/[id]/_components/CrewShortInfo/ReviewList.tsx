import { useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import Rating from '@/components/ui/Rating';
import { Crew } from '@/types';

interface ReviewListProps {
  crewId: Crew['id'];
}

export default function ReviewList({ crewId }: ReviewListProps) {
  const { data: reviewsData } = useSuspenseQuery({
    ...crewQueries.reviews(crewId).list({ page: 0, size: 1 }),
  });
  const review = reviewsData?.content?.[0];

  if (!review) {
    return null;
  }

  return (
    <>
      <hr className="text-gray-600" />
      <div>
        <Rating
          value={review?.ranks ?? 0}
          onChange={() => {}}
          disabled
          className="mb-2 cursor-none"
        />
        <p className="text-caption-regular tablet:text-body3-regular laptop:max-w-[320px] line-clamp-2 text-gray-200">
          {review.description}
        </p>
      </div>
    </>
  );
}
