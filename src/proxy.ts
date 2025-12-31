import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_REQUIRED_PATHS: RegExp[] = [
  /^\/my(\/.*)?$/,
  /^\/crews\/[^/]+\/create-session$/,
  /^\/sessions\/likes$/,
];

const AUTH_ONLY_PATHS: RegExp[] = [/^\/signin$/, /^\/signup$/];

const isMatchPath = (pathname: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(pathname));

const isLoggedIn = (request: NextRequest): boolean => {
  return request.cookies.has('refreshToken');
};

const isValidRedirectPath = (path: string): boolean => {
  if (!path.startsWith('/')) return false;
  if (path.startsWith('//')) return false;
  if (path.match(/^[\w]+:/)) return false;
  return true;
};

const createSigninRedirectUrl = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const fullPath = pathname + search;

  const safePath = isValidRedirectPath(fullPath) ? fullPath : '/';
  const redirect = encodeURIComponent(safePath);
  const signinUrl = new URL('/signin', request.url);
  signinUrl.searchParams.set('redirect', redirect);
  signinUrl.searchParams.set('reason', 'auth');

  return signinUrl;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const loggedIn = isLoggedIn(request);

  if (loggedIn && isMatchPath(pathname, AUTH_ONLY_PATHS)) {
    return NextResponse.redirect(new URL('/my', request.url));
  }

  if (!loggedIn && isMatchPath(pathname, AUTH_REQUIRED_PATHS)) {
    return NextResponse.redirect(createSigninRedirectUrl(request));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|assets).*)'],
};
