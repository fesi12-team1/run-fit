import {
  PageData,
  PaginationQueryParams,
  Profile,
  ResponseData,
  Review,
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

export async function getMyReviews(queryParams: PaginationQueryParams) {
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
