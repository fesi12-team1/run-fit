import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'storybook/internal/preview-api';
import TimePicker from '.';

/**
 * TimePicker 컴포넌트는 사용자가 시간을 선택할 수 있는 입력 필드입니다.
 */

const meta: Meta<typeof TimePicker> = {
  title: 'UI/TimePicker',
  component: TimePicker,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <TimePicker value={value} onChange={setValue} />;
  },
};
