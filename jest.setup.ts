import '@testing-library/jest-dom';
import './src/mocks/nextNavigation';
import { jest } from '@jest/globals';

globalThis.jest = jest;

if (process.env.NEXT_PUBLIC_USE_MSW === 'true') {
  const { server } = await import('@/mocks/jest');

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
