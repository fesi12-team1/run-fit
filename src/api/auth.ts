import { ResponseData, ResponseError, User } from '@/types';

type UserCredentials = {
  email: string;
  password: string;
};

export async function postSignup(body: UserCredentials & { name: string }) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  type SignupError = ResponseError &
    (
      | {
          code: 'DUPLICATE_EMAIL';
          message: '이미 사용 중인 이메일입니다.';
        }
      | {
          code: 'VALIDATION_ERROR';
          message: '요청 데이터가 유효하지 않습니다.';
        }
    );
  const data: ResponseData<User, SignupError> = await response.json();

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

  type SigninData = { token: string };
  type SigninError = ResponseError & {
    code: 'INVALID_CREDENTIALS';
    message: '올바르지 않은 요청입니다.';
  };
  const data: ResponseData<SigninData, SigninError> = await response.json();

  return data;
}

export async function postRefresh() {
  const refreshToken = '';
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `refreshToken=${refreshToken}`,
    },
  });

  type RefreshData = { token: string };
  type RefreshError = ResponseError & {
    code: 'REFRESH_TOKEN_INVALID';
    message: '유효하지 않은 리프레시 토큰입니다.';
  };
  const data: ResponseData<RefreshData, RefreshError> = await response.json();

  return data;
}

export async function postSignout() {
  const accessToken = '';
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  type SignoutData = { message: '로그아웃 되었습니다.' };
  const data: ResponseData<SignoutData, ResponseError> = await response.json();

  return data;
}
