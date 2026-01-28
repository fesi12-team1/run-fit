'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { crewQueries } from '@/api/queries/crewQueries';
import { userQueries } from '@/api/queries/userQueries';
import VerticalEllipsisIcon from '@/assets/icons/vertical-ellipsis.svg?react';
import { DdayBadge, LevelBadge, PaceBadge } from '@/components/ui/Badge';
import Dropdown from '@/components/ui/Dropdown';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatDDay, formatKoYYMDMeridiemTime } from '@/lib/time';
import { useModalController } from '@/provider/ModalProvider';
import { Session } from '@/types/session';
import SessionActionGroup from '../SessionActionGroup';
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

  return (
    <div className="laptop:bg-gray-750 laptop:rounded-b-[20px] laptop:px-6 laptop:pt-7 laptop:pb-6 laptop:mt-0 tablet:px-12 tablet:pt-10 laptop:gap-8 relative z-10 -mt-5 flex flex-col gap-6 rounded-t-[20px] bg-gray-800 px-7 pt-6">
      <div>
        <div className="mb-1 flex w-full items-center justify-between gap-2">
          <DdayBadge dday={formatDDay(registerBy)} />
          <ErrorBoundary fallback={<div />}>
            <Suspense>
              <SessionActionMenu crewId={crewId} session={session} />
            </Suspense>
          </ErrorBoundary>
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
      <SessionActionGroup className="laptop:flex hidden" session={session} />
    </div>
  );
}

function SessionActionMenu({
  crewId,
  session,
}: {
  crewId: number;
  session: Session;
}) {
  const { data: profile } = useSuspenseQuery(userQueries.me.info());
  const profileId = profile?.id;

  const { data: memberRole } = useQuery({
    ...crewQueries.members(crewId).detail(profileId!),
    enabled: !!profileId,
  });

  const isManager =
    memberRole?.role === 'LEADER' || memberRole?.role === 'STAFF';

  const { open } = useModalController();

  const handleOpenUpdateModal = () => {
    open('session-update-modal', () => (
      <SessionUpdateModal session={session} />
    ));
  };

  const handleOpenDeleteModal = () => {
    open('session-delete-modal', () => (
      <SessionDeleteModal session={session} />
    ));
  };

  return (
    <>
      {isManager && (
        <Dropdown>
          <Dropdown.TriggerNoArrow>
            <VerticalEllipsisIcon className="size-6" />
          </Dropdown.TriggerNoArrow>
          <Dropdown.Content className="z-100">
            <Dropdown.Item onClick={handleOpenUpdateModal}>
              수정하기
            </Dropdown.Item>
            <Dropdown.Item onClick={handleOpenDeleteModal}>
              삭제하기
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      )}
    </>
  );
}
