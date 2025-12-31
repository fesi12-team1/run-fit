'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg?react';
import { cn } from '@/lib/utils';

export default function Popover(
  props: React.ComponentProps<typeof PopoverPrimitive.Root>
) {
  return <PopoverPrimitive.Root {...props} />;
}

interface PopoverTriggerProps
  extends React.ComponentProps<typeof PopoverPrimitive.Trigger> {
  size?: 'sm' | 'lg';
  hasSelected?: boolean;
}

function PopoverTrigger({
  className,
  children,
  size = 'sm',
  hasSelected = false,
  ...props
}: PopoverTriggerProps) {
  const isLarge = size === 'lg';

  return (
    <PopoverPrimitive.Trigger
      className={cn(
        isLarge
          ? 'text-body3-medium h-10 gap-2'
          : 'text-caption-medium h-8 gap-1',
        'group flex w-auto items-center justify-between truncate rounded-lg px-3 py-2',
        'bg-gray-800 text-gray-200',
        'border border-transparent',
        // data-[state=open]은 팝오버가 열렸을 때 스타일
        'data-[state=open]:border-brand-500 data-[state=open]:bg-brand-950 data-[state=open]:text-brand-200',
        // hasSelected가 true일 때 스타일 (boolean 체크)
        hasSelected && 'border-brand-500 bg-brand-950 text-brand-200',
        className
      )}
      {...props}
    >
      {children}
      <ArrowDown
        className={cn(
          'group-data-[state=open]:text-brand-200 text-gray-200 group-data-[state=open]:rotate-180',
          hasSelected && 'text-brand-200',
          isLarge ? 'size-6' : 'size-4'
        )}
      />
    </PopoverPrimitive.Trigger>
  );
}

function PopoverContent({
  className,
  sideOffset = 10,
  align = 'start',
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(
          'z-50 overflow-hidden rounded-xl border border-gray-600 bg-gray-700 px-3 py-5',
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
