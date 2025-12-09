import { http } from 'msw';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const apiGet = (
  path: string,
  resolver: Parameters<typeof http.get>[1]
) => http.get(apiUrl(path), resolver);

export const apiPost = (
  path: string,
  resolver: Parameters<typeof http.post>[1]
) => http.post(apiUrl(path), resolver);

export const apiPut = (
  path: string,
  resolver: Parameters<typeof http.put>[1]
) => http.put(apiUrl(path), resolver);

export const apiDelete = (
  path: string,
  resolver: Parameters<typeof http.delete>[1]
) => http.delete(apiUrl(path), resolver);

export const apiPatch = (
  path: string,
  resolver: Parameters<typeof http.patch>[1]
) => http.patch(apiUrl(path), resolver);
