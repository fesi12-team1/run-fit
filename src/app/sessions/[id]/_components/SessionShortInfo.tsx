import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { crewQueries } from '@/api/queries/crewQueries';
import { userQueries } from '@/api/queries/userQueries';
import VerticalEllipsisIcon from '@/assets/icons/vertical-ellipsis.svg?react';
import { DdayBadge, LevelBadge, PaceBadge } from '@/components/ui/Badge';
import Dropdown from '@/components/ui/Dropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatDDay, formatKoYYMDMeridiemTime } from '@/lib/time';
import { Session } from '@/types/session';
import CopyUrlButton from './CopyUrlButton';
import LikeButton from './LikeButton';
import ParticipateButton from './ParticipateButton';
import SessionDeleteModal from './SessionDeleteModal';
import SessionUpdateModal from './SessionUpdateModal';

export default function SessionShortInfo({
  session,
  crewId,
}: {
  session: Session;
  crewId: number;
}) {
  const {
    registerBy,
    name,
    sessionAt,
    pace,
    level,
    currentParticipantCount,
    maxParticipantCount,
  } = session;
  const { data: profile } = useQuery(userQueries.me.info());
  const profileId = profile?.id;

  const { data: memberRole } = useQuery({
    ...crewQueries.members(crewId).detail(profileId!),
    enabled: !!profileId,
  });

  const isManager =
    memberRole?.role === 'LEADER' || memberRole?.role === 'STAFF';

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="laptop:bg-gray-750 laptop:rounded-b-[20px] laptop:px-6 laptop:pt-7 laptop:pb-6 laptop:mt-0 tablet:px-12 tablet:pt-10 laptop:gap-8 relative z-10 -mt-5 flex flex-col gap-6 rounded-t-[20px] bg-gray-800 px-7 pt-6">
      <div>
        <div className="mb-1 flex w-full items-center justify-between gap-2">
          <DdayBadge dday={formatDDay(registerBy)} />
          {isManager && (
            <Dropdown>
              <Dropdown.TriggerNoArrow>
                <VerticalEllipsisIcon className="size-6" />
              </Dropdown.TriggerNoArrow>
              <Dropdown.Content className="z-100">
                <Dropdown.Item onClick={() => setIsUpdateModalOpen(true)}>
                  수정하기
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setIsDeleteModalOpen(true)}>
                  삭제하기
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          )}
        </div>
        <div className="mb-2">
          <h1 className="text-title3-semibold text-gray-50">{name}</h1>
          <div className="text-body3-regular text-gray-300">
            {formatKoYYMDMeridiemTime(sessionAt)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <PaceBadge paceSeconds={pace} />
          <LevelBadge level={level} />
        </div>
      </div>
      <ProgressBar value={currentParticipantCount} max={maxParticipantCount} />
      <hr className="text-gray-500" />
      <div className="laptop:flex hidden items-center gap-7">
        <div className="flex items-center gap-4">
          <LikeButton liked={session.liked} sessionId={session.id} />
          <CopyUrlButton />
        </div>
        <ParticipateButton className="flex-1" sessionId={session.id} />
      </div>

      <SessionUpdateModal
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        session={session}
      />

      <SessionDeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        sessionId={session.id}
      />
    </div>
  );
}
