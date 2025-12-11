import { Meta } from '@storybook/nextjs-vite';
import DatePicker from './DatePicker';

const meta: Meta = {
  title: 'Composite/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
      description: '날짜를 선택하는 입력 필드입니다.',
    },
  },
  args: {
    label: '모임 날짜',
    placeholder: '날짜를 입력하세요',
  },
};

export default meta;
type Story = Meta<typeof DatePicker>;

export const Default: Story = {
  args: {
    label: '모임 날짜',
    placeholder: '모임 날짜를 선택하세요',
  },
  render: (args) => <DatePicker {...args} />,
};

/**
 * 여러 DatePicker 컴포넌트를 세로로 배치한 스토리입니다.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <DatePicker
        //   mode="single"
        /**
         * TO-DO:
         * - 컴파운드 패턴 Calendar 컴포넌트 merge 후, 해당 스토리 업데이트 필요
         * - Popover -> Input 이벤트 전파 문제 해결 필요
         */
        label="모임 날짜"
        placeholder="모임 날짜를 선택하세요"
      />
      <DatePicker
        //   mode="range"
        label="마감 날짜"
        placeholder="마감 날짜를 선택하세요"
      />
    </div>
  ),
};
