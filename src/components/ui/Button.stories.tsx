import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Star from '@/assets/icons/star.svg?react';
import Button from './Button';

/**
 * 버튼은 사용자가 클릭하여 작업을 수행하거나 다른 페이지로 이동할 수 있는 클릭 가능한 요소입니다.
 */

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="neutral">
        Neutral
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Button',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
