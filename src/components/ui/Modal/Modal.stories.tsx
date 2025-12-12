import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Modal from '.';

/**
 * 모달은 사용자의 주의를 끌고 특정 작업을 수행하거나 정보를 표시하는 다이얼로그 컴포넌트입니다.
 */

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    return (
      <Modal open={true}>
        <Modal.Content className="rounded-3xl border border-gray-700 bg-gray-800 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.2)]">
          <Modal.Header>
            <Modal.Title>모달 제목</Modal.Title>
          </Modal.Header>
          <Modal.Close />
          <Modal.Description>모달 내용입니다.</Modal.Description>
          <Modal.Footer>푸터 영역</Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};
