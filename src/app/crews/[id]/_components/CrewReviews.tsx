'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { crewQueries } from '@/api/queries/crewQueries';
import ReviewCard from '@/components/crew/ReviewCard';
import ReviewPagination from '@/components/crew/ReviewPagination';
import { cn } from '@/lib/utils';

interface CrewReviewsProps {
  crewId: number;
  currentPage: number;
  isMobile: boolean;
  onPageChange: (page: number) => void;
}

export default function CrewReviews({
  crewId,
  currentPage,
  isMobile,
  onPageChange,
}: CrewReviewsProps) {
  const router = useRouter();

  const { data: crewReviewsData } = useSuspenseQuery(
    crewQueries.reviews(crewId).list({ page: currentPage, size: 4 })
  );

  const reviews = crewReviewsData?.content || [];
  const totalElements = crewReviewsData?.totalElements ?? 0;
  const totalPages = crewReviewsData?.totalPages ?? 0;

  return (
    <>
      <div className="flex gap-2">
        <h2
          className={cn(
            'text-gray-50',
            'tablet:text-title3-semibold text-body2-semibold'
          )}
        >
          후기
        </h2>
        <span className="text-title3-semibold text-brand-300">
          {totalElements}
        </span>
      </div>
      {!reviews || totalElements === 0 ? (
        <span
          className={cn(
            'self-center justify-self-center text-gray-300',
            'text-body3-regular py-2.5',
            'tablet:text-body2-medium tablet:py-5 tablet:mb-4'
          )}
        >
          아직 작성된 후기가 없어요
        </span>
      ) : (
        <>
          <div
            className={cn(
              'flex flex-col divide-y divide-dashed divide-gray-500',
              '*:pb-4 not-first:*:pt-4'
            )}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} data={review} />
            ))}
          </div>
          <ReviewPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              onPageChange(page);
              router.push(`/crews/${crewId}?page=${page + 1}`, {
                scroll: false,
              });
            }}
            isMobile={isMobile}
            isLoading={false}
          />
        </>
      )}
    </>
  );
}
