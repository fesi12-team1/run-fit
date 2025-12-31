import LevelIcon from '@/assets/icons/level.svg?react';
import { formatPaceText, splitSecondsToMinutesAndSeconds } from '@/lib/pace';
import { cn } from '@/lib/utils';
import { CrewMemberRole } from '@/types';
import { type SessionLevel } from '@/types/session';

type BaseBadgeProps = React.ComponentProps<'div'>;

function BaseBadge({ className, children, ...props }: BaseBadgeProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

type PaceBadgeProps = BaseBadgeProps & {
  paceSeconds: number;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
};

export function PaceBadge({
  paceSeconds,
  size = 'responsive',
  className,
  ...props
}: PaceBadgeProps) {
  const baseStyle = 'bg-brand-900 text-brand-100';

  const badgeSize = {
    sm: 'rounded-sm px-1.5 py-0.5',
    md: 'rounded-md px-2 py-1',
    lg: 'rounded-lg px-2 py-1',
    responsive:
      'laptop:rounded-lg laptop:px-2 laptop:py-1 tablet:rounded-md tablet:px-2 tablet:py-1 rounded-sm px-1.5 py-0.5',
  };

  const textSize = {
    sm: 'text-[10px]/[16px] font-medium',
    md: 'text-caption-medium',
    lg: 'text-body3-medium',
    responsive:
      'laptop:text-body3-medium tablet:text-caption-medium text-[10px]/[16px] font-medium',
  };

  return (
    <BaseBadge
      className={cn(className, baseStyle, badgeSize[size], textSize[size])}
      {...props}
    >
      {formatPaceText(splitSecondsToMinutesAndSeconds(paceSeconds))}
    </BaseBadge>
  );
}

type LevelBadgeProps = BaseBadgeProps & {
  level: SessionLevel;
  size?: 'sm' | 'md' | 'lg' | 'responsive';
};

export function LevelBadge({
  level,
  size = 'responsive',
  className,
  ...props
}: LevelBadgeProps) {
  const iconSize = {
    sm: 'size-3',
    md: 'size-3',
    lg: 'size-4',
    responsive: 'laptop:size-4 size-3',
  };

  const baseStyle = 'bg-gray-800 flex gap-0.5 items-center';

  const badgeSize = {
    sm: 'rounded-sm px-1 py-0.5',
    md: 'rounded-md px-2 py-1',
    lg: 'rounded-lg px-2 py-1',
    responsive:
      'laptop:rounded-lg laptop:px-2 laptop:py-1 tablet:rounded-md tablet:px-2 tablet:py-1 rounded-sm px-1 py-0.5',
  };

  const textSize = {
    sm: 'text-[10px]/[16px] font-medium',
    md: 'text-caption-medium',
    lg: 'text-body3-medium',
    responsive:
      'laptop:text-body3-medium tablet:text-caption-medium text-[10px]/[16px] font-medium',
  };

  const textColor = {
    BEGINNER: 'text-level-beginner',
    INTERMEDIATE: 'text-level-intermediate',
    ADVANCED: 'text-level-advanced',
  };

  const text = {
    BEGINNER: '초급',
    INTERMEDIATE: '중급',
    ADVANCED: '고급',
  };

  return (
    <BaseBadge
      className={cn(className, baseStyle, badgeSize[size], textColor[level])}
      {...props}
    >
      <LevelIcon className={cn(iconSize[size])} />
      <span className={cn(textSize[size])}>{text[level]}</span>
    </BaseBadge>
  );
}

type DdayBadgeProps = BaseBadgeProps & {
  dday: string;
  size?: 'md' | 'lg' | 'responsive';
};

export function DdayBadge({
  dday,
  size = 'responsive',
  className,
  ...props
}: DdayBadgeProps) {
  const baseStyle =
    'text-brand-600 bg-linear-to-br from-[rgba(247,223,249,1)] via-[rgba(223,229,249,1)] to-[rgba(186,186,250,1)]';

  const badgeSize = {
    md: 'rounded-sm px-1.5 py-0.5',
    lg: 'rounded-lg px-2 py-1',
    responsive:
      'laptop:rounded-lg laptop:px-2 laptop:py-1 rounded-sm px-1.5 py-0.5',
  };

  const textSize = {
    md: 'text-[10px]/[16px] font-semibold',
    lg: 'text-body3-semibold',
    responsive: 'laptop:text-body3-semibold text-[10px]/[16px] font-semibold',
  };

  return (
    <BaseBadge
      className={cn(className, baseStyle, badgeSize[size], textSize[size])}
      {...props}
    >
      {dday}
    </BaseBadge>
  );
}

type RoleBadgeProps = BaseBadgeProps & {
  role: CrewMemberRole;
};

export function RoleBadge({ role, className, ...props }: RoleBadgeProps) {
  const baseStyle = 'px-2 py-1 rounded-md';

  const roleStyles = {
    LEADER: 'bg-brand-900 text-brand-200 text-[10px]/[100%] font-bold',
    STAFF: 'bg-gray-700 text-gray-200 text-[10px]/[100%] font-semibold',
    MEMBER: 'hidden',
  };

  const text = {
    LEADER: '크루장',
    STAFF: '운영진',
    MEMBER: '',
  };

  return (
    <BaseBadge
      className={cn(className, baseStyle, roleStyles[role])}
      {...props}
    >
      {text[role]}
    </BaseBadge>
  );
}
