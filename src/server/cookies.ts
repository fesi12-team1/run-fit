import 'server-only';
import { cookies } from 'next/headers';

export async function getAllCookies() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const allCookiesText = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return allCookiesText;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  return accessToken;
}

export async function setAccessToken(value: string) {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return refreshToken;
}
