import { handleRequest } from '@/api/util';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, params);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, params);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, params);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, params);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(request, params);
}
