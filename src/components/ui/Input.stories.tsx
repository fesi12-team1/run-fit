import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Calendar, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import Input, { InputProps } from './Input';

/**
 * Input 컴포넌트 Storybook 문서
 * 상태별 시각적 스타일 확인을 위한 스토리 정의
 */

const meta: Meta<InputProps> = {
  title: 'ui/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text', description: '입력 필드 라벨' },
    placeholder: { control: 'text', description: 'placeholder 텍스트' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: '입력 필드 타입',
      defaultValue: 'text',
    },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    onChange: { action: 'onChange' },
    size: {
      control: { type: 'radio' },
      options: ['md', 'sm'],
      description: '라벨 사이즈',
    },
  },
};

export default meta;
type Story = StoryObj<InputProps>;

/**
 * 기본 입력 필드
 */
export const Default: Story = {
  args: {
    label: '타이틀',
    placeholder: '텍스트를 입력하세요',
    type: 'text',
  },
};

/**
 * 작은 크기 입력 필드
 */
export const Small: Story = {
  args: {
    label: '작은 인풋',
    placeholder: '텍스트를 입력하세요',
    type: 'text',
    size: 'sm',
  },
};

/**
 * 포커스된 입력 필드. 새로고침 시 자동 포커스(autoFocus)가 적용됩니다.
 */
export const Active: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="이메일"
        placeholder="email@example.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={true}
      />
    );
  },
};

/**
 * 초기값이 설정된 입력 필드
 */
export const InitialValue: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임 입력',
    type: 'text',
    value: '사용자123',
    readOnly: true,
  },
};

/**
 * 비밀번호 입력 필드. 아이콘을 클릭하여 비밀번호 표시/숨기기 가능
 */
export const Password: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    type: 'password',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);

    return (
      <Input
        {...args}
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        Icon={
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? '비밀번호 숨기기' : '비밀번호 보기'}
            className="text-gray-300 hover:text-white"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        }
      />
    );
  },
};

/**
 * 비활성화된 입력 필드
 */
export const Disabled: Story = {
  args: {
    label: '사용 불가 필드',
    placeholder: '텍스트 입력 불가',
    disabled: true,
  },
};

/**
 * 에러 상태 1: 필수 입력 값이 비어있는 경우
 */
export const ErrorRequired: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    const hasError = value.length === 0;
    return (
      <Input
        {...args}
        label="이메일"
        placeholder="이메일을 입력하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-invalid={hasError}
        errorMessage="필수 입력 값입니다"
      />
    );
  },
};

/**
 * 에러 상태 2: 잘못된 형식의 입력 값인 경우
 */
export const ErrorInvalid: Story = {
  render: (args) => {
    return (
      <Input
        {...args}
        label="이메일"
        value="wrong-email"
        aria-invalid="true"
        errorMessage="올바른 이메일 형식이 아닙니다"
      />
    );
  },
};

/**
 * 아이콘이 포함된 입력 필드
 */

export const WithIcons: Story = {
  args: {
    label: '날짜',
    placeholder: '날짜를 입력하세요',
    Icon: <Calendar />,
  },
};
