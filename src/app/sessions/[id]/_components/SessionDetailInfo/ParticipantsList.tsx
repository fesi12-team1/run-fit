'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { sessionQueries } from '@/api/queries/sessionQueries';
import ChevronLeft from '@/assets/icons/chevron-left.svg?react';
import { RoleBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';
import { Session } from '@/types';

interface ParticipantsListProps {
  sessionId: Session['id'];
}

export default function ParticipantsList({ sessionId }: ParticipantsListProps) {
  const participantsQuery = useSuspenseQuery(
    sessionQueries.participants(sessionId)
  );
  const participants = participantsQuery.data?.participants || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ul className="tablet:gap-5 mb-3 flex flex-col gap-2">
        {participants.slice(0, 4).map((participant) => (
          <li key={participant.userId} className="flex items-center gap-3">
            <UserAvatar
              src={participant.profileImage}
              className="size-12 shrink-0"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="text-body3-semibold tablet:text-body2-semibold">
                  {participant.name}
                </span>
                <RoleBadge role={participant.role} />
              </div>
              <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
                {participant.introduction}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {participants.length > 4 && (
        <Button
          variant="neutral"
          size="sm"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          더보기
        </Button>
      )}

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Content
          className="tablet:h-[620px] tablet:w-[400px] bg-gray-800"
          fullscreenWhenMobile
        >
          <Modal.Title className="relative flex w-full items-start gap-2 self-start">
            <Modal.EmptyCloseButton className="tablet:hidden my-0.5 flex">
              <ChevronLeft className="size-6" />
            </Modal.EmptyCloseButton>
            <span className="text-body1-semibold text-white">참여 멤버</span>
            <Modal.CloseButton className="tablet:flex absolute top-0 right-0 my-0.5 hidden" />
          </Modal.Title>
          <hr className="w-full text-gray-700" />
          <ul className="flex h-full w-full flex-col gap-4">
            {participants.map((participant) => (
              <li key={participant.userId} className="flex items-center gap-3">
                <UserAvatar
                  src={participant.profileImage}
                  className="size-12 shrink-0"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-body3-semibold tablet:text-body2-semibold">
                      {participant.name}
                    </span>
                    <RoleBadge role={participant.role} />
                  </div>
                  <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
                    {participant.introduction}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Content>
      </Modal>
    </div>
  );
}
