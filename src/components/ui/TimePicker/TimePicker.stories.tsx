import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TimePicker, { type TimePickerProps, type TimeValue } from '.';

const defaultValue: TimeValue = {
  hour: '09',
  minute: '30',
  ampm: 'AM',
};

/**
 * TimePicker 컴포넌트는 시간(hour, minute, AM/PM)을 선택할 수 있는 UI 요소입니다.
 *
 * 세 개의 Select 컴포넌트(hour/minute/ampm)를 조합하여
 * 제어형(Controlled) 패턴으로 동작합니다.
 */

const meta: Meta<typeof TimePicker> = {
  title: 'composite/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: defaultValue,
  },
  argTypes: {
    value: {
      control: false,
      description: '선택된 시간 값 (hour, minute, ampm)',
    },
    onChange: {
      action: 'onChange',
      description: '시간 변경 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<TimePickerProps>;

/**
 * 기본(TimePicker)
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<TimeValue>({
      hour: '',
      minute: '',
      ampm: 'AM',
    });

    return <TimePicker value={value} onChange={setValue} />;
  },
};

/**
 * 초기값 있는 경우
 */
export const InitialValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<TimeValue>(args.value);
    return <TimePicker {...args} value={value} onChange={setValue} />;
  },
};
