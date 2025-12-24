import { SuccessResponse, User, UserCredentials } from '@/types';

export type SignupRequestBody = UserCredentials & { name: string };

export async function postSignup(body: SignupRequestBody) {
  const response = await fetch('/api/auth/signup', {
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
  const { data }: SuccessResponse<User> = await response.json();
  return data;
}

export async function postSignin(body: UserCredentials) {
  const response = await fetch('/api/auth/signin', {
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

  type SigninResponseData = { token: string };
  const { data }: SuccessResponse<SigninResponseData> = await response.json();
  return data;
}

export async function postRefresh() {
  // const refreshToken = '';
  const response = await fetch('/api/auth/refresh', {
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

  type RefreshResponseData = { token: string };
  const { data }: SuccessResponse<RefreshResponseData> = await response.json();
  return data;
}

export async function postSignout() {
  // const accessToken = '';
  const response = await fetch('/api/auth/signout', {
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
  type SignoutResponseData = { message: string };
  const { data }: SuccessResponse<SignoutResponseData> = await response.json();
  return data;
}
