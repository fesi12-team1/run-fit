import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import RegionFilter from './index';

type RegionValue = Record<string, string[]>;

const meta: Meta<typeof RegionFilter> = {
  title: 'Filters/RegionFilter',
  component: RegionFilter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex min-h-[600px] items-start justify-center bg-gray-950 p-20">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof RegionFilter>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<RegionValue | undefined>();

    return (
      <div className="flex flex-col gap-8 text-white">
        <div className="flex justify-center">
          <RegionFilter value={value} onChange={setValue} />
        </div>
      </div>
    );
  },
};

export const PreSelected: Story = {
  render: () => {
    const [value, setValue] = useState<RegionValue | undefined>({
      서울: ['강남구', '서초구'],
      경기: ['수원시'],
    });

    return (
      <div className="flex flex-col gap-8 text-white">
        <div className="flex justify-center">
          <RegionFilter value={value} onChange={setValue} />
        </div>
      </div>
    );
  },
};
