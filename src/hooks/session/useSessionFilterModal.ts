import { useSessionFilterContext } from '@/provider/SessionFilterProvider';
import { SessionTabKey } from '@/types';
import { useMediaQuery } from '../useMediaQuery';

/**
 * 모바일에서 세션 필터 모달 열기 및 현재 모달 탭 확인 훅
 * @param tabKey 열고자 하는 탭 키
 * @returns 모달 관련 상태 및 함수
 */
export function useSessionFilterModal(tabKey: SessionTabKey) {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const { openModalTab, isModalOpen, modalTab } = useSessionFilterContext();

  const openFilterModal = () => {
    if (isMobile) openModalTab(tabKey);
  };

  const isActiveModalTab = (currentTab: SessionTabKey) => {
    return isModalOpen && modalTab === currentTab;
  };

  return { isMobile, openFilterModal, isModalOpen, modalTab, isActiveModalTab };
}
