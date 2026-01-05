import { ErrorBoundary, Suspense } from '@suspensive/react';
import ErrorFallback from '@/components/ui/ErrorFallback';
import LikedSessionsPageSkeleton from './_components/LikedSessionsPageSkeleton';
import SessionList from './_components/SessionList';

export default function Page() {
  return (
    <main className="h-main tablet:px-8 laptop:px-0 tablet:pb-10 tablet:pt-0 mx-auto w-full max-w-[1120px] px-4 pt-5 pb-5">
      <div className="tablet:block mt-[45px] mb-[43px] ml-1 hidden">
        <h1 className="text-title2-semibold text-gray-50">찜한 세션</h1>
        <p className="text-body3-regular text-gray-300">
          마감되기 전에 지금 바로 참여해보세요!
        </p>
      </div>
      <ErrorBoundary
        fallback={
          <ErrorFallback
            imageSrc="/assets/session-default.png"
            message="세션 목록을 불러오는데 실패했습니다."
          />
        }
      >
        <Suspense fallback={<LikedSessionsPageSkeleton />} clientOnly>
          <div className="flex w-full flex-1">
            <SessionList />
          </div>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
