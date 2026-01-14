'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import { RoleBadge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import {
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
} from '@/components/ui/ModalContent';
import UserAvatar from '@/components/ui/UserAvatar';
import { useModal } from '@/provider/ModalProvider';
import { Session, type CrewMember } from '@/types';

interface ParticipantsListProps {
  sessionId: Session['id'];
}

export default function ParticipantsList({ sessionId }: ParticipantsListProps) {
  const participantsQuery = useSuspenseQuery(
    sessionQueries.participants(sessionId)
  );
  const participants = participantsQuery.data?.participants || [];

  const modal = useModal();
  const handleClickMore = () => {
    modal.open('participants-modal', () => (
      <ParticipantsModalContent participants={participants} />
    ));
  };

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
          onClick={handleClickMore}
        >
          더보기
        </Button>
      )}
    </div>
  );
}

function ParticipantsModalContent({
  participants,
}: {
  participants: CrewMember[];
}) {
  return (
    <ModalContent
      className="tablet:h-[620px] tablet:w-[400px] bg-gray-800"
      fullscreenWhenMobile
    >
      <ModalCloseButton className="tablet:flex top-6 right-6 hidden" />
      <ModalHeader className="relative flex w-full items-start gap-2 self-start">
        <ModalTitle className="text-body1-semibold">참여 멤버</ModalTitle>
      </ModalHeader>
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
    </ModalContent>
  );
}
