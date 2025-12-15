import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import Rating from '.';

/**
 * Rating 컴포넌트는 별 아이콘을 통해 점수를 선택할 수 있는 UI 컴포넌트입니다.
 */
const meta: Meta<typeof Rating> = {
  title: 'UI/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: '현재 선택된 별점 값',
      table: {
        category: 'State',
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    max: {
      control: 'number',
      description: '최대 별점 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    size: {
      control: 'number',
      description: '별 아이콘 크기(px)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '16' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center rounded-xl bg-black p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3,
    max: 5,
    size: 30,
    disabled: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (newValue: number) => {
      updateArgs({ value: newValue });
      args.onChange?.(newValue);
    };

    return <Rating {...args} value={value} onChange={handleChange} />;
  },
};
