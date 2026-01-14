'use client';

import { createContext, useContext, useId } from 'react';

/**
 * 개별 모달 내부에서 사용하는 Context
 * - labelId: ModalTitle에서 사용 (aria-labelledby 연결)
 * - descriptionId: ModalDescription에서 사용 (aria-describedby 연결)
 * - close: 현재 모달 닫기
 */
export const ModalContext = createContext<ModalContextValue | null>(null);

/** 개별 모달 내부에서 사용하는 Context 값 */
export interface ModalContextValue {
  /** aria-labelledby 연결용 ID */
  labelId: string;
  /** aria-describedby 연결용 ID */
  descriptionId: string;
  /** 현재 모달 닫기 */
}

export default function ModalContextProvider() {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <ModalContext.Provider
      value={{ labelId, descriptionId }}
    ></ModalContext.Provider>
  );
}

/**
 * 모달 내부 컴포넌트에서 접근성 ID와 close 함수를 가져오는 훅
 * ModalContent, ModalTitle, ModalDescription, ModalCloseButton에서 사용
 */
export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within a Modal');
  return ctx;
}
