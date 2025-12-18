import { HttpResponse, type HttpResponseResolver } from 'msw';
import { errorResponse } from '../utils';

export type AuthMode = 'off' | 'bypass' | 'strict';

export const sessions = new Map<string, number>(); // token -> userId

export function setAuth() {
  sessions.set('userId', 2);
}

export function isAuthed() {
  return sessions.has('userId');
}

export function unauthorized() {
  return HttpResponse.json(
    errorResponse({ code: 'UNAUTHORIZED', message: 'Unauthorized' }),
    { status: 401 }
  );
}

export function resetAuth() {
  sessions.clear();
}

// eslint-disable-next-line
type Resolver = HttpResponseResolver<any, any>;

export function requireAuth(mode: AuthMode, resolver: Resolver): Resolver {
  return (args) => {
    if (mode === 'off') return resolver(args); // 인증 시스템 자체를 끔
    if (mode === 'bypass') return resolver(args); // 보호 라우트도 통과
    // strict
    if (!isAuthed()) return unauthorized();
    return resolver(args);
  };
}
