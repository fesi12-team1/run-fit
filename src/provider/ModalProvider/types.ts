import type React from 'react';

/** 모달 스택에 저장되는 모달 정보 */
export type Modal = {
  id: string;
  render: () => React.ReactNode;
};

/** 개별 모달 내부에서 사용하는 Context 값 */
export interface ModalContextValue {
  /** aria-labelledby 연결용 ID */
  labelId: string;
  /** aria-describedby 연결용 ID */
  descriptionId: string;
  /** 현재 모달 닫기 */
  close: () => void;
}
