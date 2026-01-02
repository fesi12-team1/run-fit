import { BREAKPOINTS } from '@/constants/breakpoints';

export interface ImageSizeConfig {
  [key: string]: string;
}

/**
 * breakpoint별 이미지 크기로 Next.js Image의 sizes 속성을 생성합니다.
 * @param config - breakpoint와 크기를 매핑한 객체 (e.g., { mobile: 302, laptop: 417 })
 * @returns sizes 속성 문자열 (e.g., "(min-width: 1200px) 417px, 302px")
 */
export function generateNextImageSizes(config: ImageSizeConfig): string {
  const breakpointEntries = Object.entries(BREAKPOINTS).sort(
    ([, a], [, b]) => b - a
  ); // 큰 breakpoint부터 정렬

  const sizes = breakpointEntries
    .slice(0, -1) // 가장 작은 breakpoint는 기본값으로 사용
    .map(([bp, px]) => {
      const size = config[bp];
      if (size === undefined) return null;
      return `(min-width: ${px}px) ${size}`;
    })
    .filter((s) => s !== null)
    .join(', ');

  // 기본값 (가장 작은 breakpoint)
  const defaultSize = config.mobile;
  return sizes ? `${sizes}, ${defaultSize}` : `${defaultSize}`;
}
