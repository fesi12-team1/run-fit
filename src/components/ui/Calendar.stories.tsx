import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { DateRange, DayPicker } from 'react-day-picker';
import Calendar from './Calendar';

/**
 * Calendar 컴포넌트는 사용자가 날짜를 선택할 수 있는 캘린더 UI 요소입니다.
 *
 * 사용자는 단일 날짜 또는 날짜 범위를 선택할 수 있으며,
 * 이전 및 다음 달의 날짜도 표시할 수 있습니다.
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
    mode: {
      options: ['single', 'range'],
      description: '한 번에 선택 가능한 날짜 범위',
      defaultValue: 'single',
    },
    captionLayout: {
      description: '월/연도 선택 방식',
      defaultValue: 'label',
    },
    showOutsideDays: {
      description: '이전/다음 달 날짜 표시 여부',
      defaultValue: true,
    },
    selected: {
      description: '선택된 날짜 또는 날짜 범위',
      control: {
        type: 'object',
      },
    },
    onSelect: {
      action: 'selected',
      description: '날짜 선택 시 호출되는 콜백 함수',
    },
    disablePastDates: {
      control: { type: 'boolean' },
      description: '오늘 이전 날짜 선택 비활성화 여부',
      defaultValue: false,
    },
  },
  args: {
    mode: 'single',
    captionLayout: 'label',
    showOutsideDays: true,
    disablePastDates: true,
  },
};

export default meta;

type Story = StoryObj<typeof DayPicker>;

/**
 * 하나의 날짜만 클릭 가능하고 이전/다음 달 날짜를 표시합니다.
 */
export const SingleSelection: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="single" selected={date} onSelect={setDate} />
        <span>{date?.toLocaleDateString()}</span>
      </div>
    );
  },
};

/**
 * 날짜 범위를 클릭하여 선택할 수 있습니다.
 */
export const RangeSelection: Story = {
  render: (args) => {
    const [date, setDate] = useState<DateRange | undefined>({
      from: new Date(),
      to: new Date(),
    });
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="range" selected={date} onSelect={setDate} />
        <span>
          {date?.from?.toLocaleDateString()} - {date?.to?.toLocaleDateString()}
        </span>
      </div>
    );
  },
};

/**
 * 오늘 이전 날짜 클릭 가능하도록 설정합니다.
 */
export const AllowPastDates: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          disablePastDates={false}
        />
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
        <Calendar
          {...args}
          mode="single"
          selected={date}
          onSelect={setDate}
          showOutsideDays={false}
        />
        <span>{date?.toLocaleDateString()}</span>
      </div>
    );
  },
};
