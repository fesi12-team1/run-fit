import Rating from '@/components/ui/Rating';

export default function ReviewsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      {[1, 2, 3].map((i, index, arr) => (
        <div key={i} className="flex flex-col gap-4">
          {/* 리뷰 카드 */}
          <div className="flex flex-col gap-2">
            {/* 별점 */}
            <Rating disabled value={0} onChange={() => {}} />

            {/* 리뷰 텍스트 - text-body3-regular */}
            <div className="flex flex-col gap-2">
              <div className="h-5 w-1/3 animate-pulse rounded bg-gray-600" />
            </div>

            {/* 작성 날짜 - text-caption-regular */}
            <div className="h-4 w-24 animate-pulse rounded bg-gray-600" />

            {/* SessionInfo - w-full gap-2 rounded-xl bg-gray-700 p-2 */}
            <div className="flex w-full gap-2 rounded-xl bg-gray-700 p-2">
              {/* 이미지 - aspect-video w-16 rounded-lg */}
              <div className="aspect-video w-16 animate-pulse rounded-lg bg-gray-600" />

              {/* 세션 정보 텍스트 */}
              <div className="flex flex-1 flex-col justify-end gap-1">
                <div className="h-4 w-1/4 animate-pulse rounded bg-gray-600" />
                <div className="h-3.5 w-1/3 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          </div>

          {/* 점선 구분선 (마지막 제외) */}
          {index !== arr.length - 1 && (
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
    </section>
  );
}
