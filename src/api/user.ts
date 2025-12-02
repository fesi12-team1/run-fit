import { Profile, ResponseData, ResponseError } from '@/types';

export async function getCurrentUserProfile() {
  const accessToken = '';
  const response = await fetch('/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data: ResponseData<Profile, ResponseError> = await response.json();
  return data;
}

export async function updateUserProfile(
  body: Partial<
    Pick<
      Profile,
      'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'
    >
  >
) {
  const accessToken = '';
  const response = await fetch('/api/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });
  const data: ResponseData<Profile, ResponseError> = await response.json();

  return data;
}

export async function getUserProfileById(userId: string) {
  const accessToken = '';
  const response = await fetch(`/api/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  type UserProfileResponseData = Omit<Profile, 'updatedAt'>;
  type UserProfileResponseError = ResponseError & {
    code: 'USER_NOT_FOUND';
    message: '사용자를 찾을 수 없습니다.';
  };
  const data: ResponseData<UserProfileResponseData, UserProfileResponseError> =
    await response.json();

  return data;
}

export async function leaveCrew(crewId: string) {
  const accessToken = '';
  const response = await fetch(`/api/user/${crewId}/leave`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  type LeaveCrewResponseData = { message: '크루를 탈퇴했습니다.' };
  type LeaveCrewResponseError = ResponseError & {
    code: 'CREW_ROLE_FORBIDDEN';
    message: '크루장은 탈퇴 전에 리더 권한을 위임해야 합니다.';
  };
  const data: ResponseData<LeaveCrewResponseData, LeaveCrewResponseError> =
    await response.json();

  return data;
}
