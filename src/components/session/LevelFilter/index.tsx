'use client';

import Dropdown from '@/components/ui/Dropdown';
import { LEVEL_OPTIONS, LevelFilterValue } from '@/constants/session-filter';
import { getOptionLabel } from '@/lib/utils';

interface LevelFilterProps {
  value?: LevelFilterValue;
  onChange: (value?: LevelFilterValue) => void;
}

export default function LevelFilter({ value, onChange }: LevelFilterProps) {
  return (
    <Dropdown size="lg" hasSelected={Boolean(value)}>
      <Dropdown.Trigger>
        {value ? getOptionLabel(LEVEL_OPTIONS, value) : '난이도'}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {LEVEL_OPTIONS.map(({ label, value }) => (
          <Dropdown.Item
            key={value ?? 'all'}
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
