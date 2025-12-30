import { getRefreshToken, setAccessToken } from '../cookies';
import { postRefresh } from './fetch';

export async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;
  try {
    const data = await postRefresh(refreshToken);
    await setAccessToken(data.token);
    return true;
  } catch {
    return false;
  }
}
