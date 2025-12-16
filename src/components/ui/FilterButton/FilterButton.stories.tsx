import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useArgs } from 'storybook/preview-api';
import FilterButton from '.';

/**
 * FilterButton 컴포넌트는 필터 버튼을 표시하며,
 * 적용된 필터 개수(count)에 따라 활성 상태와 뱃지를 표시합니다.
 */
const meta: Meta<typeof FilterButton> = {
  title: 'UI/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: '적용된 필터 개수',
      table: {
        category: 'State',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 호출되는 핸들러',
      table: {
        category: 'Event',
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
  },
  render: function Render(args) {
    const [{ count }, updateArgs] = useArgs();

    const handleClick = () => {
      updateArgs({ count: count + 1 });
      args.onClick?.();
    };

    return <FilterButton {...args} count={count} onClick={handleClick} />;
  },
};
