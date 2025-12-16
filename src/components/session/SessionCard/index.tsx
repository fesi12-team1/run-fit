'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import { sessionQueries } from '@/api/queries/sessionQueries';
import Liked from '@/assets/icons/liked.svg';
import Location from '@/assets/icons/location.svg';
import { formatTimeToKorean } from '@/lib/time';
import { cn } from '@/lib/utils';
import type { Session } from '@/types';
import { DdayBadge, LevelBadge, PaceBadge } from '../../ui/Badge';
import ProfileList from '../../user/ProfileList';

interface SessionCardProps {
  data: Session;
}

export default function SessionCard({ data: session }: SessionCardProps) {
  const { data: crewData } = useQuery(crewQueries.detail(session.crewId));
  const { data: sessionParticipants } = useQuery(
    sessionQueries.participants(session.id)
  );

  const today = new Date();
  const registerByDate = new Date(session.registerBy);
  const timeDiff = registerByDate.getTime() - today.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  const ddayText =
    dayDiff > 0 ? `마감 D-${dayDiff}` : dayDiff === 0 ? '마감 D-Day' : '마감됨';

  const sessionAtDate = new Date(session.sessionAt);
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
  const level = levelMap[session.level] || 'easy';

  return (
    <section className="flex w-full flex-col">
      <Link
        href={{ pathname: '/sessions/[id]', query: { id: session.id } }}
        className="tablet:aspect-video relative aspect-165/185 w-full cursor-pointer self-stretch overflow-hidden rounded-lg"
      >
        <Image
          src={session.image || '/assets/session-empty.png'}
          alt="Session"
          fill
          className={cn(
            'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80',
            session.image ? 'shadow-sm' : 'border border-gray-500'
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
            {session.city}
          </div>
        </div>
      </Link>
      <div className="mobile:mb-2 desktop:mt-[18px] pointer-events-none my-3">
        <span className="text-body3-semibold tablet:text-body2-semibold laptop:text-title3-semibold mb-0.5 line-clamp-1 text-gray-50">
          {session.name}
        </span>
        <div className="text-caption-regular tablet:text-body3-regular mobile:mb-1 mb-2 text-gray-300">
          {`${sessionDate} • ${sessionTime}`}
        </div>
        {/* prettier-ignore */}
        <div className="flex gap-0.5 desktop:gap-1 items-center">
          <PaceBadge pace={session.pace} size="sm" className="tablet:hidden" />
          <PaceBadge pace={session.pace} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <PaceBadge pace={session.pace} size="lg" className="hidden laptop:inline-flex" />
          <LevelBadge level={level} size="sm" className="tablet:hidden" />
          <LevelBadge level={level} size="md" className="hidden tablet:inline-flex laptop:hidden" />
          <LevelBadge level={level} size="lg" className="hidden laptop:inline-flex" />
        </div>
      </div>

      <div className="desktop:gap-2 flex items-center gap-1">
        <ProfileList data={sessionParticipants?.participants || []} />
        <div className="text-caption-regular laptop:text-body3-regular pointer-events-none text-gray-300">
          {crewData?.name
            ? `${session.currentParticipantCount}/${session.maxParticipantCount}명 • ${crewData.name}`
            : `${session.currentParticipantCount}/${session.maxParticipantCount}명`}
        </div>
      </div>
    </section>
  );
}
