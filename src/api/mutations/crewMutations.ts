import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createCrew,
  CrewMutationOptions,
  delegateCrewLeader,
  deleteCrew,
  expelMember,
  joinCrew,
  leaveCrew,
  updateCrewDetail,
  updateMemberRole,
  UpdateMemberRoleRequestBody,
} from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';

// 크루 생성
export function useCreateCrew(options?: CrewMutationOptions) {
  return useMutation({
    ...options,
    mutationFn: createCrew,
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
  options?: UseMutationOptions
) {
  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),
    ...options,
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
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
export function useExpelMember(crewId: number, options?: UseMutationOptions) {
  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),
    ...options,

    onSuccess: (_data, _variables, _onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
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
        //  options?.onSuccess?.(data, variables, onMutateResult, context);
      });
    },
  });
}

// 크루 탈퇴
export function useLeaveCrew(crewId: number, options?: UseMutationOptions) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => leaveCrew(crewId),
    ...options,

    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
        //  options?.onSuccess?.(data, variables, onMutateResult, context);
      });
      router.push('/crews');
    },
    onError: (error) => {
      console.error('크루 탈퇴 실패:', error);
      router.refresh(); // 현재 페이지 새로 고침
    },
  });
}

// 크루 상세 정보 수정
export function useUpdateCrewDetail(
  crewId?: number,
  options?: UseCrewMutationOptions
) {
  return useMutation({
    mutationFn: (body: CrewRequestBody & { id?: number }) => {
      const id = body.id ?? crewId;
      if (!id) {
        throw new Error('크루 ID가 필요합니다.');
      }
      return updateCrewDetail(id, body);
    },
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
    onError: (error: Error) => {
      options?.onError?.(error.message ?? '크루 수정에 실패했습니다.');
    },
  });
}

// 멤버 역할 변경 (운영진 <-> 멤버)
export function useUpdateMemberRole(
  crewId: number,
  options?: UseMutationOptions
) {
  return useMutation({
    mutationFn: ({
      userId,
      body,
    }: {
      userId: number;
      body: UpdateMemberRoleRequestBody;
    }) => updateMemberRole(crewId, userId, body),
    ...options,
    onSuccess: (data, variables, onMutateResult, context) => {
      context.client.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 관련 캐시 초기화
      });
    },
  });
}
