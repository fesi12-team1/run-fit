import { NextRequest } from 'next/server';
import { handleRequest } from '@/api/util';

export async function GET(request: NextRequest) {
  return handleRequest(request, '/api/sessions', false);
}
