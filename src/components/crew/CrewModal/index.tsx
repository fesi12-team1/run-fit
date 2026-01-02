'use client';

import { ChevronLeft } from 'lucide-react';
import CrewForm from '@/components/crew/CrewForm';
import Modal from '@/components/ui/Modal';
import { Crew } from '@/types';

interface CrewModalProps {
  mode: 'create' | 'edit';
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crewData?: Crew;
  onSuccess?: () => void;
}

export default function CrewModal({
  mode,
  open,
  onOpenChange,
  crewData,
  onSuccess,
}: CrewModalProps) {
  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <Modal.Content className="tablet:w-[484px] tablet:gap-4 tablet:h-fit tablet:overflow-hidden tablet:items-center h-dvh w-full items-start bg-gray-800">
        <Modal.Header className="relative flex items-center justify-center">
          <button
            className="tablet:hidden absolute left-0"
            onClick={() => onOpenChange(false)}
          >
            <ChevronLeft aria-label="뒤로 가기" className="size-6 text-white" />
          </button>

          <Modal.Title className="tablet:m-0 ml-7">
            {mode === 'create' ? '크루 생성하기' : '크루 수정하기'}
          </Modal.Title>
        </Modal.Header>

        <Modal.CloseButton
          className="tablet:block top-[26px] right-6 hidden"
          onClick={() => onOpenChange(false)}
        />

        <div className="scrollbar-hidden w-full overflow-y-auto px-0.5">
          {open && mode === 'create' && (
            <CrewForm
              defaultValues={{
                name: '',
                description: '',
                city: '서울',
                image: undefined,
              }}
              mode="create"
              onSuccess={handleSuccess}
            />
          )}

          {open && mode === 'edit' && crewData && (
            <CrewForm
              crewId={crewData.id}
              defaultValues={{
                name: crewData.name,
                description: crewData.description,
                city: crewData.city,
                image: crewData.image || undefined,
              }}
              mode="edit"
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
}
