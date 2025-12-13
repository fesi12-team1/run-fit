import {
  PaginationQueryParams,
  ResponseData,
  ResponseErrorData,
  Session,
  SliceData,
  User,
} from '@/types';

export async function getSessions(
  queryParams?: {
    // TODO: 이 부분은 세션 조회 시 필요한 필터링 옵션에 따라 수정 필요
    // 결정 후 백앤드와 협의 필요
    // city?: string;
    // district?: string;
    // dateRange?: { from: string; to: string };
    // timeRange?: { from: string; to: string };
    // level?: 'beginner' | 'intermediate' | 'advanced';
    // status?: string;
  } & PaginationQueryParams
) {
  // const accessToken = '';
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/sessions?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Session>> = await response.json();
  return data;
}

export type CreateSessionRequestBody = Pick<
  Session,
  | 'crewId'
  | 'name'
  | 'description'
  | 'image'
  | 'location'
  | 'sessionAt'
  | 'registerBy'
  | 'level'
  | 'maxParticipantCount'
  | 'pace'
>;

export async function createSession(body: CreateSessionRequestBody) {
  // const accessToken = '';
  const response = await fetch('/api/sessions', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Session> = await response.json();
  return data;
}

export async function deleteSession(sessionId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}

// TODO: getSessionsByCrewId는 백엔드 문서화 후 구현 필요
export async function getSessionsByCrewId(
  crewId: string,
  queryParams?: {} & PaginationQueryParams
) {
  // 크루 상세 페이지에서
  // GET /sessions/:crewId/
  // queryParams: {
  //   page?: number,
  //   limit?: number
  // }
  // 성공시
  // body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
  // // participants, likedUsers, reviews 제외 해도 되지 않을까?
}

// TODO: getSessionsByUserId는 백엔드 문서화 후 구현 필요
export async function getSessionsByUserId(userId: string) {
  // (마이페이지) 사용자가 생성한 세션 목록을 위한 API
  // GET /sessions/user/:userId
  // 성공시
  // body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
}

export async function getSessionDetail(sessionId: string) {
  const response = await fetch(`/api/sessions/${sessionId}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Session> = await response.json();
  return data;
}

export async function registerForSession(sessionId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'POST',
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}

export async function unregisterFromSession(sessionId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}

export async function getSessionParticipants(sessionId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/participants`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<User[]> = await response.json();
  return data;
}

export type UpdateSessionDetailRequestBody = Pick<
  Session,
  'name' | 'description' | 'image'
>;

// TODO: updateSessionDetail는 백엔드 문서화 후 수정 필요
export async function updateSessionDetail(
  sessionId: string,
  body: UpdateSessionDetailRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<null> = await response.json();
  return data;
}
