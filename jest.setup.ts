import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { server } from '@/mocks/server';

globalThis.jest = jest;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
