import '@tanstack/react-query';
import type { ApiError } from '@/lib/error';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
  }
}
