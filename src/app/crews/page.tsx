import CrewCard from '@/components/crew/CrewCard';
import { mockCrews } from '@/mocks/data';

export default function Page() {
  return (
    <div className="tablet:mx-8 h-main @container mx-4 flex flex-col items-center gap-12">
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
      <ul className="tablet:divide-y laptop:w-auto flex w-full flex-col">
        {mockCrews.map((crew) => (
          <CrewCard key={crew.id} data={crew} />
        ))}
      </ul>
    </div>
  );
}
