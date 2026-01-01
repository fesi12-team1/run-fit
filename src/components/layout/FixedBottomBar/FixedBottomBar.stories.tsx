import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Share from '@/assets/icons/share.svg?react';
import Button from '@/components/ui/Button';
import FixedBottomBar from '.';

/**
 *
 * 태블릿 이하 사이즈에서 크루 가입 및 세션 참여 등을 위한 고정 하단 바 컴포넌트입니다.
 */
const meta: Meta<typeof FixedBottomBar> = {
  title: 'layout/FixedBottomBar',
  component: FixedBottomBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: false },
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof FixedBottomBar>;

/**
 * 크루 가입 버튼이 포함된 기본 고정 하단 바입니다.
 * 모바일/태블릿 환경에서만 표시됩니다.
 */
export const Default: Story = {
  render: () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold">페이지 콘텐츠</h1>
          <p>스크롤하여 고정 하단 바를 확인하세요.</p>
        </div>
        <FixedBottomBar>
          <div className="flex gap-7">
            <button aria-label="크루 링크 공유하기" type="button">
              <Share className="size-6 stroke-[#9CA3AF]" />
            </button>
            <Button
              className="bg-brand-500 text-body2-semibold flex-1 px-6 py-3"
              type="button"
            >
              가입하기
            </Button>
          </div>
        </FixedBottomBar>
      </>
    );
  },
};

/**
 * 세션 참여 버튼이 포함된 고정 하단 바입니다.
 */
export const SessionJoin: Story = {
  render: () => {
    return (
      <>
        <div className="flex flex-col items-center justify-center p-6">
          <h1 className="text-3xl font-bold">세션 상세 페이지</h1>
          <p>세션에 참여하려면 아래 버튼을 클릭하세요.</p>
        </div>
        <FixedBottomBar>
          <Button
            className="bg-brand-500 text-body2-semibold w-full px-6 py-3"
            type="button"
          >
            세션 참여하기
          </Button>
        </FixedBottomBar>
      </>
    );
  },
};
