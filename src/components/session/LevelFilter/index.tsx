'use client';

import Dropdown from '@/components/ui/Dropdown';
import { LEVEL_OPTIONS, LevelFilterValue } from '@/constants/session-filter';
import { getOptionLabel } from '@/lib/utils';

interface LevelFilterProps {
  value?: LevelFilterValue;
  onChange: (value?: LevelFilterValue) => void;
}

export default function LevelFilter({
  value: optionValue,
  onChange,
}: LevelFilterProps) {
  return (
    <Dropdown size="lg" hasSelected={Boolean(optionValue)}>
      <Dropdown.Trigger>
        {optionValue ? getOptionLabel(LEVEL_OPTIONS, optionValue) : '난이도'}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {LEVEL_OPTIONS.map(({ label, value }) => (
          <Dropdown.Item
            key={value ?? 'all'}
            selected={value === optionValue}
            onSelect={() => onChange(value)}
          >
            {label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
