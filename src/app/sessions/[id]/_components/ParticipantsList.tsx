import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { sessionQueries } from '@/api/queries/sessionQueries';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';

export default function ParticipantsList({ sessionId }: { sessionId: number }) {
  const participantsQuery = useQuery(sessionQueries.participants(sessionId));
  const participants = participantsQuery.data?.participants || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (participantsQuery.isLoading) return <h1>Loading...</h1>;

  return (
    <div className="tablet:gap-2 flex flex-col gap-1">
      <h2 className="text-body2-semibold tablet:text-title3-semibold text-gray-50">
        참여 멤버&nbsp;
        <span className="text-brand-300">{participants.length}</span>
      </h2>

      {participantsQuery.isError ? (
        <div className="h-10">
          {participantsQuery.error?.message === 'UNAUTHORIZED'
            ? '참가자 목록을 보려면 로그인이 필요합니다.'
            : '참가자 목록을 불러올 수 없습니다.'}
        </div>
      ) : (
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
                  <Badge size="sm" variant="dday">
                    {participant.role}
                  </Badge>
                </div>
                <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
                  {participant.introduction}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Button
        variant="neutral"
        size="sm"
        className="w-full"
        onClick={() => setIsModalOpen(true)}
      >
        더보기
      </Button>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Content
          className="tablet:h-[620px] bg-gray-800"
          fullscreenWhenMobile
        >
          <Modal.CloseButton />
          <Modal.Title>참여 멤버</Modal.Title>
          <hr className="w-full text-gray-700" />
          <ul className="flex h-full flex-col gap-4">
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
                    <Badge size="sm" variant="dday">
                      {participant.role}
                    </Badge>
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
