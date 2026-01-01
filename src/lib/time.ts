import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';

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

/**
 * 분 단위를 "HH:mm" 형식의 문자열로 변환합니다.
 * 서버 API와의 통신에 사용됩니다.
 * @param minutes
 * @returns {string} "HH:mm" 형식의 시간 문자열
 */
export function formatMinutesToHHmm(minutes: number) {
  const date = new Date(0, 0, 0, 0, minutes);
  return format(date, 'HH:mm');
}

/**
 * target: 목표 일시(ISO string 또는 Date)
 * base: 기준 일시(기본값: 현재)
 *
 * 남은 시간 <= 0 : 마감됨
 * 남은 시간 < 1시간 : 곧 마감
 * 남은 시간 < 24시간 : n시간 후 마감
 * 남은 시간 >= 24시간 : 마감 D-n
 */
export function formatDDay(
  endDate: string | number | Date,
  startDate: string | number | Date = new Date()
) {
  const end = new Date(endDate);
  const start = new Date(startDate);

  const diffMinutes = differenceInMinutes(end, start);
  const diffHours = differenceInHours(end, start);
  const diffDays = differenceInDays(end, start);

  if (diffMinutes <= 0) return '마감됨';
  if (diffMinutes < 60) return '곧 마감';
  if (diffHours < 24) return `${diffHours}시간 후 마감`;

  return `마감 D-${diffDays}`;
}

/** "2025-12-17T09:39:44.324" -> "12월 17일 • 오전 9:39" */
export function formatKoYYMDMeridiemTime(input: string | Date) {
  return format(new Date(input), `yy년 M월 d일 • bb h:mm`, { locale: ko });
}

/**
 * "2025-12-17T09:39:44.324" -> "2025년 12월 17일"
 */
export function formatKoYMD(input: string | Date) {
  return format(new Date(input), 'yyyy년 M월 d일', { locale: ko });
}
