import { NextRequest } from 'next/server';
import { handleRequest } from '@/lib/api';

export async function GET(request: NextRequest) {
  return handleRequest(request, false);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request, true);
}
