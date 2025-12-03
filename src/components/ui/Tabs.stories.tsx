import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from './Tabs';

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
    <div className="w-vw flex flex-col items-center gap-20">
      <Tabs defaultValue="1" className="w-25">
        <Tabs.TabsList>
          <Tabs.TabsTrigger value="1">탭</Tabs.TabsTrigger>
        </Tabs.TabsList>
      </Tabs>
      <Tabs defaultValue="1" className="w-full">
        <Tabs.TabsList>
          <Tabs.TabsTrigger value="1">상세정보</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="2">모집중인 세션</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="3">후기</Tabs.TabsTrigger>
        </Tabs.TabsList>
      </Tabs>
      <Tabs defaultValue="1">
        <Tabs.TabsList className="w-[600px]">
          <Tabs.TabsTrigger value="1">My 홈</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="2">참여 세션</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="3">나의 리뷰</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="4">소속 크루</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="5">세션 관리</Tabs.TabsTrigger>
        </Tabs.TabsList>
      </Tabs>
    </div>
  ),
};

export const WithContents: Story = {
  render: () => (
    <div className="w-vw">
      <Tabs defaultValue="1" className="w-full">
        <Tabs.TabsList>
          <Tabs.TabsTrigger value="1">상세정보</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="2">모집중인 세션</Tabs.TabsTrigger>
          <Tabs.TabsTrigger value="3">후기</Tabs.TabsTrigger>
        </Tabs.TabsList>
        <Tabs.TabsContent value="1" className="text-white">
          <h2>크루 소개</h2>
          <p>
            모임에 대한 상세 설명입니다. 1000자 이내로 작성해주세요. 모임에 대한
            상세 설명입니다. 1000자 이내로 작성해주세요. 모임에 대한 상세
            설명입니다. 1000자 이내로 작성해주세요. 모임에 대한 상세 설명입니다.
            1000자 이내로 작성해주세요. 모임에 대한 상세 설명입니다. 1000자
            이내로 작성해주세요. 모임에 대한 상세 설명입니다. 1000자 이내로
            작성해주세요.
          </p>
        </Tabs.TabsContent>
        <Tabs.TabsContent value="2" className="text-white">
          <h2>모집중인 세션</h2>
          <p>모집중인 세션</p>
        </Tabs.TabsContent>
        <Tabs.TabsContent value="3" className="text-white">
          <h2>후기</h2>
          <p>후기</p>
        </Tabs.TabsContent>
      </Tabs>
    </div>
  ),
};
