import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  deleteLikeSession,
  LikeSessionResponse,
  postLikeSession,
  UnlikeSessionResponse,
} from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { userQueries } from '@/api/queries/userQueries';
import { ApiError } from '@/lib/error';

// 세션 찜/취소
export function useLikeSession(
  options?: UseMutationOptions<
    LikeSessionResponse | UnlikeSessionResponse, // TData = unknown,
    ApiError, // TError = DefaultError,
    { sessionId: number; liked: boolean } // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
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

      options?.onMutate?.({ sessionId, liked }, context);

      return { previousSessionData };
    },

    onError: (error, variables, onMutateResult, context) => {
      const sessionId = variables.sessionId;

      if (onMutateResult?.previousSessionData) {
        context.client.setQueryData(
          sessionQueries.detail(sessionId).queryKey,
          onMutateResult.previousSessionData
        );
      }

      options?.onError?.(error, variables, onMutateResult, context);
    },

    onSettled: (data, error, variables, onMutateResult, context) => {
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

      options?.onSettled?.(data, error, variables, onMutateResult, context);
    },
  });
}
