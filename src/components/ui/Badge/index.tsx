import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import Level from '@/assets/icons/level.svg?react';
import { formatPaceText, secondsToMinutes } from '@/lib/pace';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none overflow-hidden font-semibold pointer-events-none',
  {
    variants: {
      variant: {
        dday: 'text-brand-600 bg-linear-to-br from-[rgba(247,223,249,1)] via-[rgba(223,229,249,1)] to-[rgba(186,186,250,1)]',
        level: 'bg-gray-800',
        pace: 'bg-blue-950 text-blue-300',
      },
      size: {
        sm: 'rounded-sm px-1 py-0.5 text-[10px] font-semibold',
        md: 'rounded-md px-2 py-1 text-[12px] font-semibold',
        lg: 'rounded-lg px-2 py-1 text-[14px] font-semibold',
      },
    },
    defaultVariants: {
      variant: 'level',
      size: 'sm',
    },
  }
);

type BaseBadgeProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode;
  variant?: VariantProps<typeof badgeVariants>['variant'];
  size: NonNullable<VariantProps<typeof badgeVariants>['size']>;
};

type LevelBadgeProps = BaseBadgeProps & {
  variant: 'level';
  level: 'easy' | 'medium' | 'hard';
  pace?: never;
};

type PaceBadgeProps = BaseBadgeProps & {
  variant: 'pace';
  pace: number;
  level?: never;
};

type DdayBadgeProps = BaseBadgeProps & {
  variant: 'dday';
  level?: never;
  pace?: never;
};

type BadgeProps = LevelBadgeProps | PaceBadgeProps | DdayBadgeProps;

export default function Badge({
  className,
  variant,
  size,
  children,
  ...rest
}: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PaceBadge({
  className,
  pace,
  size,
}: Omit<PaceBadgeProps, 'variant'>) {
  return (
    <Badge variant="pace" pace={pace} size={size} className={className}>
      {formatPaceText(...secondsToMinutes(pace ?? 0))}
    </Badge>
  );
}

export function LevelBadge({
  className,
  level,
  size,
}: Omit<LevelBadgeProps, 'variant'>) {
  const iconSize = {
    sm: 'size-3',
    md: 'size-3',
    lg: 'size-4',
  };
  const fillColor = {
    easy: 'fill-gray-200',
    medium: 'fill-[#F2B48A]',
    hard: 'fill-[#FF819E]',
  };
  const textColor = {
    easy: 'text-gray-200',
    medium: 'text-[#F2B48A]',
    hard: 'text-[#FF819E]',
  };
  const text = {
    easy: '초급',
    medium: '중급',
    hard: '고급',
  };
  return (
    <Badge variant="level" level={level} size={size} className={className}>
      <Level className={cn(iconSize[size], fillColor[level])} />
      <span className={textColor[level]}>{text[level]}</span>
    </Badge>
  );
}

export function DdayBadge({
  className,
  size,
  children,
}: Omit<DdayBadgeProps, 'variant'>) {
  return (
    <Badge variant="dday" size={size} className={className}>
      {children}
    </Badge>
  );
}
