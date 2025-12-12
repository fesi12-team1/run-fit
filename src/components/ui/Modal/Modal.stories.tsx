import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from '.';

/**
 * 버튼은 사용자가 클릭하여 작업을 수행하거나 다른 페이지로 이동할 수 있는 클릭 가능한 요소입니다.
 */

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Modal',
  },
};
