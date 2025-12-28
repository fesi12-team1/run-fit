import { NextRequest } from 'next/server';
import { handleRequest } from '@/lib/api';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/sessions/[sessionId]'>
) {
  const { sessionId } = await ctx.params;
  return handleRequest(request, `/sessions/${sessionId}`, false);
}

export async function DELETE(
  request: NextRequest,
  ctx: RouteContext<'/api/sessions/[sessionId]'>
) {
  const { sessionId } = await ctx.params;
  return handleRequest(request, `/sessions/${sessionId}`, true);
}
