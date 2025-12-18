import {
  Crew,
  PageData,
  PaginationQueryParams,
  Profile,
  ResponseData,
  Review,
  Session,
  SliceData,
} from '@/types';

export async function getMyProfile() {
  // const accessToken = '';
  const response = await fetch('/api/user');

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Profile> = await response.json();
  return data;
}

export type UpdateMyProfileRequestBody = Partial<
  Pick<Profile, 'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'>
>;

export async function updateMyProfile(body: UpdateMyProfileRequestBody) {
  // const accessToken = '';
  const response = await fetch('/api/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Profile> = await response.json();
  return data;
}

export async function getUserProfile(userId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/user/${userId}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type UserProfileResponseData = Omit<Profile, 'updatedAt' | 'email'>;
  const { data }: ResponseData<UserProfileResponseData> = await response.json();
  return data;
}

export async function getMyReviews(queryParams?: PaginationQueryParams) {
  // const accessToken = '';
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();

  const response = await fetch(`/api/user/me/reviews?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<PageData<Review>> = await response.json();
  return data;
}

// 내가 찜한 세션 목록 조회
export async function getMyLikedSessions(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();

  const response = await fetch(`/api/user/me/likes?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type LikeSessionsResponseData = SliceData<
    Pick<
      Session,
      | 'crewId'
      | 'name'
      | 'image'
      | 'city'
      | 'district'
      | 'location'
      | 'coords'
      | 'sessionAt'
      | 'level'
      | 'status'
    > & { sessionId: number }
  >;

  const { data }: ResponseData<LikeSessionsResponseData> =
    await response.json();
  return data;
}

// 내가 만든 크루 목록 조회 (무한스크롤)
export async function getMyOwnedCrews(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();

  const response = await fetch(`/api/user/me/crews/owned?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Crew>> = await response.json();
  return data;
}

// 내가 속한 크루 목록 조회 (무한스크롤)
export async function getMyJoinedCrews(queryParams?: PaginationQueryParams) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();
  const response = await fetch(`/api/user/me/crews?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type GetMyJoinedCrewsResponseData = SliceData<
    Crew & { myRole: 'LEADER' | 'STAFF' | 'MEMBER' }
  >;
  const { data }: ResponseData<GetMyJoinedCrewsResponseData> =
    await response.json();
  return data;
}

// 내가 만든 세션 목록 조회 (무한스크롤)
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
  const response = await fetch(`/api/user/me/sessions?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Omit<Session, 'description'>>> =
    await response.json();
  return data;
}

// 내가 참여하는 세션 목록 조회 (무한스크롤)
export async function getMyParticipatingSessions(
  queryParams?: PaginationQueryParams & { status: 'SCHEDULED' | 'COMPLETED' }
) {
  const searchParams = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      searchParams.append(key, String(value));
    });
  }

  const query = searchParams.toString();

  const response = await fetch(`/api/user/me/sessions/participating?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Omit<Session, 'description'>>> =
    await response.json();
  return data;
}
