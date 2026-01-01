import {
  Crew,
  PageData,
  PaginationQueryParams,
  Profile,
  Review,
  Session,
  SliceData,
} from '@/types';
import request from './request';

export type GetMyProfileResponse = Profile;
export async function getMyProfile() {
  return request<GetMyProfileResponse>('/api/user');
}

export type UpdateMyProfileRequestBody = Partial<
  Pick<Profile, 'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'>
>;

export type UpdateMyProfileResponse = Profile;
export async function updateMyProfile(body: UpdateMyProfileRequestBody) {
  return request<UpdateMyProfileResponse>('/api/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export type GetUserProfileResponse = Omit<Profile, 'updatedAt' | 'email'>;
export async function getUserProfile(userId: number) {
  return request<GetUserProfileResponse>(`/api/user/${userId}`);
}

export type GetMyReviewsResponse = PageData<Review>;
export async function getMyReviews(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyReviewsResponse>(`/api/user/me/reviews?${query}`);
}

// 내가 찜한 세션 목록 조회
export type GetMyLikedSessionsResponse = SliceData<Session>;
export async function getMyLikedSessions(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyLikedSessionsResponse>(`/api/user/me/likes?${query}`);
}

// 내가 만든 크루 목록 조회 (무한스크롤)
export type GetMyOwnedCrewsResponse = SliceData<Crew>;
export async function getMyOwnedCrews(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyOwnedCrewsResponse>(`/api/user/me/crews/owned?${query}`);
}

// 내가 속한 크루 목록 조회 (무한스크롤)
export type GetMyJoinedCrewsItem = Crew & {
  myRole: 'LEADER' | 'STAFF' | 'MEMBER';
};
export type GetMyJoinedCrewsResponse = SliceData<GetMyJoinedCrewsItem>;
export async function getMyJoinedCrews(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyJoinedCrewsResponse>(`/api/user/me/crews?${query}`);
}

// 내가 만든 세션 목록 조회 (무한스크롤)
export type GetMyCreatedSessionsResponse = SliceData<
  Omit<Session, 'description'>
>;
export async function getMyCreatedSessions(
  queryParams?: PaginationQueryParams
) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyCreatedSessionsResponse>(
    `/api/user/me/sessions?${query}`
  );
}

// 내가 참여하는 세션 목록 조회 (무한스크롤)
export type GetMyParticipatingSessionsQuery = PaginationQueryParams & {
  status: 'SCHEDULED' | 'COMPLETED';
};

export type GetMyParticipatingSessionsItem = Omit<Session, 'description'> & {
  reviewed: boolean;
};

export type GetMyParticipatingSessionsResponse =
  SliceData<GetMyParticipatingSessionsItem>;

export async function getMyParticipatingSessions(
  queryParams?: GetMyParticipatingSessionsQuery
) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  return request<GetMyParticipatingSessionsResponse>(
    `/api/user/me/sessions/participating?${query}`
  );
}
