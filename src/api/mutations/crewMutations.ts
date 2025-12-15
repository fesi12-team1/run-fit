import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCrew,
  CrewRequestBody,
  delegateCrewLeader,
  deleteCrew,
  expelMember,
  updateCrewDetail,
  updateMemberRole,
  UpdateMemberRoleRequestBody,
} from '@/api/fetch/crews';
import { crewQueries } from '@/api/queries/crewQueries';

// 크루 생성
export function useCreateCrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCrew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화 (새 크루 목록에 반영)
    },
  });
}

// 크루 리더 위임
export function useDelegateCrewLeader(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { newLeaderId: number }) =>
      delegateCrewLeader(crewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
    },
  });
}

// 크루 삭제
export function useDeleteCrew() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crewId: number) => deleteCrew(crewId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crewQueries.all() }); // 크루 목록 캐시 무효화
    },
  });
}

// 크루 멤버 추방
export function useExpelMember(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => expelMember(crewId, userId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 목록 캐시 무효화
      });
    },
  });
}

// 크루 상세 정보 수정
export function useUpdateCrewDetail(crewId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CrewRequestBody) => updateCrewDetail(crewId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.detail(crewId).queryKey, // 크루 상세 정보 캐시 무효화
      });
      queryClient.invalidateQueries({ queryKey: crewQueries.lists() }); // 전체 크루 목록 캐시 무효화
    },
  });
}

// 멤버 역할 변경 (운영진 <-> 멤버)
export function useUpdateMemberRole(crewId: number, userId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateMemberRoleRequestBody) =>
      updateMemberRole(crewId, userId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: crewQueries.members(crewId).all(), // 크루 멤버 관련 캐시 초기화
      });
    },
  });
}
