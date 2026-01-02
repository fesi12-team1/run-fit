import { useRouter } from 'next/navigation';
import Tabs from '@/components/ui/Tabs';

interface CrewDetailSectionsTabsProps {
  sections: {
    id: string;
    name: string;
  }[];
}

export default function CrewDetailSectionsTabs({
  sections,
}: CrewDetailSectionsTabsProps) {
  const router = useRouter();

  return (
    <Tabs
      defaultValue={sections[0].id}
      className="tablet:top-15 laptop:bg-gray-850 sticky top-14 z-10 bg-gray-800"
    >
      <Tabs.List>
        {sections.map((section) => (
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
