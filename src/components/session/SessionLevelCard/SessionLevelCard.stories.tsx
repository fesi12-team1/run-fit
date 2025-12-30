import { RadioGroup } from '@radix-ui/react-radio-group';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SessionLevel } from '@/types';
import SessionLevelCard from '.';

/**
 * 러닝 세션의 난이도(레벨)를 선택하는 카드 컴포넌트
 *
 */

const meta: Meta<typeof SessionLevelCard> = {
  title: 'session/SessionLevelCard',
  component: SessionLevelCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    level: 'BEGINNER',
    checked: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[327px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SessionLevelCard>;

/**
 * 기본
 */
export const Default: Story = {
  render: (args) => {
    return (
      <RadioGroup>
        <SessionLevelCard
          {...args}
          checked={false}
          level="INTERMEDIATE"
          value="INTERMEDIATE"
        />
      </RadioGroup>
    );
  },
};

/**
 * 체크된 상태
 */
export const Checked: Story = {
  args: { checked: true },
  render: (args) => (
    <RadioGroup>
      <SessionLevelCard {...args} value={args.level} />
    </RadioGroup>
  ),
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <RadioGroup>
      <SessionLevelCard {...args} value={args.level} />
    </RadioGroup>
  ),
};

/**
 * 리스트 예시
 */
export const LevelList: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<SessionLevel>('INTERMEDIATE');

    return (
      <RadioGroup
        value={selected}
        onValueChange={(val) => {
          setSelected(val as SessionLevel);
        }}
        className="flex w-[327px] flex-col gap-4"
      >
        <SessionLevelCard
          {...args}
          checked={selected === 'BEGINNER'}
          level="BEGINNER"
          value="BEGINNER"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'INTERMEDIATE'}
          level="INTERMEDIATE"
          value="INTERMEDIATE"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'ADVANCED'}
          level="ADVANCED"
          value="ADVANCED"
        />
      </RadioGroup>
    );
  },
};
