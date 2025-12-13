'use client';

import { Label } from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import Checkbox from '@/components/ui/Checkbox';
import { cn } from '@/lib/utils';

interface SessionLevelCardProps {
  label: string;
  description: string;
  size?: 'md' | 'sm';
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const sessionLevelCardVariants = cva(
  [
    'relative flex w-[327px] items-start gap-2 rounded-lg outline-1 bg-gray-800 outline-gray-750',
    'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/40',
  ].join(' '),
  {
    variants: {
      size: {
        md: 'min-h-[74px] pt-5 pb-4 px-3',
        sm: 'min-h-[64px] py-3 px-3',
      },
      checked: {
        true: 'outline-brand-400 outline-2',
        false: 'outline-gray-750 hover:outline-brand-900',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-60 hover:outline-gray-750',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      checked: false,
      disabled: false,
    },
  }
);

export default function SessionLevelCard({
  label,
  description,
  size = 'md',
  checked,
  disabled = false,
  onClick,
  ...rest
}: SessionLevelCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      className={cn(sessionLevelCardVariants({ size, checked, disabled }))}
      {...rest}
    >
      <Label className="flex w-full items-start justify-between gap-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <p
            className={cn(
              size === 'md' ? 'text-body2-semibold' : 'text-body3-semibold',
              'text-white'
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              size === 'md' ? 'text-body3-medium' : 'text-caption-medium',
              'text-gray-300'
            )}
          >
            {description}
          </p>
        </div>
        <Checkbox
          aria-hidden="true"
          checked={checked}
          rounded
          tabIndex={-1}
          className="pointer-events-none absolute top-3 right-3"
        />
      </Label>
    </div>
  );
}
