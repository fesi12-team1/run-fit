export function formatSecondsToPace(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}분 ${formattedSeconds}초/km`;
}
