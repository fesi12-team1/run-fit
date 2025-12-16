export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    if (process.env.USE_MSW !== 'true') return;
    const { initMocks } = await import('@/mocks');
    await initMocks();
  }
}
