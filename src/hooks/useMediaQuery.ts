import { useSyncExternalStore } from 'react';

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 744,
  laptop: 1200,
  desktop: 1400,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

type BreakpointQuery =
  | { min: Exclude<Breakpoint, 'mobile'>; max?: never }
  | { min: 'tablet'; max: 'laptop' | 'desktop' }
  | { min: 'laptop'; max: 'desktop' }
  | { min?: never; max: Exclude<Breakpoint, 'mobile'> };
/**
 * 현재 뷰포트가 설정한 media query와 일치하는지 여부를 반환하는 훅입니다.
 *
 * @param input - 브레이크포인트 쿼리 객체. 예: { min: 'tablet' } 또는 { min: 'tablet', max: 'laptop' } 또는 {max: 'laptop'}
 * @returns 뷰포트가 media query와 일치하면 `true`, 그렇지 않으면 `false`.
 *
 * @example
 * const isTabletUp = useMediaQuery({ min: 'tablet' });
 * const isTabletOnly = useMediaQuery({ min: 'tablet', max: 'laptop' });
 * const isLaptopDown = useMediaQuery({ max: 'laptop' });
 */
export function useMediaQuery(input: BreakpointQuery) {
  const query = buildMediaQuery(input);
  const subscribe = (onStoreChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', onStoreChange);
    // console.log('mql.addEventListener');

    return () => {
      mql.removeEventListener('change', onStoreChange);
      // console.log('mql.removeEventListener');
    };
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const maxWidthExclusive = (px: number) => `${px - 0.02}px`;

// helper function
function buildMediaQuery(input: BreakpointQuery) {
  // max만 있는 경우
  if (input.min === undefined && input.max !== undefined) {
    const maxPx = BREAKPOINTS[input.max];
    return `(max-width: ${maxWidthExclusive(maxPx)})`;
  }

  // min만 있는 경우
  if (input.min !== undefined && input.max === undefined) {
    const minPx = BREAKPOINTS[input.min];
    return `(min-width: ${minPx}px)`;
  }

  // min max 둘 다 있는 경우
  if (input.min !== undefined && input.max !== undefined) {
    const minPx = BREAKPOINTS[input.min];
    const maxPx = BREAKPOINTS[input.max];
    return `(min-width: ${minPx}px) and (max-width: ${maxWidthExclusive(maxPx)})`;
  }

  return '';
}
