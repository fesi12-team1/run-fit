import { Profile, ResponseData, ResponseErrorData } from '@/types';

export async function getCurrentUserProfile() {
  // const accessToken = '';
  const response = await fetch('/api/user');

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

export type UpdateUserProfileRequestBody = Partial<
  Pick<Profile, 'name' | 'image' | 'introduction' | 'city' | 'pace' | 'styles'>
>;

export async function updateUserProfile(body: UpdateUserProfileRequestBody) {
  // const accessToken = '';
  const response = await fetch('/api/user', {
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

  const { data }: ResponseData<Profile> = await response.json();

  return data;
}

export async function getUserProfileById(userId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/user/${userId}`);

  if (!response.ok) {
    const { error } = await response.json();
    if (!error.success) {
      throw new Error(error.message);
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }

  type UserProfileResponseData = Omit<Profile, 'updatedAt'>;
  const { data }: ResponseData<UserProfileResponseData> = await response.json();
  return data;
}

export async function leaveCrew(crewId: number) {
  // const accessToken = '';
  const response = await fetch(`/api/user/${crewId}/leave`, {
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
