import { NextRequest } from 'next/server';
import { handleRequest } from '@/lib/api';

const handler = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) => {
  const { slug } = await params;
  const pathname = slug.join('/');
  console.log('pathname from slug:', pathname);
  return handleRequest(request, pathname, true);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
