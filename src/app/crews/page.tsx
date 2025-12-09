import CrewCard from '@/components/crew/CrewCard';
import { mockCrews } from '@/mocks/data';

export default function Page() {
  return (
    <div className="tablet:mx-8 laptop:mx-100 h-main mx-4 flex flex-col items-center gap-12">
      {process.env.NODE_ENV === 'development' && (
        <div>
          <span className="tablet:hidden text-white">mobile</span>
          <span className="tablet:inline-flex laptop:hidden hidden text-white">
            tablet
          </span>
          <span className="laptop:inline-flex desktop:hidden hidden text-white">
            laptop
          </span>
          <span className="desktop:inline-flex hidden text-white">desktop</span>
        </div>
      )}
      <ul className="tablet:gap-x-4 tablet:divide-y flex w-full flex-col gap-x-3">
        {mockCrews.map((crew) => (
          <CrewCard key={crew.id} data={crew} />
        ))}
      </ul>
    </div>
  );
}
