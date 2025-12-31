import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useLikeSession } from '@/api/mutations/likeMutations';
import { userQueries } from '@/api/queries/userQueries';
import HeartFill from '@/assets/icons/heart-fill.svg?react';
import HeartOutline from '@/assets/icons/heart-outline.svg?react';

interface LikeButtonProps {
  liked: boolean;
  sessionId: number;
}

export default function LikeButton({ liked, sessionId }: LikeButtonProps) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    ...userQueries.me.info(),
    retry: false,
  });

  const mutation = useLikeSession(sessionId);

  const handleClick = () => {
    mutation.mutate(liked, {
      onSuccess: () => {
        toast.success(
          liked
            ? '찜한 세션에서 제외되었습니다.'
            : '찜한 세션에 추가되었습니다.'
        );
      },
    });
  };

  return (
    <button onClick={handleClick} disabled={isLoading || isError || !user}>
      {liked ? (
        <HeartFill className="text-brand-500 block size-7" />
      ) : (
        <HeartOutline className="block size-7 text-[#9CA3AF]" />
      )}
    </button>
  );
}
