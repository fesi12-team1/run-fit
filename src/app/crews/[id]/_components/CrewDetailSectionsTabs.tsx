import { useRouter } from 'next/navigation';
import Tabs from '@/components/ui/Tabs';
import { CREW_DETAIL_SECTIONS } from '@/constants/crew';

export default function CrewDetailSectionsTabs() {
  const router = useRouter();

  return (
    <Tabs
      defaultValue={CREW_DETAIL_SECTIONS[0].id}
      className="tablet:top-15 laptop:bg-gray-850 sticky top-14 z-10 bg-gray-800"
    >
      <Tabs.List>
        {CREW_DETAIL_SECTIONS.map((section) => (
          <Tabs.Trigger
            key={section.id}
            value={section.id}
            onClick={() => router.push(`#${section.id}`)}
            className="laptop:bg-gray-850 bg-gray-800"
          >
            {section.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
