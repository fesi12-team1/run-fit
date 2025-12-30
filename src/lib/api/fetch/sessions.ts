import {
  CrewMember,
  MemberRoleFilters,
  Session,
  SessionListFilters,
  SliceData,
} from '@/types';
import request from './request';

export type GetSessionsResponse = SliceData<Session>;
export async function getSessions(queryParams?: SessionListFilters) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item));
      } else {
        searchParams.append(key, String(value));
      }
    });
  }

  const query = searchParams.toString();

  return request<GetSessionsResponse>(`/api/sessions?${query}`);
}

export type CreateSessionRequestBody = Pick<
  Session,
  | 'crewId'
  | 'name'
  | 'description'
  | 'image'
  | 'city'
  | 'district'
  | 'location'
  | 'coords'
  | 'sessionAt'
  | 'registerBy'
  | 'level'
  | 'maxParticipantCount'
  | 'pace'
>;

export type CreateSessionResponse = Omit<Session, 'liked'>;
export async function createSession(body: CreateSessionRequestBody) {
  return request<CreateSessionResponse>('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export type GetSessionDetailResponse = Session;
export async function getSessionDetail(sessionId: number) {
  return request<GetSessionDetailResponse>(`/api/sessions/${sessionId}`);
}

export type RegisterForSessionResponse = {
  message: string;
  currentParticipantCount: number;
  maxParticipantCount: number;
};
export async function registerForSession(sessionId: number) {
  return request<RegisterForSessionResponse>(
    `/api/sessions/${sessionId}/join`,
    {
      method: 'POST',
    }
  );
}

export type UnregisterFromSessionResponse = {
  message: string;
  currentParticipantCount: number;
};
export async function unregisterFromSession(sessionId: number) {
  return request<UnregisterFromSessionResponse>(
    `/api/sessions/${sessionId}/join`,
    {
      method: 'DELETE',
    }
  );
}

export type GetSessionParticipantsResponse = {
  participants: CrewMember[];
  totalCount: number;
};
export async function getSessionParticipants(
  sessionId: number,
  queryParams?: MemberRoleFilters
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();

  return request<GetSessionParticipantsResponse>(
    `/api/sessions/${sessionId}/participants?${query}`
  );
}

export type UpdateSessionDetailRequestBody = Pick<
  Session,
  'name' | 'description' | 'image'
>;

export type UpdateSessionDetailResponse = Session;
export async function updateSessionDetail(
  sessionId: number,
  body: UpdateSessionDetailRequestBody
) {
  return request<UpdateSessionDetailResponse>(`/api/sessions/${sessionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export type DeleteSessionResponse = { message: string };
export async function deleteSession(sessionId: number) {
  return request<DeleteSessionResponse>(`/api/sessions/${sessionId}`, {
    method: 'DELETE',
  });
}

export type LikeSessionResponse = { message: string };
export async function postLikeSession(sessionId: number) {
  return request<LikeSessionResponse>(`/api/sessions/${sessionId}/like`, {
    method: 'POST',
  });
}

export type UnlikeSessionResponse = { message: string };
export async function deleteLikeSession(sessionId: number) {
  return request<UnlikeSessionResponse>(`/api/sessions/${sessionId}/like`, {
    method: 'DELETE',
  });
}
