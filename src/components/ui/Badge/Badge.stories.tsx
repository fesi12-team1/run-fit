import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { type SessionLevel } from '@/types';
import { DdayBadge, LevelBadge, PaceBadge, RoleBadge } from '.';

const meta: Meta = {
  title: 'UI/Badges',
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj;

export const Paces: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PaceBadge paceSeconds={330} size="sm" />
        <PaceBadge paceSeconds={330} size="md" />
        <PaceBadge paceSeconds={330} size="lg" />
        <PaceBadge paceSeconds={330} size="responsive" />
      </div>

      <div className="flex items-center gap-2">
        <PaceBadge paceSeconds={270} size="sm" />
        <PaceBadge paceSeconds={450} size="sm" />
        <PaceBadge paceSeconds={615} size="sm" />
      </div>
    </div>
  ),
};

export const Levels: Story = {
  render: () => {
    const levels: SessionLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
    const sizes: Array<'sm' | 'md' | 'lg' | 'responsive'> = [
      'sm',
      'md',
      'lg',
      'responsive',
    ];

    return (
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <div key={size} className="flex items-center gap-2">
            {levels.map((level) => (
              <LevelBadge key={level} level={level} size={size} />
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Ddays: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <DdayBadge dday="D-3" size="md" />
        <DdayBadge dday="D-3" size="lg" />
        <DdayBadge dday="D-3" size="responsive" />
      </div>

      <div className="flex items-center gap-2">
        <DdayBadge dday="D-day" size="md" />
        <DdayBadge dday="D+1" size="md" />
      </div>
    </div>
  ),
};

export const Roles: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <RoleBadge role="LEADER" />
      <RoleBadge role="STAFF" />
    </div>
  ),
};

export const InContext: Story = {
  name: 'In Context (Session Card snippet)',
  render: () => (
    <div className="flex items-center gap-1">
      <DdayBadge dday="D-2" size="responsive" />
      <PaceBadge paceSeconds={360} size="responsive" />
      <LevelBadge level="INTERMEDIATE" size="responsive" />
      <RoleBadge role="LEADER" />
    </div>
  ),
};
