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
      options: ['default', 'outlined', 'neutral', 'ghost'],
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
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-body2-semibold">Small Size</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default" size="sm">
            Default
          </Button>
          <Button variant="outlined" size="sm">
            Outlined
          </Button>
          <Button variant="neutral" size="sm">
            Neutral
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
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
      {(['default', 'outlined', 'neutral', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <h3 className="text-body2-semibold capitalize">{variant}</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant={variant}>Normal</Button>
            <Button variant={variant} disabled>
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
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          With Icon
        </Button>
        <Button size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Small Icon
        </Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
        <Button size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>
    </div>
  ),
};
