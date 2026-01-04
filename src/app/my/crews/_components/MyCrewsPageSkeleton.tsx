import MyCrewCardSkeleton from '@/components/my/MyCrewCard/MyCrewCardSkeleton';

export default function MyCrewsPageSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      {[1, 2, 3].map((i, index, arr) => (
        <div key={i} className="flex flex-col gap-4">
          <MyCrewCardSkeleton />
          {/* 구분선 (마지막 제외) */}
          {index !== arr.length - 1 && (
            <hr className="w-full border-gray-700" />
          )}
        </div>
      ))}
    </section>
  );
}
