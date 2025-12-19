import Dropdown from '@/components/ui/Dropdown';
import { SORT_OPTIONS } from '@/constants/session-filter';
import { getOptionLabel } from '@/lib/utils';
import { SessionSort } from '@/types';

interface SortOptionsProps {
  value: SessionSort;
  onChange: (value: SessionSort) => void;
}

export default function SortOptions({ value, onChange }: SortOptionsProps) {
  return (
    <Dropdown size="lg">
      <Dropdown.Trigger className="bg-transparent">
        {getOptionLabel(SORT_OPTIONS, value)}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {SORT_OPTIONS.map(({ label, value }) => (
          <Dropdown.Item
            key={value}
            selected={value === value}
            onSelect={() => onChange(value)}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
