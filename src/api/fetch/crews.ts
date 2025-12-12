import {
  Crew,
  CrewListFilters,
  CrewMember,
  CrewMemberRoleData,
  MemberRoleFilters,
  ResponseData,
  Role,
  SliceData,
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

export async function getCrews(queryParams?: CrewListFilters) {
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

export async function getCrewDetail(crewId: number) {
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
  crewId: number,
  queryParams?: MemberRoleFilters
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
    leader: CrewMember;
    staff: CrewMember[];
    members: CrewMember[];
  };
  const { data }: ResponseData<CrewMembersResponseData> = await response.json();
  return data;
}

export async function getCrewMemberCount(crewId: number) {
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

export async function getCrewMemberDetailById(crewId: number, userId: number) {
  const response = await fetch(`/api/crews/${crewId}/members/${userId}/role`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  const { data }: ResponseData<CrewMemberRoleData> = await response.json();
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
  crewId: number,
  userId: number,
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
  const { data }: ResponseData<RoleUpdateResponseData> = await response.json();
  return data;
}

export async function expelMember(crewId: number, userId: number) {
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

  type ExpelResponseData = {
    message: string;
    userId: number;
  };

  const { data }: ResponseData<ExpelResponseData> = await response.json();
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

export async function deleteCrew(crewId: number) {
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

  type DeleteCrewResponseData = {
    message: string;
  };

  const { data }: ResponseData<DeleteCrewResponseData> = await response.json();
  return data;
}
