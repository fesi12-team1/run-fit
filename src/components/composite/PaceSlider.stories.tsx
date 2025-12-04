import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import PaceSlider from './PaceSlider';

/**
 * PaceSlider 컴포넌트는 사용자가 달리기 페이스(분/킬로미터)를 조절할 수 있는 슬라이더입니다.
 */
const meta: Meta<typeof PaceSlider> = {
  title: 'UI/PaceSlider',
  component: PaceSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: '현재 페이스 값 (초 단위)',
      table: {
        category: 'State',
        type: { summary: 'number' }, // 타입 명시
      },
    },
    min: {
      control: 'number',
      type: { name: 'number', required: false },
      description: '최소값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240' },
      },
    },
    max: {
      control: 'number',
      type: { name: 'number', required: false },
      description: '최대값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '600' },
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
    defaultValue: {
      control: 'number',
      description: '초기값',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '420' },
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
    value: 420,
    min: 240,
    max: 600,
    step: 10,
    disabled: false,
    defaultValue: 420,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const onValueChange = (newValue: number) => {
      updateArgs({ value: newValue });
      args.onValueChange?.(newValue);
    };

    return <PaceSlider {...args} value={value} onValueChange={onValueChange} />;
  },
};
