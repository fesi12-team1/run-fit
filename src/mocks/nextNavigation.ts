import { jest } from '@jest/globals';

// Mock 함수들
export const pushMock = jest.fn();
export const replaceMock = jest.fn();
export const refreshMock = jest.fn();
export const backMock = jest.fn();
export const prefetchMock = jest.fn();
export const useSearchParamsMock = jest.fn(() => new URLSearchParams());
export const useParamsMock = jest.fn(() => ({}));
export const usePathnameMock = jest.fn(() => '/');
export const redirectMock = jest.fn();

// next/navigation 모킹
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
    refresh: refreshMock,
    back: backMock,
    prefetch: prefetchMock,
  }),
  useSearchParams: useSearchParamsMock,
  useParams: useParamsMock,
  usePathname: usePathnameMock,
  redirect: redirectMock,
}));

// 모든 mock 초기화 함수
export const clearAllNavigationMocks = () => {
  pushMock.mockClear();
  replaceMock.mockClear();
  refreshMock.mockClear();
  backMock.mockClear();
  prefetchMock.mockClear();
  useSearchParamsMock.mockClear();
  useParamsMock.mockClear();
  usePathnameMock.mockClear();
  redirectMock.mockClear();
};
