import { toast } from 'sonner';
import Share from '@/assets/icons/share.svg?react';
import { copyStringToClipboard } from '@/lib/utils';

export default function CopyUrlButton() {
  const handleClick = async () => {
    await copyStringToClipboard(window.location.href);
    toast.success('세션 URL 주소가 복사되었어요!');
  };

  return (
    <button type="button" aria-label="세션 링크 공유하기" onClick={handleClick}>
      <Share className="size-6 text-[#9CA3AF]" />
    </button>
  );
}
