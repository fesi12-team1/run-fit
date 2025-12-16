import { HttpResponse, type HttpResponseResolver } from 'msw';

export type AuthMode = 'off' | 'bypass' | 'strict';

export const sessions = new Map<string, number>(); // token -> userId

function getBearerToken(request: Request) {
  const auth = request.headers.get('authorization') ?? '';
  const m = auth.match(/^Bearer\s+(.+)$/i);
  return m?.[1] ?? null;
}

export function isAuthed(request: Request) {
  const token = getBearerToken(request);
  return token ? sessions.has(token) : false;
}

export function unauthorized() {
  return HttpResponse.json(
    {
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Unauthorized' },
    },
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
    if (!isAuthed(args.request)) return unauthorized();
    return resolver(args);
  };
}
