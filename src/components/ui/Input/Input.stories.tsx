import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Input from '.';

/**
 * Input 컴포넌트는 단일 라인의 텍스트를 입력하는 필드를 제공합니다.
 * 상태(기본, 비활성화, 에러)와 확장 기능(비밀번호 보기/숨기기, 아이콘)을 지원합니다.
 */
const meta: Meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 Input */
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

/** Normal / Disabled / Invalid 상태 모음 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input placeholder="Normal" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" aria-invalid />
    </div>
  ),
};

/** Large / Small 크기 모음 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="lg" placeholder="Large Size" />
      <Input size="sm" placeholder="Small Size" />
    </div>
  ),
};

/** 비밀번호 입력 필드 */
export const Password: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');

    return (
      <Input
        type={show ? 'text' : 'password'}
        placeholder="비밀번호 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        RightElement={
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
    );
  },
};

/** 아이콘이 포함된 Input */
export const WithIcon: Story = {
  args: {
    placeholder: '날짜를 입력하세요',
    RightElement: <Calendar className="size-4" />,
  },
};
