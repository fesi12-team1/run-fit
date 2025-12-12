import {
  CrewMember,
  ResponseData,
  Session,
  SessionListFilters,
  SliceData,
} from '@/types';

export async function getSessions(queryParams?: SessionListFilters) {
  // const accessToken = '';
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

  const response = await fetch(`/api/sessions?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Omit<Session, 'description'>>> =
    await response.json();
  return data;
}

export type CreateSessionRequestBody = Pick<
  Session,
  | 'crewId'
  | 'name'
  | 'description'
  | 'image'
  | 'city'
  | 'district'
  | 'coords'
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

  const { data }: ResponseData<Omit<Session, 'liked'>> = await response.json();
  return data;
}

export async function getSessionDetail(sessionId: number) {
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

export async function registerForSession(sessionId: number) {
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

  type RegisterResponseData = {
    message: string;
    currentParticipantCount: number;
    maxParticipantCount: number;
  };

  const { data }: ResponseData<RegisterResponseData> = await response.json();
  return data;
}

export async function unregisterFromSession(sessionId: number) {
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

  type UnregisterResponseData = {
    message: string;
    currentParticipantCount: number;
  };

  const { data }: ResponseData<UnregisterResponseData> = await response.json();
  return data;
}

export async function getSessionParticipants(sessionId: number) {
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

  type ParticipantsResponseData = {
    participants: CrewMember[];
    totalCount: number;
  };

  const { data }: ResponseData<ParticipantsResponseData> =
    await response.json();
  return data;
}

export type UpdateSessionDetailRequestBody = Pick<
  Session,
  'name' | 'description' | 'image'
>;

export async function updateSessionDetail(
  sessionId: number,
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

  const { data }: ResponseData<Omit<Session, 'like'>> = await response.json();
  return data;
}

/* 
TODO: getSessionsByCrewId는 백엔드 문서화 후 구현 필요
export async function getSessionsByCrewId(crewId: number, queryParams?: {}) {
   크루 상세 페이지에서
   GET /sessions/:crewId/
   queryParams: {
     page?: number,
     limit?: number
   }
   성공시
   body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
   participants, likedUsers, reviews 제외 해도 되지 않을까?
}

 TODO: getSessionsByUserId는 백엔드 문서화 후 구현 필요
export async function getSessionsByUserId(userId: number) {
   (마이페이지) 사용자가 생성한 세션 목록을 위한 API
   GET /sessions/user/:userId
   성공시
   body: Omit<Session, "participants" | "likedUsers" | "reviews">[]
}

 TODO: deleteSession은 백엔드 문서화 후 구현 필요
export async function deleteSession(sessionId: number) {
   const accessToken = '';
   세션 삭제 API
} 
*/
