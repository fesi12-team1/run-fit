import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

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
