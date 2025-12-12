import { NextRequest } from 'next/server';
import { handleRequest } from '@/api/util';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  return handleRequest(request, pathname);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  return handleRequest(request, pathname);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  return handleRequest(request, pathname);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  return handleRequest(request, pathname);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  return handleRequest(request, pathname);
}
