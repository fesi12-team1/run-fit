import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Checkbox from '.';

/**
 * Checkbox 컴포넌트는 사용자가 선택하거나 선택 해제할 수 있는 UI 요소입니다.
 */

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rounded: {
      control: 'boolean',
      description: '원형 여부를 결정합니다.',
      defaultValue: false,
    },
    checked: {
      control: 'boolean',
      description: '체크박스의 체크 상태를 나타냅니다.',
      defaultValue: false,
    },
    defaultChecked: {
      control: 'boolean',
      description:
        '체크박스의 기본 체크 상태를 나타냅니다. 렌더링 시 최초 1회만 설정됩니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Checkbox 컴포넌트를 보여줍니다.
 */

export const Default: Story = {
  args: {
    checked: undefined,
    defaultChecked: false,
    rounded: false,
  },
};

/**
 * 체크된 상태의 Checkbox를 보여줍니다.
 */
export const Checked: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-4">
        <Checkbox defaultChecked />
        <Checkbox rounded defaultChecked />
      </div>
    );
  },
};

/**
 * 다양한 Checkbox 변형을 보여줍니다.
 */
export const Variants: Story = {
  render: () => {
    return (
      <div className="flex flex-wrap gap-4">
        <Checkbox />
        <Checkbox rounded />
        <Checkbox defaultChecked />
        <Checkbox rounded defaultChecked />
      </div>
    );
  },
};
