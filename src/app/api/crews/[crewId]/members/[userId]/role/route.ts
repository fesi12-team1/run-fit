import { NextRequest } from 'next/server';
import { handleRequest } from '@/lib/api';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/crews/[crewId]/members/[userId]/role'>
) {
  const { crewId, userId } = await ctx.params;
  return handleRequest(
    request,
    `/crews/${crewId}/members/${userId}/role`,
    false
  );
}
