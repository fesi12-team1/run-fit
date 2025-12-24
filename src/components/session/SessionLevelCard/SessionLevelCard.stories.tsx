import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
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
    const [checked, setChecked] = useState(args.checked ?? false);

    return (
      <SessionLevelCard
        {...args}
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    );
  },
};

/**
 * 체크된 상태
 */
export const Checked: Story = {
  args: { checked: true },
  render: (args) => <SessionLevelCard {...args} />,
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <SessionLevelCard {...args} />,
};

/**
 * 리스트 예시
 */
export const LevelList: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex w-[327px] flex-col gap-4">
        <SessionLevelCard
          {...args}
          checked={selected === 'beginner'}
          onClick={() =>
            setSelected(selected === 'beginner' ? null : 'beginner')
          }
          level="BEGINNER"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'intermediate'}
          onClick={() =>
            setSelected(selected === 'intermediate' ? null : 'intermediate')
          }
          level="INTERMEDIATE"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'advanced'}
          onClick={() =>
            setSelected(selected === 'advanced' ? null : 'advanced')
          }
          level="ADVANCED"
        />
      </div>
    );
  },
};
