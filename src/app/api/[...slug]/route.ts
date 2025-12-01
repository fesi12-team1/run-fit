export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const pathname = slug.join('/');
  const proxyURL = new URL(pathname, 'https://nextjs.org');
  const proxyRequest = new Request(proxyURL, request);

  try {
    return fetch(proxyRequest);
  } catch (reason) {
    const message =
      reason instanceof Error ? reason.message : 'Unexpected exception';

    return new Response(message, { status: 500 });
  }
}
