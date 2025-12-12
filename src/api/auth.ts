import {
  ResponseData,
  ResponseErrorData,
  User,
  UserCredentials,
} from '@/types';

export type SignupRequestBody = UserCredentials & { name: string };

export async function postSignup(body: SignupRequestBody) {
  const response = await fetch('/api/auth/signup', {
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

  const { data }: ResponseData<User> = await response.json();
  return data;
}

export type SigninRequestBody = UserCredentials;

export async function postSignin(body: SigninRequestBody) {
  const response = await fetch('/api/auth/signin', {
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

  type SigninData = { token: string };
  const { data }: ResponseData<SigninData> = await response.json();
  return data;
}

export async function postRefresh() {
  // const refreshToken = '';
  const response = await fetch('/api/auth/refresh', {
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

  type RefreshData = { token: string };
  const { data }: ResponseData<RefreshData> = await response.json();
  return data;
}

export async function postSignout() {
  // const accessToken = '';
  const response = await fetch('/api/auth/signout', {
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
