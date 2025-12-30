import { NextRequest } from 'next/server';
import handleRequest from '@/server/api/handleRequest';

const handler = async (request: NextRequest) => {
  return handleRequest(request, true);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
