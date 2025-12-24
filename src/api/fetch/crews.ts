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
  SuccessResponse,
} from '@/types';

export type CrewRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export async function createCrew(body: CrewRequestBody) {
  // const accessToken = '';
  const response = await fetch('/api/crews', {
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

  const { data }: SuccessResponse<Crew> = await response.json();
  return data;
}
export async function joinCrew(crewId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type JoinCrewResponseData = {
    crewId: number;
    userId: number;
    role: 'MEMBER';
    joinedAt: string;
  };

  const { data }: SuccessResponse<JoinCrewResponseData> = await response.json();
  return data;
}

export async function getCrews(queryParams?: CrewListFilters) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<SliceData<Crew>> = await response.json();
  return data;
}

export async function getCrewDetail(crewId: number) {
  const response = await fetch(`/api/crews/${crewId}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<Crew> = await response.json();
  return data;
}

export async function getCrewMembers(
  crewId: number,
  queryParams?: MemberRoleFilters
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/members?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type CrewMembersResponseData = {
    members: CrewMember[];
  };

  const { data }: SuccessResponse<CrewMembersResponseData> =
    await response.json();
  return data;
}

export async function getCrewMemberCount(crewId: number) {
  const response = await fetch(`/api/crews/${crewId}/members/count`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type CrewMembersCountResponseData = {
    leaderCount: number;
    staffCount: number;
    memberCount: number;
  };

  const { data }: SuccessResponse<CrewMembersCountResponseData> =
    await response.json();
  return data;
}

export async function getCrewMemberDetailById(crewId: number, userId: number) {
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: SuccessResponse<CrewMemberRoleData> = await response.json();
  return data;
}

type DelegateCrewLeaderRequestBody = {
  newLeaderId: CrewMember['userId'];
};

export async function delegateCrewLeader(
  crewId: number,
  body: DelegateCrewLeaderRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/leader`, {
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

  type DelegateCrewLeaderData = {
    message: '크루장이 변경되었습니다.';
    oldLeaderId: number;
    newLeaderId: number;
  };
  const { data }: SuccessResponse<DelegateCrewLeaderData> =
    await response.json();
  return data;
}

export type UpdateMemberRoleRequestBody = {
  role: Exclude<Role, 'LEADER'>;
};

export async function updateMemberRole(
  crewId: number,
  userId: number,
  body: UpdateMemberRoleRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`, {
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

  type RoleUpdateResponseData =
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
  const { data }: SuccessResponse<RoleUpdateResponseData> =
    await response.json();
  return data;
}

export async function leaveCrew(crewId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/leave`, {
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

  type LeaveResponseData = {
    message: string;
  };

  const { data }: SuccessResponse<LeaveResponseData> = await response.json();
  return data;
}

export async function expelMember(crewId: number, userId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}`, {
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

  type ExpelResponseData = {
    message: string;
    userId: number;
  };

  const { data }: SuccessResponse<ExpelResponseData> = await response.json();
  return data;
}

export type UpdateCrewDetailRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export async function updateCrewDetail(
  crewId: number,
  body: UpdateCrewDetailRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
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

  const { data }: SuccessResponse<Crew> = await response.json();
  return data;
}

export async function deleteCrew(crewId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
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

  type DeleteCrewResponseData = {
    message: string;
  };

  const { data }: SuccessResponse<DeleteCrewResponseData> =
    await response.json();
  return data;
}

export async function getCrewReviews(
  crewId: number,
  queryParams?: PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/reviews?${query}`);

  if (!response.ok) {
    const resData = await response.json();
    if (resData.error) {
      throw new Error(resData.error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type getCrewReviewsResponseData = Review & { sessionName: string };

  const { data }: SuccessResponse<PageData<getCrewReviewsResponseData>> =
    await response.json();
  return data;
}
