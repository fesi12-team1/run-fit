import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import SessionDateFilter from '.';

const meta: Meta<typeof SessionDateFilter> = {
  title: 'Filters/SessionDateFilter',
  component: SessionDateFilter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex min-h-[500px] items-start justify-center bg-gray-950 p-20">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SessionDateFilter>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<DateRange | undefined>();

    return (
      <div className="flex flex-col gap-4 text-white">
        <SessionDateFilter value={value} onChange={setValue} />
      </div>
    );
  },
};

export const DaySelected: Story = {
  render: () => {
    const today = new Date();

    const [value, setValue] = useState<DateRange | undefined>({
      from: today,
      to: today,
    });

    return <SessionDateFilter value={value} onChange={setValue} />;
  },
};

export const RangeSelected: Story = {
  render: () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const [value, setValue] = useState<DateRange | undefined>({
      from: today,
      to: nextWeek,
    });

    return <SessionDateFilter value={value} onChange={setValue} />;
  },
};
