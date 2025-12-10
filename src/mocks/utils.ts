if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL 환경 변수를 불러오지 못했습니다.');
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const path = (path: string) => `${API_BASE_URL}${path}`;

export function parseIdParam(
  id: string | readonly string[] | undefined
): number | null {
  if (!id || typeof id !== 'string') {
    return null;
  }

  const parsed = parseInt(id, 10);
  return isNaN(parsed) ? null : parsed;
}
