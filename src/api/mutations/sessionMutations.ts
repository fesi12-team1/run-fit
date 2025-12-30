import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createSession,
  CreateSessionRequestBody,
  CreateSessionResponse,
  deleteSession,
  DeleteSessionResponse,
  registerForSession,
  RegisterForSessionResponse,
  unregisterFromSession,
  UnregisterFromSessionResponse,
  updateSessionDetail,
  UpdateSessionDetailRequestBody,
  UpdateSessionDetailResponse,
} from '@/api/fetch/sessions';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { ApiError } from '@/lib/error';

// 세션 생성
export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation<CreateSessionResponse, ApiError, CreateSessionRequestBody>(
    {
      mutationFn: createSession,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
        });
      },
    }
  );
}

// 세션 정보 수정
export function useUpdateSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateSessionDetailResponse,
    ApiError,
    UpdateSessionDetailRequestBody
  >({
    mutationFn: (body: UpdateSessionDetailRequestBody) =>
      updateSessionDetail(sessionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.lists(), // 세션 목록 캐시 무효화
      });
    },
  });
}

// 세션 참여
export function useRegisterSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation<RegisterForSessionResponse, ApiError, void>({
    mutationFn: () => registerForSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey, // 세션 참여자 목록 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
    },
  });
}

// 세션 참여 취소
export function useUnregisterSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation<UnregisterFromSessionResponse, ApiError, void>({
    mutationFn: () => unregisterFromSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sessionQueries.participants(sessionId).queryKey, // 세션 참여자 목록 캐시 무효화
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId).queryKey, // 세션 상세 캐시 무효화
      });
    },
  });
}

// 세션 삭제
export function useDeleteSession(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation<DeleteSessionResponse, ApiError, void>({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionQueries.lists() });
    },
  });
}
