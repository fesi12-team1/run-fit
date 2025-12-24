import {
  CrewMember,
  MemberRoleFilters,
  Session,
  SessionListFilters,
  SliceData,
  SuccessResponse,
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
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<SliceData<Session>> = await response.json();
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
  | 'location'
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

  const { data }: SuccessResponse<Omit<Session, 'liked'>> =
    await response.json();
  return data;
}

export async function getSessionDetail(sessionId: number) {
  const response = await fetch(`/api/sessions/${sessionId}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<Session> = await response.json();
  return data;
}

export async function registerForSession(sessionId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'POST',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type RegisterResponseData = {
    message: string;
    currentParticipantCount: number;
    maxParticipantCount: number;
  };

  const { data }: SuccessResponse<RegisterResponseData> = await response.json();
  return data;
}

export async function unregisterFromSession(sessionId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}/join`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type UnregisterResponseData = {
    message: string;
    currentParticipantCount: number;
  };

  const { data }: SuccessResponse<UnregisterResponseData> =
    await response.json();
  return data;
}

export async function getSessionParticipants(
  sessionId: number,
  queryParams?: MemberRoleFilters
) {
  // const accessToken = '';
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(
    `/api/sessions/${sessionId}/participants?${query}`
  );

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type ParticipantsResponseData = {
    participants: CrewMember[];
    totalCount: number;
  };

  const { data }: SuccessResponse<ParticipantsResponseData> =
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

  const { data }: SuccessResponse<Omit<Session, 'liked'>> =
    await response.json();
  return data;
}

export async function deleteSession(sessionId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type DeleteSessionResponseData = {
    message: string;
  };

  const { data }: SuccessResponse<DeleteSessionResponseData> =
    await response.json();
  return data;
}

// 세션 찜
export async function postLikeSession(sessionId: number) {
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'POST',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type PostLikeSessionResponseData = {
    message: string;
  };

  const { data }: SuccessResponse<PostLikeSessionResponseData> =
    await response.json();
  return data;
}

// 세션 찜 취소
export async function deleteLikeSession(sessionId: number) {
  const response = await fetch(`/api/sessions/${sessionId}/like`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type DeleteLikeSessionResponseData = {
    message: string;
  };

  const { data }: SuccessResponse<DeleteLikeSessionResponseData> =
    await response.json();
  return data;
}
