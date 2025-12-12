import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import DatePicker, { type DatePickerProps } from '.';

const exampleDate = new Date('2025-12-25');

/**
 * DatePicker 컴포넌트는 사용자가 날짜를 선택할 수 있는 UI 요소입니다.
 *
 * 기본적으로 버튼을 클릭하면 팝오버 형태로 캘린더가 표시되며, 사용자는 원하는 날짜를 선택할 수 있습니다.
 * inline 모드를 활성화하면 캘린더가 항상 표시되어 폼 화면에서 바로 날짜를 선택할 수 있습니다.
 */

const meta: Meta<typeof DatePicker> = {
  title: 'composite/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: undefined,
    label: '날짜',
    inline: false,
  },
  argTypes: {
    value: {
      control: 'date',
      description: '선택된 날짜 값',
    },
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
    },
    inline: {
      control: 'boolean',
      description: '캘린더 inline 모드 여부',
    },
    onChange: {
      action: 'onChange',
      description: '선택된 날짜가 변경될 때 실행되는 콜백',
    },
  },
};

export default meta;
type Story = StoryObj<DatePickerProps>;

/**
 * 기본(DatePicker + Popover)
 */
export const Default: Story = {
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(next) => updateArgs({ value: next })}
      />
    );
  },
};

/**
 * 비활성(disabled) 상태
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(next) => updateArgs({ value: next })}
      />
    );
  },
};

/**
 * 초기값 있는 경우
 */
export const InitialValue: Story = {
  args: {
    value: exampleDate,
  },
  render: (args) => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <DatePicker
        {...args}
        value={value}
        onChange={(next) => updateArgs({ value: next })}
      />
    );
  },
};

/**
 * Inline 모드
 */
export const Inline: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return <DatePicker value={value} inline onChange={setValue} />;
  },
};

/**
 * Inline Label 모드
 */
export const InlineLabel: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        inline
        onChange={setValue}
        captionLayout="label"
      />
    );
  },
};

/**
 * Inline Label Disabled 모드
 */
export const InlineLabelDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | undefined>(undefined);
    return (
      <DatePicker
        value={value}
        inline
        onChange={setValue}
        captionLayout="label"
        disabled
      />
    );
  },
};
