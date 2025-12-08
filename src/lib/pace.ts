export function secondsToMinutes(totalSeconds: number): [number, number] {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return [minutes, seconds];
}

export function formatPaceText(minutes: number, seconds: number) {
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}'${formattedSeconds}''`;
}

export function formatTimeText(minutes: number, seconds: number) {
  const formattedSeconds = String(seconds).padStart(2, '0');
  return seconds === 0 ? `${minutes}분` : `${minutes}분 ${formattedSeconds}초`;
}
