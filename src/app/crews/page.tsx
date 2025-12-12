import CrewCard from '@/components/crew/CrewCard';
import { mockCrews } from '@/mocks/data';

export default function Page() {
  return (
    <div className="tablet:mx-8 h-main mx-4 flex flex-col items-center gap-12">
      <ul className="tablet:divide-y laptop:w-auto flex w-full flex-col divide-gray-700">
        {mockCrews.map((crew) => (
          <CrewCard key={crew.id} data={crew} />
        ))}
        {mockCrews.map((crew) => (
          <CrewCard key={crew.id} data={crew} />
        ))}
      </ul>
    </div>
  );
}
