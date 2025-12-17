export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initMocks } = await import('@/mocks/server/init');
    await initMocks();
  }
}
