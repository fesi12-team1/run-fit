import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TimeFilter from './index';

const meta: Meta<typeof TimeFilter> = {
  title: 'Filters/TimeFilter',
  component: TimeFilter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex min-h-[400px] items-start justify-center bg-gray-950 p-20">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TimeFilter>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number] | undefined>();

    return (
      <div className="flex flex-col gap-4 text-white">
        <TimeFilter value={value} onChange={setValue} />
      </div>
    );
  },
};

export const TimeSelected: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number] | undefined>([
      600, 600,
    ]);

    return <TimeFilter value={value} onChange={setValue} />;
  },
};

export const RangeSelected: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number] | undefined>([
      600, 840,
    ]);

    return <TimeFilter value={value} onChange={setValue} />;
  },
};
