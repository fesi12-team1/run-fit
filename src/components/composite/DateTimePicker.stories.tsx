import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import DateTimePicker from './DateTimePicker';
import type { DateTimeValue } from './DateTimePicker';
import type { TimeValue } from './TimePicker';

/**
 * 날짜(Date)와 시간(Time)을 함께 선택할 수 있는 DateTimePicker 컴포넌트입니다.
 * 팝오버 내부에서 DatePicker와 TimePicker가 조합되어 동작합니다.
 */

const meta: Meta<typeof DateTimePicker> = {
  title: 'composite/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: undefined,
    label: '날짜 / 시간',
  },
  argTypes: {
    value: {
      control: false,
      description: '선택된 날짜/시간 값',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
    },
    onChange: {
      action: 'onChange',
      description: '값이 변경될 때 호출됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

/**
 * 기본 예시
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateTimeValue | undefined>(undefined);

    return (
      <DateTimePicker
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};

/**
 * 비활성(disabled) 상태
 */
export const Disabled: Story = {
  render: (args) => {
    const [value] = useState<DateTimeValue | undefined>(undefined);

    return (
      <DateTimePicker {...args} value={value} onChange={() => {}} disabled />
    );
  },
};

/**
 * 기본 시간값을 커스텀한 예시
 */
export const InitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<DateTimeValue>({
      date: new Date('2025-12-25'),
      time: {
        hour: '08',
        minute: '45',
        ampm: 'PM',
      } satisfies TimeValue,
    });

    return (
      <DateTimePicker
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};
