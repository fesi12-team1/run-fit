'use client';

import { createContext, useContext, useId, type ReactNode } from 'react';

/**
 * 개별 모달 내부에서 사용하는 Context
 * - labelId: ModalTitle에서 사용 (aria-labelledby 연결)
 * - descriptionId: ModalDescription에서 사용 (aria-describedby 연결)
 */

/** 개별 모달 내부에서 사용하는 Context 값 */
export interface IndividualModalContext {
  /** aria-labelledby 연결용 ID */
  labelId: string;
  /** aria-describedby 연결용 ID */
  descriptionId: string;
}

export const IndividualModalContext =
  createContext<IndividualModalContext | null>(null);

export default function IndividualModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const labelId = useId();
  const descriptionId = useId();

  return (
    <IndividualModalContext.Provider value={{ labelId, descriptionId }}>
      {children}
    </IndividualModalContext.Provider>
  );
}

/**
 * 모달 내부 컴포넌트에서 접근성 ID와 close 함수를 가져오는 훅
 * ModalContent, ModalTitle, ModalDescription, ModalCloseButton에서 사용
 */
export function useModalContext() {
  const ctx = useContext(IndividualModalContext);
  if (!ctx) throw new Error('useModalContext must be used within a Modal');
  return ctx;
}
