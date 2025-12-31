import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { clearAllNavigationMocks } from '@/mocks/nextNavigation';

globalThis.jest = jest;

// 모든 mock 초기화
afterEach(() => {
  clearAllNavigationMocks();
});

if (process.env.NEXT_PUBLIC_USE_MSW === 'true') {
  let server: Awaited<typeof import('@/mocks/jest')>['server'];

  beforeAll(async () => {
    const { server: mockServer } = await import('@/mocks/jest');
    server = mockServer;
    server.listen();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
