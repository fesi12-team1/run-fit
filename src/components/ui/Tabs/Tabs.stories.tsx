import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from '.';

/**
 * 탭은 관련 콘텐츠를 그룹화하고 사용자가 한 번에 하나의 콘텐츠 섹션을 표시할 수 있도록 하는 UI 구성 요소입니다.
 */

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="1" className="w-full">
      <Tabs.List>
        <Tabs.Trigger value="1">탭</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  ),
};

export const MultipleTabs: Story = {
  render: () => (
    <Tabs defaultValue="1" className="w-full">
      <Tabs.List>
        <Tabs.Trigger value="1">My 홈</Tabs.Trigger>
        <Tabs.Trigger value="2">참여 세션</Tabs.Trigger>
        <Tabs.Trigger value="3">나의 리뷰</Tabs.Trigger>
        <Tabs.Trigger value="4">소속 크루</Tabs.Trigger>
        <Tabs.Trigger value="5">세션 관리</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  ),
};

export const WithContents: Story = {
  render: () => (
    <Tabs defaultValue="1" className="w-full">
      <Tabs.List>
        <Tabs.Trigger value="1">상세정보</Tabs.Trigger>
        <Tabs.Trigger value="2">모집중인 세션</Tabs.Trigger>
        <Tabs.Trigger value="3">후기</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1" className="text-white">
        <h2>크루 소개</h2>
        <p>
          모임에 대한 상세 설명입니다. 1000자 이내로 작성해주세요. 모임에 대한
          상세 설명입니다. 1000자 이내로 작성해주세요. 모임에 대한 상세
          설명입니다. 1000자 이내로 작성해주세요. 모임에 대한 상세 설명입니다.
          1000자 이내로 작성해주세요. 모임에 대한 상세 설명입니다. 1000자 이내로
          작성해주세요. 모임에 대한 상세 설명입니다. 1000자 이내로 작성해주세요.
        </p>
      </Tabs.Content>
      <Tabs.Content value="2" className="text-white">
        <h2>모집중인 세션</h2>
        <p>모집중인 세션</p>
      </Tabs.Content>
      <Tabs.Content value="3" className="text-white">
        <h2>후기</h2>
        <p>후기</p>
      </Tabs.Content>
    </Tabs>
  ),
};
