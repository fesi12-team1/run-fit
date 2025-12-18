'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import Liked from '@/assets/icons/liked.svg?react';
import Location from '@/assets/icons/location.svg?react';
import { formatTimeToKorean } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { Session } from '@/types';
import { DdayBadge, LevelBadge, PaceBadge } from '../../ui/Badge';
import ProfileList from '../../user/ProfileList';

interface SessionCardProps {
  session: Session;
  displayParticipants?: boolean;
}

export default function SessionCard({
  session,
  displayParticipants = true,
}: SessionCardProps) {
  const {
    crewId,
    id: sessionId,
    registerBy,
    sessionAt,
    image,
    city,
    name,
    pace,
    level,
    currentParticipantCount,
    maxParticipantCount,
  } = session;
  const { data: crewData } = useQuery(crewQueries.detail(crewId));
  const { data: participantsData } = useQuery({
    ...sessionQueries.participants(sessionId),
    enabled: displayParticipants && !!sessionId,
  });

  const today = new Date();
  const registerByDate = new Date(registerBy);
  const timeDiff = registerByDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const ddayText =
    timeDiff < 0 ? '마감됨' : dayDiff > 0 ? `마감 D-${dayDiff}` : '마감 D-Day';

  const sessionAtDate = new Date(sessionAt);
  const sessionDate = `${sessionAtDate.getMonth() + 1}월 ${sessionAtDate.getDate()}일`;
  const sessionTime = formatTimeToKorean(
    sessionAtDate.getHours(),
    sessionAtDate.getMinutes()
  );

  const levelMap: Record<string, 'easy' | 'medium' | 'hard'> = {
    BEGINNER: 'easy',
    INTERMEDIATE: 'medium',
    ADVANCED: 'hard',
  };
  const levelValue = levelMap[level] || 'easy';

  return (
    <div className="flex w-full flex-col">
      <div className="tablet:aspect-video relative aspect-165/185 w-full cursor-pointer self-stretch overflow-hidden rounded-lg">
        <Link href={`/sessions/${sessionId}`}>
          <Image
            src={image || '/assets/session-default.png'}
            alt="Session"
            fill
            className={cn(
              'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80',
              image ? 'shadow-sm' : 'border border-gray-500'
            )}
          />
        </Link>
        {/* prettier-ignore */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <DdayBadge className="tablet:hidden" size="sm">{ddayText}</DdayBadge>
          <DdayBadge className="hidden tablet:inline-flex laptop:hidden" size="md">{ddayText}</DdayBadge>
          <DdayBadge className="hidden laptop:inline-flex" size="lg">{ddayText}</DdayBadge>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // TODO: 좋아요 기능 구현
          }}
          className="absolute top-3 right-3"
        >
          <Liked className="stroke-offset-[-0.50px] size-6 fill-neutral-900/50 stroke-sky-100 stroke-1" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
          <Location className="size-4 fill-gray-200" />
          <div className="text-caption-medium laptop:text-body3-medium text-gray-200">
            {city}
          </div>
        </div>
      </div>

      <div className="mobile:mb-2 desktop:mt-[18px] pointer-events-none my-3">
        <span className="text-body3-semibold tablet:text-body2-semibold laptop:text-title3-semibold mb-0.5 line-clamp-1 text-gray-50">
          {name}
        </span>
        <div className="text-caption-regular tablet:text-body3-regular mobile:mb-1 mb-2 text-gray-300">
          {`${sessionDate} • ${sessionTime}`}
        </div>
        {/* prettier-ignore */}
        <div className="flex gap-0.5 desktop:gap-1 items-center">
          <PaceBadge pace={pace} size="sm" className="tablet:hidden" />
          <LevelBadge level={levelValue} size="sm" className="tablet:hidden" />
          <PaceBadge pace={pace} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <LevelBadge level={levelValue} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <PaceBadge pace={pace} size="lg" className="hidden laptop:inline-flex" />
          <LevelBadge level={levelValue} size="lg" className="hidden laptop:inline-flex" />
        </div>
      </div>
      {displayParticipants && (
        <div className="desktop:gap-2 flex items-center gap-1">
          <ProfileList members={participantsData?.participants || []} />
          <div className="text-caption-regular laptop:text-body3-regular pointer-events-none text-gray-300">
            {crewData?.name
              ? `${currentParticipantCount}/${maxParticipantCount}명 • ${crewData.name}`
              : `${currentParticipantCount}/${maxParticipantCount}명`}
          </div>
        </div>
      )}
    </div>
  );
}
