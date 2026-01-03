'use client';

import { Suspense } from '@suspensive/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import ReviewCard from '@/components/crew/ReviewCard';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReviewsSkeleton from './ReviewsSkeleton';

export const dynamic = 'force-dynamic';

export default function MyReviewsPage() {
  return (
    <Suspense fallback={<ReviewsSkeleton />}>
      <MyReviewsContent />
    </Suspense>
  );
}

function MyReviewsContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(userQueries.me.reviews());

  const reviews = data?.reviews ?? [];
  const hasNoReviews = reviews.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, hasNextPage);

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

      {isFetchingNextPage && <Spinner.Scroll />}
    </section>
  );
}
