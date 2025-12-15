import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Modal from '.';
import Button from '../Button';

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

/**
 * 기본 모달 - 항상 열려있는 상태로 표시됩니다.
 */
export const Default: Story = {
  render: () => {
    return (
      <Modal open={true}>
        <Modal.Content className="tablet:w-[360px] w-[300px]">
          <Modal.Header>
            <Modal.Title>모달 제목</Modal.Title>
          </Modal.Header>
          <Modal.CloseButton />
          <Modal.Description>모달의 기본 형태입니다.</Modal.Description>
          <Modal.Footer>
            <div className="flex items-center">
              <Button>취소</Button>
              <Button>확인</Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};

/**
 * Uncontrolled 방식 - Modal이 내부적으로 상태를 관리합니다.
 * Modal.Trigger를 클릭하면 자동으로 열리고 닫힙니다.
 */
export const Uncontrolled: Story = {
  render: () => {
    return (
      <Modal>
        <Modal.Trigger asChild>
          <Button>모달 열기</Button>
        </Modal.Trigger>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Uncontrolled 모달</Modal.Title>
          </Modal.Header>
          <Modal.CloseButton />
          <Modal.Description>
            모달의 상태를 직접 관리하지 않고, Trigger 버튼을 통해 자동으로 열고
            닫을 수 있습니다.
          </Modal.Description>
          <Modal.Footer>
            <Modal.Close asChild>
              <Button>닫기</Button>
            </Modal.Close>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
};

/**
 * Controlled 방식 - useState로 open 상태를 직접 제어합니다.
 * 버튼 클릭 시 추가 로직을 실행할 수 있습니다.
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleCancel = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
      setOpen(false);
    };

    return (
      <div>
        <div className="h-100">상태: {open ? '열림' : '닫힘'}</div>
        <Button onClick={() => setOpen(true)}>모달 열기</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Controlled 모달</Modal.Title>
            </Modal.Header>
            <Modal.CloseButton />
            <Modal.Description>
              open 상태를 직접 제어하여 버튼 클릭 시 추가 로직을 실행할 수
              있습니다.
            </Modal.Description>
            <Modal.Footer>
              <div className="flex items-center">
                <Button onClick={handleCancel}>취소</Button>
                <Button onClick={handleConfirm}>확인</Button>
              </div>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    );
  },
};
