'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import ReviewCard from '@/components/crew/ReviewCard';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function MyReviewsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(userQueries.me.reviews());

  const reviews = data?.reviews ?? [];
  const hasNoReviews = !isLoading && reviews.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) {
    return (
      <section className="flex h-[60vh] items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </section>
    );
  }

  if (hasNoReviews) {
    return (
      <section className="text-body2-medium flex h-[60vh] items-center justify-center text-center text-gray-300">
        아직 작성한 리뷰가 없어요
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {reviews.map((review, index) => (
        <div key={review.id} className="flex flex-col gap-4">
          <ReviewCard data={review} showUser={false} />
          {index !== reviews.length - 1 && (
            <div
              className="h-px w-full"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to right, #24242E 0 4px, transparent 4px 8px)',
              }}
            />
          )}
        </div>
      ))}

      <div ref={bottomRef} className="h-5" />

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Spinner className="text-brand-500 size-5" />
        </div>
      )}
    </section>
  );
}
