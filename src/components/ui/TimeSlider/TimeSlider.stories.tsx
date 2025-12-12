import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import TimeSlider from '.';

/**
 * TimeSlider 컴포넌트는 하루 중 사용자가 원하는 시간을 조절할 수 있는 슬라이더입니다.
 */
const meta: Meta<typeof TimeSlider> = {
  title: 'UI/TimeSlider',
  component: TimeSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'object',
      description: '현재 선택된 시간 범위 (분 단위)',
      table: {
        category: 'State',
        type: { summary: 'number[]' },
        defaultValue: { summary: '[360, 1080]' },
      },
    },
    step: {
      control: 'number',
      type: { name: 'number', required: false },
      description: '증감 단위',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '슬라이더 비활성화 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-[600px] items-center justify-center rounded-xl bg-black p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: [360, 1080],
    step: 10,
    disabled: false,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onValueChange = (newValue: [number, number]) => {
      updateArgs({ value: newValue });
      args.onValueChange?.(newValue);
    };

    return <TimeSlider {...args} value={value} onValueChange={onValueChange} />;
  },
};
