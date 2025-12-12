export function formatMinutesToKoreanTime(totalMinutes: number): string {
  totalMinutes = totalMinutes % (24 * 60);

  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return formatTimeToKorean(hour24, minute);
}

export function formatTimeToKorean(hour: number, minute: number): string {
  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';

  const hour12 = isAM || hour === 12 ? hour : hour - 12;

  const paddedHour = hour12.toString().padStart(2, '0');
  const paddedMinute = minute.toString().padStart(2, '0');

  return `${ampm} ${paddedHour}:${paddedMinute}`;
}
