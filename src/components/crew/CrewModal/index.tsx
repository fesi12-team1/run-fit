'use client';

import { ChevronLeft } from 'lucide-react';
import CrewForm from '@/components/crew/CrewForm';
import Modal from '@/components/ui/Modal';
import { Crew } from '@/types';

interface CreateCrewModalProps {
  mode: 'create';
  open: boolean;
  crewData?: undefined;
  handleCloseModal: () => void;
  handleSuccess: () => void;
}
interface EditCrewModalProps {
  mode: 'edit';
  open: boolean;
  crewData: Crew;
  handleCloseModal: () => void;
  handleSuccess: () => void;
}
type CrewModalProps = CreateCrewModalProps | EditCrewModalProps;

export default function CrewModal({
  mode,
  open,
  crewData,
  handleCloseModal,
  handleSuccess = () => {},
}: CrewModalProps) {
  return (
    <Modal open={open} onOpenChange={() => handleCloseModal()}>
      <Modal.Content className="tablet:w-[484px] tablet:gap-4 tablet:h-fit tablet:overflow-hidden tablet:items-center h-dvh w-full items-start bg-gray-800">
        <Modal.Header className="relative flex items-center justify-center">
          <button
            className="tablet:hidden absolute left-0"
            onClick={() => handleCloseModal()}
          >
            <ChevronLeft aria-label="뒤로 가기" className="size-6 text-white" />
          </button>

          <Modal.Title className="tablet:m-0 ml-7">
            {mode === 'create' && '크루 생성하기'}
            {mode === 'edit' && '크루 수정하기'}
          </Modal.Title>
        </Modal.Header>

        <Modal.CloseButton
          className="tablet:block top-[26px] right-6 hidden"
          onClick={() => handleCloseModal()}
        />

        <div className="scrollbar-hidden w-full overflow-y-auto px-0.5">
          {mode === 'create' && (
            <CrewForm
              defaultValues={{
                name: '',
                description: '',
                city: '서울',
                image: undefined,
              }}
              handleSuccess={handleSuccess}
              mode="create"
            />
          )}

          {mode === 'edit' && (
            <CrewForm
              crewId={crewData.id}
              defaultValues={{
                name: crewData.name,
                description: crewData.description,
                city: crewData.city,
                image: crewData.image || undefined,
              }}
              handleSuccess={handleSuccess}
              mode="edit"
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}
