'use client';

import { toast } from 'sonner';
import { useLikeSession } from '@/api/mutations/likeMutations';
import HeartFill from '@/assets/icons/heart-fill.svg?react';
import HeartOutline from '@/assets/icons/heart-outline.svg?react';
import { signInModal } from '@/store/signinModal';

interface LikeButtonProps {
  liked: boolean;
  sessionId: number;
}

export default function LikeButton({ liked, sessionId }: LikeButtonProps) {
  const { handleClick } = useLikeButton();

  return (
    <>
      <button onClick={() => handleClick(sessionId, liked)} type="button">
        {liked ? (
          <HeartFill className="text-brand-500 block size-7" />
        ) : (
          <HeartOutline className="block size-7 fill-[#0F101480] stroke-[#9CA3AF]" />
        )}
      </button>
    </>
  );
}

export const useLikeButton = () => {
  const mutation = useLikeSession();

  const handleClick = (sessionId: number, liked: boolean) => {
    mutation.mutate(
      { sessionId, liked },
      {
        onSuccess: () => {
          toast.success(
            liked
              ? '찜한 세션에서 제외되었습니다.'
              : '찜한 세션에 추가되었습니다.'
          );
        },

        onError: (error) => {
          const status = error.status;
          const code = error.code;
          const message = error.message;

          if (status === '401' || code === 'UNAUTHORIZED') {
            signInModal.open();
            return;
          }

          if (code === 'ALREADY_LIKED_SESSION') {
            toast.error(message || '이미 찜한 세션입니다.');
            return;
          }

          if (code === 'SESSION_LIKE_NOT_FOUND') {
            toast.error(message || '찜한 세션을 찾을 수 없습니다.');
            return;
          }

          toast.error(
            '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        },
      }
    );
  };

  return { handleClick };
};
