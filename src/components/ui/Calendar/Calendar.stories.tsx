import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import Calendar from '.';

/**
 * Calendar 컴포넌트는 사용자가 날짜를 선택할 수 있는 캘린더 UI 요소입니다.
 *
 * Single 모드는 단일 날짜 선택을 지원하며, Range 모드는 날짜 범위 선택을 지원합니다.
 *
 * 사용자는 이전/다음 달 날짜 표시 여부와 오늘 이전 날짜 선택 비활성화 옵션을 설정할 수 있습니다.
 *
 */

const meta: Meta<typeof Calendar> = {
  title: 'ui/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disablePastDates: {
      control: { type: 'boolean' },
      description: '오늘 이전 날짜 선택 비활성화 여부',
      defaultValue: false,
    },
    showOutsideDays: {
      control: { type: 'boolean' },
      description: '이전/다음 달 날짜 표시 여부',
      defaultValue: true,
    },
  },
  args: {
    disablePastDates: false,
    showOutsideDays: true,
  },
};

export default meta;

type Story = StoryObj<typeof DayPicker>;

/**
 * 하나의 날짜만 클릭 가능하고 이전/다음 달 날짜를 표시합니다.
 */
export const Single: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar.Single {...args} selected={date} onSelect={setDate} />
        <span>{date?.toLocaleDateString()}</span>
      </div>
    );
  },
};

/**
 * 날짜 범위를 클릭하여 선택할 수 있습니다.
 */
export const Range: Story = {
  render: (args) => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar.Range {...args} selected={range} onSelect={setRange} />
        <span>
          {range?.from
            ? `${range.from.toLocaleDateString()} - ${range.to?.toLocaleDateString() ?? '선택 중...'}`
            : '날짜 범위를 선택하세요'}
        </span>
      </div>
    );
  },
};

/**
 * 오늘 이전 날짜는 클릭할 수 없습니다.
 */
export const DisablePastDates: StoryObj<typeof Calendar.Single> = {
  args: {
    disablePastDates: true,
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar.Single {...args} selected={date} onSelect={setDate} />
        <span>{date?.toLocaleDateString()}</span>
      </div>
    );
  },
};

/**
 * 이전/다음 달 날짜를 표시하지 않습니다.
 */
export const HideOutsideDays: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar.Single
          {...args}
          selected={date}
          onSelect={setDate}
          showOutsideDays={false}
        />
        <span>{date?.toLocaleDateString()}</span>
      </div>
    );
  },
};
