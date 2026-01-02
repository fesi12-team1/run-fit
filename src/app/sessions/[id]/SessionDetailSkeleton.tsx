import HeartOutline from '@/assets/icons/heart-outline.svg?react';
import Share from '@/assets/icons/share.svg?react';

export default function SessionDetailSkeleton() {
  return (
    <>
      <main className="h-main laptop:bg-gray-900 bg-gray-800">
        {/* Mobile/Tablet */}
        <div className="laptop:hidden flex flex-col bg-gray-800 py-10">
          {/* 이미지 */}
          <div className="tablet:aspect-744/313 relative aspect-375/267 w-full overflow-hidden">
            <div className="size-full animate-pulse bg-gray-600" />
          </div>

          {/* 세션 정보 */}
          <div className="flex flex-col gap-5 px-6 py-6">
            {/* D-day 배지 */}
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-600" />

            {/* 제목 */}
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-600" />

            {/* 날짜/시간 */}
            <div className="h-5 w-1/2 animate-pulse rounded bg-gray-600" />

            {/* 배지들 */}
            <div className="flex items-center gap-1">
              <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
              <div className="h-6 w-12 animate-pulse rounded bg-gray-600" />
            </div>

            {/* ProgressBar */}
            <div className="h-2 w-full animate-pulse rounded-full bg-gray-600" />

            {/* 구분선 */}
            <hr className="text-gray-500" />

            {/* 세션 소개 */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-600" />
            </div>

            {/* 일정 */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-5/6 animate-pulse rounded bg-gray-600" />
            </div>

            {/* 장소 - 지도 */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
              <div className="h-[218px] w-full animate-pulse rounded-xl bg-gray-600" />
            </div>

            {/* 참가자 목록 */}
            <div className="flex flex-col gap-2">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-600" />
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-10 shrink-0 animate-pulse rounded-full bg-gray-600" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-24 animate-pulse rounded bg-gray-600" />
                      <div className="h-3 w-16 animate-pulse rounded bg-gray-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 크루 정보 */}
            <div className="mt-6 flex items-center gap-3">
              <div className="size-12 shrink-0 animate-pulse rounded-full bg-gray-600" />
              <div className="flex flex-col gap-2">
                <div className="h-5 w-32 animate-pulse rounded bg-gray-600" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="laptop:flex mx-auto hidden max-w-[1120px] gap-10 bg-gray-900 py-10">
          <div className="flex flex-1 flex-col gap-10 px-5">
            {/* 이미지 */}
            <div className="laptop:aspect-680/374 laptop:rounded-[20px] relative w-full overflow-hidden">
              <div className="size-full animate-pulse bg-gray-600" />
            </div>

            {/* 세션 상세 정보 */}
            <div className="flex flex-col gap-6">
              {/* 세션 소개 */}
              <div className="flex flex-col gap-2">
                <div className="h-6 w-24 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-5/6 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-gray-600" />
              </div>

              {/* 일정 */}
              <div className="flex flex-col gap-2">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-5/6 animate-pulse rounded bg-gray-600" />
              </div>

              {/* 장소 - 지도 */}
              <div className="flex flex-col gap-2">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
                <div className="tablet:h-[312px] h-[218px] w-full animate-pulse rounded-[20px] bg-gray-600" />
              </div>
            </div>
          </div>

          <div className="laptop:w-[360px] flex flex-col gap-10">
            {/* SessionShortInfo */}
            <div className="laptop:bg-gray-750 laptop:rounded-b-[20px] laptop:px-6 laptop:pt-7 laptop:pb-6 laptop:gap-8 flex flex-col gap-6 rounded-2xl bg-gray-800 px-6 py-6">
              {/* D-day 배지 + 드롭다운 영역 */}
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-600" />
              </div>

              <div className="flex flex-col gap-2">
                {/* 제목 */}
                <div className="h-8 w-3/4 animate-pulse rounded bg-gray-600" />

                {/* 날짜/시간 */}
                <div className="h-5 w-1/2 animate-pulse rounded bg-gray-600" />

                {/* 배지들 */}
                <div className="flex items-center gap-1">
                  <div className="h-6 w-16 animate-pulse rounded bg-gray-600" />
                  <div className="h-6 w-12 animate-pulse rounded bg-gray-600" />
                </div>
              </div>

              {/* ProgressBar */}
              <div className="h-2 w-full animate-pulse rounded-full bg-gray-600" />

              {/* 구분선 */}
              <hr className="text-gray-500" />

              {/* 데스크탑 버튼들 */}
              <div className="flex items-center gap-7">
                <div className="flex items-center gap-4">
                  <HeartOutline className="size-7 text-[#9CA3AF]" />
                  <Share className="size-6 text-[#9CA3AF]" />
                </div>
                <div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-600" />
              </div>
            </div>

            {/* CrewShortInfo */}
            <div className="laptop:mx-0 tablet:mx-12 tablet:rounded-[20px] tablet:px-6 tablet:py-4 tablet:bg-gray-750 mx-6 flex flex-col gap-4 rounded-xl border-gray-700 bg-gray-700 p-3">
              {/* 크루 정보 */}
              <div className="flex items-center gap-3">
                <div className="tablet:aspect-84/56 relative flex aspect-66/44 w-20 items-center justify-center overflow-hidden rounded-lg">
                  <div className="size-full animate-pulse bg-gray-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-600" />
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <div className="laptop:hidden fixed right-0 bottom-0 left-0 z-50 bg-gray-900 px-6 py-4">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-4">
            <HeartOutline className="size-7 text-[#9CA3AF]" />
            <Share className="size-6 text-[#9CA3AF]" />
          </div>
          <div className="h-12 flex-1 animate-pulse rounded-lg bg-gray-600" />
        </div>
      </div>
    </>
  );
}
