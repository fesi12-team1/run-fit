import { Flatten } from '@/lib/type';
import { Response, ResponseError, User } from '@/types';

type UserCredentials = {
  email: string;
  password: string;
};

export async function postSignup(body: UserCredentials & { name: string }) {
  // POST /auth/signup
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: Response<User, SignupError> = await response.json();
  return data;
}

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

export async function postSignin(body: UserCredentials) {
  // POST /auth/signin
  const response = await fetch('/api/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data: Response<
    {
      accessToken: string;
      tokenType: 'Bearer';
      expiresIn: number;
    },
    SigninError
  > = await response.json();

  return data;
}

type SigninError = ResponseError & {
  code: 'INVALID_CREDENTIALS';
  message: '올바르지 않은 요청입니다.';
};

export async function postRefresh() {
  // POST /api/auth/refresh
  const response = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: Response<
    {
      token: string;
    },
    RefreshError
  > = await response.json();
  return data;
}

type RefreshError = ResponseError & {
  code: 'REFRESH_TOKEN_INVALID';
  message: '유효하지 않은 리프레시 토큰입니다.';
};

export async function postSignout() {
  // POST /auth/signout
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: Response<
    {
      message: '로그아웃 되었습니다.';
    },
    ResponseError
  > = await response.json();
  return data;
}
