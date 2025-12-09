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
