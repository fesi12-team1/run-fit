import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { Coords } from '@/types/kakaoMap';
import { API_SIDO_TO_SIDO_MAP, Sido } from '@/types/region';

// 커스텀 twMerge 함수 생성
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // 폰트 사이즈 관련 커스텀 클래스들을 별도 그룹으로 분리
      'font-size': [
        'text-title3-semibold',
        'text-title3-bold',
        'text-title2-semibold',
        'text-title2-bold',
        'text-title1-semibold',
        'text-title1-bold',
        'text-body1-semibold',
        'text-body1-bold',
        'text-body2-regular',
        'text-body2-medium',
        'text-body2-semibold',
        'text-body2-bold',
        'text-body3-regular',
        'text-body3-medium',
        'text-body3-semibold',
        'text-body3-bold',
        'text-caption-regular',
        'text-caption-medium',
        'text-caption-semibold',
        'text-caption-bold',
      ],
    },
  },
});

// twMerge > customTwMerge 함수 수정
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

/**
 * 카카오맵 링크 생성
 * @param address - 주소 (한글)
 * @param coords - 좌표 { lat, lng }
 * @returns 카카오맵 링크 URL
 */
export function createKakaoMapLink(address: string, coords: Coords): string {
  return `https://map.kakao.com/link/map/${encodeURIComponent(address)},${coords.lat},${coords.lng}`;
}

/**
 * API로 반환한 시도 문자열을 Sido 타입에 맞게 변환합니다.
 * 변환할 수 없는 경우 null을 반환합니다.
 * @example
 * normalizeSido('서울') // '서울'
 * normalizeSido('제주특별자치도') // '제주'
 */
export const normalizeSido = (apiSido: string): Sido | null => {
  return API_SIDO_TO_SIDO_MAP[apiSido] ?? null;
};

/**
 * API로 반환한 시군구 문자열에서 Sigungu 타입에 맞는 부분을 추출합니다.
 * @example
 * extractSigungu('창원시 성산구') // '창원시'
 * extractSigungu('제주시') // '제주시'
 */
export const extractSigungu = (fullAddress: string): string => {
  const parts = fullAddress.split(' ');
  return parts[0];
};

/**
 * 객체에서 `undefined`와 `null` 값을 제거하여 반환합니다.
 *
 * 이 함수는 두 가지 주요 문제를 해결하기 위해 사용됩니다:
 * 1. API 요청 오류 방지: `URLSearchParams` 변환 시 `undefined`가 문자열 "undefined"로 전송되는 것을 막습니다.
 * 2. React Query 캐시 최적화: 객체 키 순서가 달라도 동일한 쿼리 키(Query Key)로 인식되도록 보장하여 불필요한 네트워크 요청을 줄입니다.
 */
export function normalizeParams<T extends object>(params?: T): T {
  if (!params) {
    return {} as T;
  }
  const entries = Object.entries(params as Record<string, unknown>).filter(
    ([, value]) => value !== undefined && value !== null
  );

  return Object.fromEntries(entries) as T;
}

/**
 * 옵션 배열에서 값에 해당하는 레이블을 반환합니다.
 * @param options
 * @param value
 * @returns 옵션의 레이블 또는 undefined
 */
export function getOptionLabel<
  T extends readonly { label: string; value: string | undefined }[],
>(options: T, value?: T[number]['value']) {
  return options.find((option) => option.value === value)?.label;
}
