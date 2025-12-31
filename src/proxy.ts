// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 로그인 필요한 경로
 */
const AUTH_REQUIRED_PATHS: RegExp[] = [
  /^\/my(\/.*)?$/,
  /^\/crews\/[^/]+\/create-session$/,
  /^\/sessions\/likes$/,
];

/**
 * 로그인 상태에서는 접근하면 안 되는 경로
 */
const AUTH_ONLY_PATHS: RegExp[] = [/^\/signin$/, /^\/signup$/];

const isMatchPath = (pathname: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(pathname));

/**
 * 로그인 여부 판단 (refreshToken 기준)
 */
const isLoggedIn = (request: NextRequest): boolean => {
  return request.cookies.has('refreshToken');
};

/**
 * 로그인 페이지 redirect URL 생성
 */
const createSigninRedirectUrl = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const redirect = encodeURIComponent(pathname + search);

  const signinUrl = new URL('/signin', request.url);
  signinUrl.searchParams.set('redirect', redirect);
  signinUrl.searchParams.set('reason', 'auth');

  return signinUrl;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = isLoggedIn(request);

  /**
   * 1️⃣ 로그인된 사용자가 로그인/회원가입 페이지 접근
   */
  if (loggedIn && isMatchPath(pathname, AUTH_ONLY_PATHS)) {
    return NextResponse.redirect(new URL('/my', request.url));
  }

  /**
   * 2️⃣ 로그인 안 된 사용자가 보호 페이지 접근
   */
  if (!loggedIn && isMatchPath(pathname, AUTH_REQUIRED_PATHS)) {
    return NextResponse.redirect(createSigninRedirectUrl(request));
  }

  return NextResponse.next();
}

/**
 * 페이지 요청에만 Proxy 적용
 */
export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets).*)'],
};
