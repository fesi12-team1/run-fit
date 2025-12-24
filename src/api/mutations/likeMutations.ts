import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLikeSession, postLikeSession } from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';

// 세션 찜/취소
export function useLikeSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isLiked: boolean) =>
      isLiked ? deleteLikeSession(sessionId) : postLikeSession(sessionId),

    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      const previousSessionData = queryClient.getQueryData(
        sessionQueries.detail(sessionId).queryKey
      );

      if (previousSessionData) {
        queryClient.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              liked: !isLiked,
            };
          }
        );
      }

      return { previousSessionData };
    },

    onError: (_err, _isLiked, context) => {
      if (context?.previousSessionData) {
        queryClient.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          context.previousSessionData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: userQueries.me.likeAll(),
      });
    },
  });
}
