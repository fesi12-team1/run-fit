'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { crewQueries } from '@/api/queries/crewQueries';
import HeartFill from '@/assets/icons/heart-fill.svg?react';
import HeartOutline from '@/assets/icons/heart-outline.svg?react';
import Location from '@/assets/icons/location.svg?react';
import { DdayBadge, LevelBadge, PaceBadge } from '@/components/ui/Badge';
import { formatTimeToKorean } from '@/lib/time';
import type { Session } from '@/types';
import ProfileList from '../../user/ProfileList';

interface SessionCardProps {
  session: Session;
  displayParticipants?: boolean;
  onLikeButtonClick?: (sessionId: number, liked: boolean) => void;
}

export default function SessionCard({
  session,
  displayParticipants = true,
  onLikeButtonClick,
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
    participants,
    liked,
  } = session;
  const { data: crewData } = useQuery(crewQueries.detail(crewId));

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

  return (
    <li className="relative flex w-full flex-col">
      <div className="absolute top-3 right-3 z-3">
        <button
          type="button"
          onClick={() => onLikeButtonClick?.(sessionId, liked)}
        >
          {liked ? (
            <HeartFill className="text-brand-500 block size-7" />
          ) : (
            <HeartOutline className="block size-7 text-[#9CA3AF]" />
          )}
        </button>
      </div>

      <Link href={`/sessions/${sessionId}`}>
        <div className="tablet:aspect-video relative aspect-165/185 w-full cursor-pointer self-stretch overflow-hidden rounded-lg">
          <Image
            alt="Session"
            className={
              'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80'
            }
            fill
            src={image || '/assets/session-default.png'}
          />
          <div className="pointer-events-none absolute top-3 left-3">
            <DdayBadge dday={ddayText} />
          </div>

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
          <div className="desktop:gap-1 flex items-center gap-0.5">
            <PaceBadge paceSeconds={pace} />
            <LevelBadge level={level} />
          </div>
        </div>
        {displayParticipants && (
          <div className="desktop:gap-2 flex items-center gap-1">
            <ProfileList members={participants || []} />
            <div className="text-caption-regular laptop:text-body3-regular pointer-events-none text-gray-300">
              {crewData?.name
                ? `${currentParticipantCount}/${maxParticipantCount}명 • ${crewData.name}`
                : `${currentParticipantCount}/${maxParticipantCount}명`}
            </div>
          </div>
        )}
      </Link>
    </li>
  );
}
