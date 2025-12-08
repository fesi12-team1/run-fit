import CrewCard from '@/components/crew/CrewCard';

export default function Page() {
  return (
    <div className="tablet:mx-8 laptop:mx-100 mx-4 flex h-screen flex-col items-center gap-12">
      <div>
        <span className="tablet:hidden text-white">mobile</span>
        <span className="tablet:inline-flex laptop:hidden hidden text-white">
          tablet
        </span>
        <span className="laptop:inline-flex hidden text-white">laptop</span>
      </div>
      <ul className="tablet:gap-x-4 flex w-full flex-col gap-x-3 divide-y">
        {Array.from({ length: 6 }).map((_, index) => (
          <CrewCard key={index} /> // 실제로는 crewId를 key로 사용
        ))}
      </ul>
    </div>
  );
}
