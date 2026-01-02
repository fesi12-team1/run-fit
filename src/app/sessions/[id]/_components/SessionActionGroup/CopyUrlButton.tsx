import { toast } from 'sonner';
import Share from '@/assets/icons/share.svg?react';
import { copyStringToClipboard } from '@/lib/utils';

export default function CopyUrlButton() {
  const handleClick = async () => {
    await copyStringToClipboard(window.location.href);
    toast.success('세션 URL이 복사되었습니다.');
  };

  return (
    <button onClick={handleClick}>
      <Share className="size-6 text-[#9CA3AF]" />
    </button>
  );
}
