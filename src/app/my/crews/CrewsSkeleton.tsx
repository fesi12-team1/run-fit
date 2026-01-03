export default function CrewsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      {[1, 2, 3].map((i, index, arr) => (
        <div key={i} className="flex flex-col gap-4">
          {/* 크루 카드 */}
          <div className="tablet:flex-row flex flex-col">
            {/* 크루 이미지 */}
            <div className="tablet:w-60 tablet:h-37 aspect-327/132 w-full shrink-0 animate-pulse rounded-xl bg-gray-600" />

            {/* 크루 정보 */}
            <div className="flex flex-col justify-center gap-2 p-4">
              <div className="h-6 w-48 animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-600" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-600" />

              {/* 태그들 */}
              <div className="mt-2 flex items-center gap-2">
                <div className="h-7 w-16 animate-pulse rounded-lg bg-gray-600" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          </div>

          {/* 구분선 (마지막 제외) */}
          {index !== arr.length - 1 && (
            <hr className="w-full border-gray-700" />
          )}
        </div>
      ))}
    </section>
  );
}
