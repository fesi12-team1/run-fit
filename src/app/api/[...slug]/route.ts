async function handleRequest(
  request: Request,
  params: Promise<{ slug: string[] }>
) {
  const { slug } = await params;
  const pathname = slug.join('/');

  if (!process.env.NEXT_PUBLIC_API_URL) {
    return new Response(
      'NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.',
      { status: 500 }
    );
  }

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const proxyURL = new URL(`api/${pathname}`, baseURL);

  const proxyRequest = new Request(proxyURL, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : undefined,
  });

  try {
    return fetch(proxyRequest);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}

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
