import Image from 'next/image';
import Link from 'next/link';
import Location from '@/assets/icons/location.svg?react';
import Star from '@/assets/icons/star.svg?react';
import { LevelBadge, PaceBadge } from '@/components/ui/Badge';
import { formatTimeToKorean } from '@/lib/time';
import { cn } from '@/lib/utils';
import { Session } from '@/types';

interface CompletedSessionCardProps {
  session: Session;
  size?: 'lg' | 'sm';
}

export default function CompletedSessionCard({
  session,
  size = 'sm',
}: CompletedSessionCardProps) {
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
  const levelValue = levelMap[session.level] || 'easy';

  return (
    <div className="flex w-full items-center gap-3">
      <Link href={`/sessions/${session.id}`}>
        <div
          className={cn(
            'relative cursor-pointer self-stretch overflow-hidden rounded-lg',
            size === 'sm' && 'h-[90px] w-[126px]',
            size === 'lg' && 'h-[92px] w-[148px]'
          )}
        >
          <Image
            src={session.image || '/assets/session-default.png'}
            alt="Session"
            fill
            className={cn(
              'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80',
              session.image ? 'shadow-sm' : 'border border-gray-500'
            )}
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-0.5 md:gap-1">
            <Location className="size-4 fill-gray-200" />
            <div
              className={cn(
                'text-caption-regular text-gray-300',
                size === 'sm' && 'mb-1',
                size === 'lg' && 'mb-2'
              )}
            >
              {session.city}
            </div>
          </div>
        </div>
      </Link>
      <div className="pointer-events-none flex flex-col justify-between gap-3">
        <div>
          <span
            className={cn(
              'text-body3-semibold mb-0.5 line-clamp-1 text-gray-50',
              size === 'sm' && 'text-body3-semibold',
              size === 'lg' && 'text-body2-semibold'
            )}
          >
            {session.name}
          </span>
          <div
            className={cn(
              'text-caption-regular text-gray-300',
              size === 'sm' && 'text-caption-regular mb-1',
              size === 'lg' && 'text-body3-regular mb-2'
            )}
          >
            {`${sessionDate} • ${sessionTime}`}
          </div>
          {/* prettier-ignore */}
          <div className="flex gap-0.5 desktop:gap-1 items-center">
            <PaceBadge pace={session.pace} size={size} />
            <LevelBadge level={levelValue} size={size} />
          </div>
        </div>
        <div className="flex items-center">
          <Star className="size-3 gap-0.5 fill-gray-100" />
          <span className="text-caption-medium text-gray-100">
            {'5.0 session.avgRank'}
          </span>
          {/*
          TODO:
          - Session 데이터에 세션 평점이 누락되어 있음
          - 전체적인 DTO 정리 후 수정 요청 필요
          */}
        </div>
      </div>
    </div>
  );
}
