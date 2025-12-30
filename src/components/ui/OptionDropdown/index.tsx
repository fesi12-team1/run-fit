import Dropdown from '@/components/ui/Dropdown';
import { getOptionLabel } from '@/lib/utils';

interface OptionDropdownProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly { label: string; value: T }[];
}

/**
 * 드롭다운 메뉴에서 옵션을 선택하기 위한 OptionDropdown 컴포넌트
 * @param value 현재 선택된 옵션의 값
 * @param onChange 옵션이 변경될 때 호출되는 콜백 함수
 * @param options 드롭다운에 표시할 옵션들의 배열
 */
export default function OptionDropdown<T extends string>({
  value: optionValue,
  onChange,
  options,
}: OptionDropdownProps<T>) {
  return (
    <Dropdown size="lg">
      <Dropdown.Trigger className="bg-transparent">
        {getOptionLabel(options, optionValue)}
      </Dropdown.Trigger>
      <Dropdown.Content>
        {options.map(({ label, value }) => (
          <Dropdown.Item
            key={value}
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
