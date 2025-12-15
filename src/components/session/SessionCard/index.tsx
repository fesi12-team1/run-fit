'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import Liked from '@/assets/icons/liked.svg';
import Location from '@/assets/icons/location.svg';
import { formatTimeToKorean } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { Session } from '@/types';
import { DdayBadge, LevelBadge, PaceBadge } from '../../ui/Badge';
import ProfileList from '../../user/ProfileList';

interface SessionCardProps extends Session {
  onClick?: () => void;
}

export default function SessionCard({
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
  onClick,
}: SessionCardProps) {
  const { data: crewData } = useQuery(crewQueries.detail(crewId));
  const { data: participantsData } = useQuery(
    sessionQueries.participants(sessionId)
  );

  const today = new Date();
  const registerByDate = new Date(registerBy);
  const timeDiff = registerByDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const ddayText =
    dayDiff > 0 ? `마감 D-${dayDiff}` : dayDiff === 0 ? '마감 D-Day' : '마감됨';

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
      <section
        onClick={onClick}
        className="tablet:aspect-video relative aspect-165/185 w-full cursor-pointer self-stretch overflow-hidden rounded-lg"
      >
        <Image
          src={image || '/assets/session-empty.png'}
          alt="Session"
          fill
          className={cn(
            'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80',
            image ? 'shadow-sm' : 'border border-gray-500'
          )}
        />
        {/* prettier-ignore */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <DdayBadge className="tablet:hidden" size="sm">{ddayText}</DdayBadge>
          <DdayBadge className="hidden tablet:inline-flex laptop:hidden" size="md">{ddayText}</DdayBadge>
          <DdayBadge className="hidden laptop:inline-flex" size="lg">{ddayText}</DdayBadge>
        </div>
        <button onClick={() => {}} className="absolute top-3 right-3">
          <Liked className="stroke-offset-[-0.50px] size-6 fill-neutral-900/50 stroke-sky-100 stroke-1" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
          <Location className="size-4 fill-gray-200" />
          <div className="text-caption-medium laptop:text-body3-medium text-gray-200">
            {city}
          </div>
        </div>
      </section>

      <section className="mobile:mb-2 desktop:mt-[18px] pointer-events-none my-3">
        <span className="text-body3-semibold tablet:text-body2-semibold laptop:text-title3-semibold mb-0.5 line-clamp-1 text-gray-50">
          {name}
        </span>
        <div className="text-caption-regular tablet:text-body3-regular mobile:mb-1 mb-2 text-gray-300">
          {`${sessionDate} • ${sessionTime}`}
        </div>
        {/* prettier-ignore */}
        <div className="flex gap-0.5 desktop:gap-1 items-center">
          <PaceBadge pace={pace} size="sm" className="tablet:hidden" />
          <PaceBadge pace={pace} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <PaceBadge pace={pace} size="lg" className="hidden laptop:inline-flex" />
          <LevelBadge level={levelValue} size="sm" className="tablet:hidden" />
          <LevelBadge level={levelValue} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <LevelBadge level={levelValue} size="lg" className="hidden laptop:inline-flex" />
      </div>
      </section>

      <section className="desktop:gap-2 flex items-center gap-1">
        <ProfileList data={participantsData?.participants || []} />
        <div className="text-caption-regular laptop:text-body3-regular pointer-events-none text-gray-300">
          {`${currentParticipantCount}/${maxParticipantCount}명 • ${crewData?.name}`}
        </div>
      </section>
    </div>
  );
}
