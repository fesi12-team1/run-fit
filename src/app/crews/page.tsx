'use client';

import Share from '@/assets/icons/share.svg';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import Button from '@/components/ui/Button';

export default function Page() {
  // TODO: 추후 페이지 실제 구현시 사용
  const { ref, height } = useFixedBottomBar();
  const handleShare = () => {};
  const handleClick = () => {};

  return (
    <>
      <div
        className="tablet:mx-8 h-main mx-4 flex flex-col items-center gap-12"
        style={{ paddingBottom: height }}
      >
        <ul className="tablet:divide-y laptop:w-auto flex w-full flex-col divide-gray-700">
          {/* CrewCard */}
        </ul>
      </div>
      <FixedBottomBar ref={ref}>
        {/* TODO: button은 컴포넌트 구현 완료 후 실제 페이지 구현시 추후 수정 필요 */}
        <button
          type="button"
          aria-label="크루 링크 공유하기"
          onClick={handleShare}
        >
          <Share className="size-6 stroke-[#9CA3AF]" />
        </button>
        <Button
          type="button"
          className="bg-brand-500 text-body2-semibold flex-1 px-6 py-3"
          onClick={handleClick}
        >
          가입하기
        </Button>
      </FixedBottomBar>
    </>
  );
}
