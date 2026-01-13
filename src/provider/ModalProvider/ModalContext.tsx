'use client';

import { createContext, useContext } from 'react';
import type { ModalContextValue } from './types';

/**
 * 개별 모달 내부에서 사용하는 Context
 * - labelId: ModalTitle에서 사용 (aria-labelledby 연결)
 * - descriptionId: ModalDescription에서 사용 (aria-describedby 연결)
 * - close: 현재 모달 닫기
 */
export const ModalContext = createContext<ModalContextValue | null>(null);

/**
 * 모달 내부 컴포넌트에서 접근성 ID와 close 함수를 가져오는 훅
 * ModalContent, ModalTitle, ModalDescription, ModalCloseButton에서 사용
 */
export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within a Modal');
  return ctx;
}
