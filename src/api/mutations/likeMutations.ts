import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteLikeSession, postLikeSession } from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';

// 세션 찜/취소
export function useLikeSession(options?: UseMutationOptions) {
  return useMutation({
    mutationFn: ({
      sessionId,
      liked,
    }: {
      sessionId: number;
      liked: boolean;
    }) => (liked ? deleteLikeSession(sessionId) : postLikeSession(sessionId)),
    ...options,
    onMutate: async ({ sessionId, liked }, context) => {
      await context.client.cancelQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      const previousSessionData = context.client.getQueryData(
        sessionQueries.detail(sessionId).queryKey
      );

      if (previousSessionData) {
        context.client.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              liked: !liked,
            };
          }
        );
      }

      return { previousSessionData };
    },

    onError: (_err, variables, onMutateResult, context) => {
      const sessionId = variables.sessionId;

      if (onMutateResult?.previousSessionData) {
        context.client.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          onMutateResult.previousSessionData
        );
      }
    },

    onSettled: (_data, _error, variables, _onMutateResult, context) => {
      const sessionId = variables.sessionId;

      context.client.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey,
      });
      context.client.invalidateQueries({
        queryKey: sessionQueries.lists(),
      });
      context.client.invalidateQueries({
        queryKey: userQueries.me.likeAll(),
      });
    },
  });
}
