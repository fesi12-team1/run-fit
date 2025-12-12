import { NextRequest } from 'next/server';
import { handleRequest } from '@/api/util';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/sessions/[sessionId]'>
) {
  const { sessionId } = await ctx.params;
  return handleRequest(request, `/api/sessions/${sessionId}`, false);
}
