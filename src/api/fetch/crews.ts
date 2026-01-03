import { buildQueryParams } from '@/lib/utils';
import {
  Crew,
  CrewListFilters,
  CrewMember,
  CrewMemberRoleData,
  MemberRoleFilters,
  PageData,
  PaginationQueryParams,
  Review,
  Role,
  SliceData,
} from '@/types';
import request from './request';

export type CrewRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export async function createCrew(body: CrewRequestBody) {
  return request<Crew>('/api/crews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

type JoinCrewResponse = {
  crewId: number;
  userId: number;
  role: 'MEMBER';
  joinedAt: string;
};
export async function joinCrew(crewId: number) {
  return request<JoinCrewResponse>(`/api/crews/${crewId}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
}

export type GetCrewsResponse = SliceData<Crew>;
export async function getCrews(queryParams?: CrewListFilters) {
  const searchParams = buildQueryParams<CrewListFilters>(queryParams);
  const queryString = searchParams.toString();

  return request<GetCrewsResponse>(`/api/crews?${queryString}`);
}

export type GetCrewDetailResponse = Crew;
export async function getCrewDetail(crewId: number) {
  return request<GetCrewDetailResponse>(`/api/crews/${crewId}`);
}

export type GetCrewMembersResponse = { members: CrewMember[] };
export async function getCrewMembers(
  crewId: number,
  queryParams?: MemberRoleFilters
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  return request<GetCrewMembersResponse>(
    `/api/crews/${crewId}/members?${query}`
  );
}

export type GetCrewMemberCountResponse = {
  leaderCount: number;
  staffCount: number;
  memberCount: number;
};
export async function getCrewMemberCount(crewId: number) {
  return request<GetCrewMemberCountResponse>(
    `/api/crews/${crewId}/members/count`
  );
}

export type GetCrewMemberDetailByIdResponse = CrewMemberRoleData;
export async function getCrewMemberDetailById(crewId: number, userId: number) {
  return request<GetCrewMemberDetailByIdResponse>(
    `/api/crews/${crewId}/members/${userId}/role`
  );
}

export type DelegateCrewLeaderRequestBody = {
  newLeaderId: CrewMember['userId'];
};
export type DelegateCrewLeaderResponse = {
  message: '크루장이 변경되었습니다.';
  oldLeaderId: number;
  newLeaderId: number;
};

export async function delegateCrewLeader(
  crewId: number,
  body: DelegateCrewLeaderRequestBody
) {
  return request<DelegateCrewLeaderResponse>(`/api/crews/${crewId}/leader`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export type UpdateMemberRoleRequestBody = {
  role: Exclude<Role, 'LEADER'>;
};

export type UpdateMemberRoleResponse =
  | {
      userId: number;
      previousRole: 'MEMBER';
      newRole: 'STAFF';
      message: '운영진으로 등록되었습니다.';
    }
  | {
      userId: number;
      previousRole: 'STAFF';
      newRole: 'MEMBER';
      message: '운영진에서 해제되었습니다.';
    };

export async function updateMemberRole(
  crewId: number,
  userId: number,
  body: UpdateMemberRoleRequestBody
) {
  return request<UpdateMemberRoleResponse>(
    `/api/crews/${crewId}/members/${userId}/role`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
}

export type LeaveCrewResponse = { message: string };
export async function leaveCrew(crewId: number) {
  return request<LeaveCrewResponse>(`/api/crews/${crewId}/leave`, {
    method: 'DELETE',
  });
}

export type ExpelMemberResponse = { message: string; userId: number };
export async function expelMember(crewId: number, userId: number) {
  return request<ExpelMemberResponse>(
    `/api/crews/${crewId}/members/${userId}`,
    {
      method: 'DELETE',
    }
  );
}

export type UpdateCrewDetailRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export type UpdateCrewDetailResponse = Crew;
export async function updateCrewDetail(
  crewId: number,
  body: UpdateCrewDetailRequestBody
) {
  return request<UpdateCrewDetailResponse>(`/api/crews/${crewId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export type DeleteCrewResponse = { message: string };
export async function deleteCrew(crewId: number) {
  return request<DeleteCrewResponse>(`/api/crews/${crewId}`, {
    method: 'DELETE',
  });
}

export type GetCrewReviewsItem = Review & { sessionName: string };
export type GetCrewReviewsResponse = PageData<GetCrewReviewsItem>;
export async function getCrewReviews(
  crewId: number,
  queryParams?: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();

  return request<GetCrewReviewsResponse>(
    `/api/crews/${crewId}/reviews?${query}`
  );
}
