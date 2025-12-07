'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import { cn } from '@/lib/utils';

export function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export function DropdownMenuTrigger({
  className,
  children,
  size,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  size?: 'sm' | 'lg';
}) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(
        size === 'lg'
          ? 'text-body3-medium h-10 gap-2'
          : 'text-caption-medium h-8 gap-1',
        'group flex items-center justify-between rounded-lg px-3 py-2',
        'bg-gray-800 text-gray-200',
        'border border-transparent',
        'data-[state=open]:border-brand-500 data-[state=open]:bg-brand-950 data-[state=open]:text-brand-200',
        className
      )}
      {...props}
    >
      {children}
      <ArrowDown
        width={size === 'lg' ? 24 : 16}
        height={size === 'lg' ? 24 : 16}
        className="group-data-[state=open]:text-brand-200 text-gray-200 group-data-[state=open]:rotate-180"
      />
    </DropdownMenuPrimitive.Trigger>
  );
}

export function DropdownMenuContent({
  className,
  sideOffset = 4,
  align = 'end',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'overflow-hidden rounded-xl border border-gray-500',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuItem({
  className,
  size,
  selected = false,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  size?: 'sm' | 'lg';
  selected?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        size === 'lg' ? 'text-body2-regular' : 'text-body3-regular',
        'cursor-pointer bg-gray-600 px-4 py-3 text-gray-100 outline-none',
        'transition-colors duration-150 focus:bg-gray-700',
        selected && 'bg-gray-800 text-white',
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Item>
  );
}
