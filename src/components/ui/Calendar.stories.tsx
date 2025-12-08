import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { DateRange } from 'react-day-picker';
import Calendar, { type CalendarProps } from './Calendar';

/**
 * Calendar 컴포넌트는 사용자가 날짜를 선택할 수 있는 캘린더 UI 요소입니다.
 *
 * 단일 날짜 선택과 날짜 범위 선택 모드를 지원하며, 월/연도 선택 방식을 라벨 또는 드롭다운으로 설정할 수 있습니다.
 * 또한 이전/다음 달의 날짜를 표시할지 여부와 캘린더 내 버튼 스타일을 커스터마이징할 수 있습니다.
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
      control: {
        type: 'radio',
      },
      options: ['single', 'range'],
      description: '한 번에 선택 가능한 날짜 범위',
    },
    captionLayout: {
      control: {
        type: 'radio',
      },
      options: ['label', 'dropdown'],
      description: '월/연도 선택 방식',
    },
    showOutsideDays: {
      control: 'boolean',
      description: '이전/다음 달 날짜 표시 여부',
    },
    buttonVariant: {
      control: 'select',
      options: ['ghost', 'outline', 'default', 'secondary', 'destructive'],
      description: '달력에서 사용하는 버튼 스타일',
    },
  },
};

export default meta;

type Story = StoryObj<CalendarProps>;

/**
 * 하나의 날짜만 클릭 가능하고 이전/다음 달 날짜를 표시합니다.
 */
export const Default: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'label',
  },
  render: (args: CalendarProps) => <Calendar {...args} />,
};

/**
 * 연/월을 드롭다운으로 선택할 수 있고 이전/다음 달 날짜를 표시합니다.
 */
export const DropdownCaption: Story = {
  args: {
    mode: 'single',
    showOutsideDays: true,
    captionLayout: 'dropdown',
  },
  render: (args: CalendarProps) => <Calendar {...args} />,
};

/**
 * 날짜 범위를 클릭하여 선택할 수 있습니다.
 */
export const RangeSelection: Story = {
  args: {
    mode: 'range',
    captionLayout: 'dropdown',
  },
  render: (args: CalendarProps) => <Calendar {...args} />,
};

/**
 * 하나의 날짜를 선택할 수 있으며, 선택된 날짜는 외부에서 제어할 수 있습니다.
 */
export const ControlledSingle: Story = {
  render: (args: CalendarProps) => {
    const [selected, setSelected] = React.useState<Date>();

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar
          {...args}
          mode="single"
          selected={selected}
          onSelect={setSelected}
        />
        <pre className="rounded-md bg-gray-100 p-3 text-sm">
          {selected
            ? selected.toLocaleDateString()
            : '날짜가 선택되지 않았습니다'}
        </pre>
      </div>
    );
  },
};

/**
 *  날짜 범위를 선택할 수 있으며, 선택된 날짜 범위는 외부에서 제어할 수 있습니다.
 */
export const ControlledRange: Story = {
  render: (args: CalendarProps) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date('2025-12-25'),
      to: undefined,
    });

    return (
      <div className="flex flex-col items-center gap-4">
        <Calendar {...args} mode="range" selected={date} onSelect={setDate} />
        <pre className="rounded-md bg-gray-100 p-3 text-sm">
          {date?.from?.toLocaleDateString()} - {date?.to?.toLocaleDateString()}
        </pre>
      </div>
    );
  },
};
