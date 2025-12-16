export async function initMocks() {
  if (process.env.NODE_ENV !== 'development') return;
  if (process.env.NEXT_PUBLIC_USE_MSW !== 'true') return;

  try {
    const { server } = await import('.');
    server.listen();
    console.log('[MSW] Mock server is running');
  } catch (error) {
    console.error('[MSW] Failed to initialize mocks:', error);
  }
}
