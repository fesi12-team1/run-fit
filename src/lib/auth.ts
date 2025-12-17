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

export async function hasAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.has('accessToken');
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  return refreshToken;
}
