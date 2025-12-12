import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LevelIcon from '@/assets/icons/level.svg?react';
import { cn } from '@/lib/utils';
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

// SVG가 포함된 LevelBadge 스토리 임시로 주석처리.
export const Level: StoryObj<typeof LevelBadge> = {
  render: (args) => {
    const iconSize = {
      sm: 'size-3',
      md: 'size-3',
      lg: 'size-4',
    };
    const fillColor = {
      easy: 'fill-gray-200',
      medium: 'fill-[#F2B48A]',
      hard: 'fill-[#FF819E]',
    };
    const textColor = {
      easy: 'text-gray-200',
      medium: 'text-[#F2B48A]',
      hard: 'text-[#FF819E]',
    };
    const text = {
      easy: '초급',
      medium: '중급',
      hard: '고급',
    };

    return (
      <div className="flex items-center gap-4">
        <Badge variant="level" {...args}>
          <LevelIcon className={cn(iconSize[args.size], fillColor.easy)} />
          <span className={textColor.easy}>{text.easy}</span>
        </Badge>
        <Badge variant="level" {...args}>
          <LevelIcon className={cn(iconSize[args.size], fillColor.medium)} />
          <span className={textColor.medium}>{text.medium}</span>
        </Badge>
        <Badge variant="level" {...args}>
          <LevelIcon className={cn(iconSize[args.size], fillColor.hard)} />
          <span className={textColor.hard}>{text.hard}</span>
        </Badge>
      </div>
    );
  },
  args: {
    level: 'easy',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['easy', 'medium', 'hard'],
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
      <DdayBadge {...args} size="sm" />
      <DdayBadge {...args} size="md" />
      <DdayBadge {...args} size="lg" />
    </div>
  ),
  args: {
    children: 'D-day',
  },
};
