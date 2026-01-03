import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  createCrew,
  CrewRequestBody,
  delegateCrewLeader,
  DelegateCrewLeaderRequestBody,
  DelegateCrewLeaderResponse,
  deleteCrew,
  expelMember,
  ExpelMemberResponse,
  joinCrew,
  leaveCrew,
  updateCrewDetail,
  UpdateCrewDetailRequestBody,
  UpdateCrewDetailResponse,
  updateMemberRole,
  UpdateMemberRoleRequestBody,
  UpdateMemberRoleResponse,
} from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';
import { ApiError } from '@/lib/error';
import { Crew } from '@/types';

// 크루 생성
export function useCreateCrew(
  options?: UseMutationOptions<
    Crew, // TData = unknown,
    ApiError, // TError = DefaultError,
    CrewRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: createCrew,
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화 (새 크루 목록에 반영)
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 크루 리더 위임
export function useDelegateCrewLeader(
  crewId: number,
  options?: UseMutationOptions<
    DelegateCrewLeaderResponse, // TData = unknown,
    ApiError, // TError = DefaultError,
    DelegateCrewLeaderRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// 크루 삭제
export function useDeleteCrew(crewId: number, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: () => deleteCrew(crewId),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      console.error('크루 삭제 실패:', error);
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 크루 멤버 추방
export function useExpelMember(
  crewId: number,
  options?: UseMutationOptions<
    ExpelMemberResponse, // TData = unknown,
    ApiError, // TError = DefaultError,
    number // TVariables = userId,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// 크루 가입
export function useJoinCrew(crewId: number, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: () => joinCrew(crewId),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}

// 크루 탈퇴
export function useLeaveCrew(crewId: number, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: () => leaveCrew(crewId),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      console.error('크루 탈퇴 실패:', error);
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 크루 상세 정보 수정
export function useUpdateCrewDetail(
  crewId: number,
  options?: UseMutationOptions<
    UpdateCrewDetailResponse, // TData = unknown,
    ApiError, // TError = DefaultError,
    UpdateCrewDetailRequestBody // TVariables = void,
    // TOnMutateResult = unknown
  >
) {
  return useMutation({
    mutationFn: (body) => updateCrewDetail(crewId, body),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      if (crewId) {
        context.client.invalidateQueries({
          queryKey: crewQueries.detail(crewId).queryKey,
        });
      }
      context.client.invalidateQueries({ queryKey: crewQueries.lists() });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error, variables, onMutateResult, context) => {
      options?.onError?.(error, variables, onMutateResult, context);
    },
  });
}

// 멤버 역할 변경 (운영진 <-> 멤버)
export function useUpdateMemberRole(
  crewId: number,
  options?: UseMutationOptions<
    UpdateMemberRoleResponse,
    ApiError,
    { userId: number; body: UpdateMemberRoleRequestBody }
  >
) {
  return useMutation({
    mutationFn: ({ userId, body }) => updateMemberRole(crewId, userId, body),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 관련 캐시 초기화
      });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
  });
}
