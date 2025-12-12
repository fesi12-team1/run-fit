import { NextRequest } from 'next/server';
import { handleRequest } from '@/api/util';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/crews/[crewId]'>
) {
  const { crewId } = await ctx.params;
  return handleRequest(request, `/api/crews/${crewId}`, false);
}
