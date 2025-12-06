export function formatMinutesToKoreanTime(totalMinutes: number): string {
  totalMinutes = totalMinutes % (24 * 60);

  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  const isAM = hour24 < 12;
  const ampm = isAM ? '오전' : '오후';

  let hour12: number;

  if (isAM) {
    hour12 = hour24;
  } else {
    hour12 = hour24 === 12 ? 12 : hour24 - 12;
  }

  const paddedHour = hour12.toString().padStart(2, '0');
  const paddedMinute = minute.toString().padStart(2, '0');

  return `${ampm} ${paddedHour}:${paddedMinute}`;
}
