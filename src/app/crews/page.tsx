'use client';

import Share from '@/assets/icons/share.svg';
import FixedBottomBar, {
  useFixedBottomBar,
} from '@/components/layout/FixedBottomBar';
import Button from '@/components/ui/Button';

export default function Page() {
  const { ref, height } = useFixedBottomBar();
  // TODO: 추후 페이지 실제 구현시 사용
  const handleShare = () => {};
  const handleClick = () => {};

  return (
    <>
      {process.env.NODE_ENV === 'development' && (
        <div>
          <span className="tablet:hidden text-white">mobile</span>
          <span className="tablet:inline-flex laptop:hidden hidden text-white">
            tablet
          </span>
          <span className="laptop:inline-flex hidden text-white">laptop</span>
        </div>
      )}
      <div
        className="tablet:mx-8 laptop:mx-100 h-main mx-4 flex flex-col items-center gap-12"
        style={{ paddingBottom: height }}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index}>
            {index + 1}. Eu eu proident excepteur exercitation reprehenderit
            fugiat deserunt commodo anim qui et consequat. Lorem sunt veniam
            esse aliquip proident tempor elit tempor aliqua. Dolore occaecat in
            culpa culpa consequat laborum nisi elit est nisi.
          </div>
        ))}
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
