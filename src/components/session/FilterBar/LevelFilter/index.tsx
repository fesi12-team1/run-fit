'use client';

import Dropdown from '@/components/ui/Dropdown';
import { SESSION_LEVEL_OPTIONS } from '@/constants/session';
import { getOptionLabel } from '@/lib/utils';
import { SessionLevel } from '@/types';

interface LevelFilterProps {
  value?: SessionLevel;
  onChange: (value?: SessionLevel) => void;
}

export default function LevelFilter({
  value: optionValue,
  onChange,
}: LevelFilterProps) {
  return (
    <Dropdown size="lg" hasSelected={Boolean(optionValue)}>
      <Dropdown.Trigger>
        {optionValue
          ? getOptionLabel(SESSION_LEVEL_OPTIONS, optionValue)
          : '난이도'}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {SESSION_LEVEL_OPTIONS.map(({ label, value }) => (
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
