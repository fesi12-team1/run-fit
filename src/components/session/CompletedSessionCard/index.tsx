import Link from 'next/link';
import Location from '@/assets/icons/location.svg?react';
import Star from '@/assets/icons/star.svg?react';
import { LevelBadge, PaceBadge } from '@/components/ui/Badge';
import SafeImage from '@/components/ui/SafeImage';
import { formatTimeToKorean } from '@/lib/time';
import { cn } from '@/lib/utils';
import { Session } from '@/types';

interface CompletedSessionCardProps {
  session: Session;
  size?: 'lg' | 'sm';
  showRanks?: boolean;
  showBadges?: boolean;
  action?: React.ReactNode;
  actionPlacement?: 'side' | 'bottom';
}

export default function CompletedSessionCard({
  session,
  size = 'sm',
  showRanks = true,
  showBadges = true,
  action,
  actionPlacement = 'side',
}: CompletedSessionCardProps) {
  const sessionAtDate = new Date(session.sessionAt);
  const sessionDate = `${sessionAtDate.getMonth() + 1}월 ${sessionAtDate.getDate()}일`;
  const sessionTime = formatTimeToKorean(
    sessionAtDate.getHours(),
    sessionAtDate.getMinutes()
  );

  return (
    <div className="flex w-full items-center">
      <div className="flex w-full items-center gap-3">
        <Link href={`/sessions/${session.id}`}>
          <div
            className={cn(
              'relative cursor-pointer self-stretch overflow-hidden rounded-lg',
              size === 'sm' && 'h-[90px] w-[126px]',
              size === 'lg' && 'h-[92px] w-[148px]'
            )}
          >
            <SafeImage
              alt="Session"
              className={cn(
                'rounded-xl object-cover transition-opacity duration-300 hover:opacity-80',
                session.image ? 'shadow-sm' : 'border border-gray-500'
              )}
              fallbackSrc="/assets/session-default.png"
              fill
              src={session.image}
            />
            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-0.5">
              <Location className="size-3 fill-gray-200" />
              <div className="text-caption-medium line-clamp-1 text-gray-200">
                {session.location || session.city}
              </div>
            </div>
          </div>
        </Link>
        <div className="pointer-events-none flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div>
              <span
                className={cn(
                  'line-clamp-1 text-gray-200',
                  size === 'sm' && 'text-body3-semibold',
                  size === 'lg' && 'text-body2-semibold'
                )}
              >
                {session.name}
              </span>
              <div
                className={cn(
                  'text-caption-regular text-gray-300',
                  size === 'sm' && 'text-caption-regular',
                  size === 'lg' && 'text-body3-regular'
                )}
              >
                {`${sessionDate} • ${sessionTime}`}
              </div>
            </div>
            {showBadges && (
              <div className="flex items-center gap-0.5">
                <PaceBadge paceSeconds={session.pace} size={size} />
                <LevelBadge level={session.level} size={size} />
              </div>
            )}
          </div>
          {action && actionPlacement === 'bottom' && (
            <div className="pointer-events-auto">{action}</div>
          )}
          {showRanks && (
            <div className="flex items-center gap-0.5">
              <Star className="size-3 fill-gray-100" />
              <span className="text-caption-medium text-gray-50">
                {session.ranks || 0}
              </span>
            </div>
          )}
        </div>
      </div>

      {action && actionPlacement === 'side' && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  );
}
