import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Button from '.';

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
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-body2-semibold">Default Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="neutral">Neutral</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-body2-semibold">Small Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button size="sm" variant="default">
            Default
          </Button>
          <Button size="sm" variant="outlined">
            Outlined
          </Button>
          <Button size="sm" variant="neutral">
            Neutral
          </Button>
        </div>
      </div>
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
    <div className="flex flex-col gap-8">
      {(['default', 'outlined', 'neutral'] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="text-body2-semibold capitalize">{variant}</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant={variant}>Normal</Button>
            <Button disabled variant={variant}>
              Disabled
            </Button>
          </div>
          <p className="text-body3-regular text-gray-400">
            Hover, focus-visible, active states are interactive
          </p>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5v15m7.5-7.5h-15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          With Icon
        </Button>
        <Button size="sm">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5v15m7.5-7.5h-15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Small Icon
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5v15m7.5-7.5h-15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button size="sm">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4.5v15m7.5-7.5h-15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  ),
};
