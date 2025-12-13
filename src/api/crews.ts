import {
  Crew,
  PaginationQueryParams,
  Profile,
  ResponseData,
  ResponseErrorData,
  Role,
  SliceData,
  User,
} from '@/types';

export type CrewRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export async function createCrew(body: CrewRequestBody) {
  // const accessToken = '';
  const response = await fetch('/api/crews', {
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

  const { data }: ResponseData<Crew> = await response.json();
  return data;
}

export async function getCrews(
  queryParams?: {
    city?: string;
    keyword?: string;
    sort?: 'createdAtDesc' | 'memberCountDesc';
    // district?: string;
  } & PaginationQueryParams
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<SliceData<Crew>> = await response.json();
  return data;
}

export async function getCrewDetail(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Crew> = await response.json();
  return data;
}

export async function getCrewMembers(
  crewId: string,
  queryParams?: { role?: 'leader' | 'staff' | 'member' }
) {
  const query = new URLSearchParams(
    queryParams as Record<string, string>
  ).toString();
  const response = await fetch(`/api/crews/${crewId}/members?${query}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type CrewMembersResponseData = {
    leader: Profile;
    staff: Profile[];
    member: Profile[];
  };
  const { data }: ResponseData<CrewMembersResponseData> = await response.json();
  return data;
}

export async function getCrewMembersCount(crewId: string) {
  const response = await fetch(`/api/crews/${crewId}/members/count`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type CrewMembersCountResponseData = {
    leaderCount: number;
    staffCount: number;
    memberCount: number;
  };

  const { data }: ResponseData<CrewMembersCountResponseData> =
    await response.json();
  return data;
}

export async function getCrewMemberDetailById(crewId: string, userId: string) {
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<Profile> = await response.json();
  return data;
}

type DelegateCrewLeaderRequestBody = {
  newLeaderId: User['id'];
};

export async function delegateCrewLeader(
  crewId: string,
  body: DelegateCrewLeaderRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/leader`, {
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

  type DelegateCrewLeaderData = {
    message: '크루장이 변경되었습니다.';
    oldLeaderId: number;
    newLeaderId: number;
  };
  const { data }: ResponseData<DelegateCrewLeaderData> = await response.json();
  return data;
}

export type UpdateMemberRoleRequestBody = {
  role: Exclude<Role, 'LEADER'>;
};

export async function updateMemberRole(
  crewId: string,
  userId: string,
  body: UpdateMemberRoleRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`, {
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

  type RoleUpdateResponseData =
    | {
        userId: string;
        previousRole: 'MEMBER';
        newRole: 'STAFF';
        message: '운영진으로 등록되었습니다.';
      }
    | {
        userId: string;
        previousRole: 'STAFF';
        newRole: 'MEMBER';
        message: '운영진에서 해제되었습니다.';
      };
  const { data }: ResponseData<RoleUpdateResponseData> = await response.json();
  return data;
}

export async function expelMember(crewId: string, userId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}/members/${userId}`, {
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

export type UpdateCrewDetailRequestBody = Pick<
  Crew,
  'name' | 'description' | 'city' | 'image'
>;

export async function updateCrewDetail(
  crewId: string,
  body: UpdateCrewDetailRequestBody
) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
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

  const { data }: ResponseData<Crew> = await response.json();
  return data;
}

export async function deleteCrew(crewId: string) {
  // const accessToken = '';
  const response = await fetch(`/api/crews/${crewId}`, {
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
