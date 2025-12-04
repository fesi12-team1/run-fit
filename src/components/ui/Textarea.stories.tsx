import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Textarea from './Textarea';

/**
 * Textarea 컴포넌트는 사용자가 여러 줄의 텍스트를 입력할 수 있는 입력 필드입니다.
 */

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea placeholder="소개글을 작성해주세요." />,
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="Normal" />
      <Textarea disabled placeholder="Disabled" />
      <Textarea aria-invalid placeholder="Invalid" />
    </div>
  ),
};
