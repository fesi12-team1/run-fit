import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

globalThis.jest = jest;

if (process.env.USE_MSW === 'true') {
  const { server } = await import('@/mocks/server');

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
