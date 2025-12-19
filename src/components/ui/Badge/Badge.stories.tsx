import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge, { DdayBadge, LevelBadge, PaceBadge } from '.';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['level', 'pace', 'dday'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Badge> = {
  args: {
    children: 'Badge',
  },
};

export const Level: StoryObj<typeof LevelBadge> = {
  render: (args) => {
    return (
      <div className="flex items-center gap-4">
        <LevelBadge {...args} size="sm" />
        <LevelBadge {...args} size="md" />
        <LevelBadge {...args} size="lg" />
      </div>
    );
  },
  args: {
    level: 'BEGINNER',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
    },
  },
};

export const Pace: StoryObj<typeof PaceBadge> = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <PaceBadge {...args} size="sm" />
      <PaceBadge {...args} size="md" />
      <PaceBadge {...args} size="lg" />
    </div>
  ),
  args: {
    pace: 300,
  },
  argTypes: {
    pace: {
      control: { type: 'number' },
    },
  },
};

export const Dday: StoryObj<typeof DdayBadge> = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <DdayBadge {...args} size="sm">
        {args.children}
      </DdayBadge>
      <DdayBadge {...args} size="md">
        {args.children}
      </DdayBadge>
      <DdayBadge {...args} size="lg">
        {args.children}
      </DdayBadge>
    </div>
  ),
  args: {
    children: 'D-day',
  },
};
