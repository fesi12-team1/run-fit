import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DatePicker, { DatePickerProps } from '.';

const meta: Meta<DatePickerProps> = {
  title: 'ui/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
      description: '날짜를 선택하는 입력 필드입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerProps>;

/**
 * 단일 선택 모드 DatePicker 컴포넌트 상태 예시
 */
export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        label="모임 날짜"
        mode="single"
        placeholder="날짜를 선택하세요"
        value={date}
        onChange={setDate}
      />
    );
  },
};

/**
 * 범위 선택 모드 DatePicker 컴포넌트 상태 예시
 */
export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <DatePicker
        label="기간"
        mode="range"
        placeholder="기간을 선택하세요"
        value={range}
        onChange={setRange}
      />
    );
  },
};
