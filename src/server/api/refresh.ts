import { getRefreshToken, setAccessToken } from '../cookies';
import { postRefresh } from './fetch';

export async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;
  try {
    const data = await postRefresh(refreshToken);
    await setAccessToken(data.token);
    return data.token;
  } catch {
    return null;
  }
}
