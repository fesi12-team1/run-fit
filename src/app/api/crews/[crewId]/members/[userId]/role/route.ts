import { NextRequest } from 'next/server';
import handleRequest from '@/server/api/handleRequest';

export async function GET(request: NextRequest) {
  return handleRequest(request, false);
}
