/** 모달 스택에 저장되는 모달 정보 */
export type Modal = {
  id: string;
  render: () => React.ReactNode;
};
