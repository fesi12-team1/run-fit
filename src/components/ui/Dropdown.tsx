'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg';
import { cn } from '@/lib/utils';

type DropdownSize = 'sm' | 'lg';

const DropdownSizeContext = React.createContext<DropdownSize>('sm');

function useDropdownSize() {
  return React.useContext(DropdownSizeContext);
}

export default function Dropdown({
  size = 'sm',
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  size?: DropdownSize;
}) {
  return (
    <DropdownSizeContext.Provider value={size}>
      <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
    </DropdownSizeContext.Provider>
  );
}

function DropdownTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  const size = useDropdownSize();

  const isLarge = size === 'lg';

  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      className={cn(
        isLarge
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
        width={isLarge ? 24 : 16}
        height={isLarge ? 24 : 16}
        className="group-data-[state=open]:text-brand-200 text-gray-200 group-data-[state=open]:rotate-180"
      />
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownTriggerNoArrow({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger asChild {...props}>
      <button type="button" className={cn('outline-none', className)}>
        {children}
      </button>
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownContent({
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
          'min-w-(--radix-dropdown-menu-trigger-width)',
          'max-h-[300px] overflow-y-auto',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownItem({
  className,
  selected = false,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  selected?: boolean;
}) {
  const size = useDropdownSize();
  const isLarge = size === 'lg';

  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        isLarge ? 'text-body2-regular' : 'text-body3-regular',
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

Dropdown.Trigger = DropdownTrigger;
Dropdown.TriggerNoArrow = DropdownTriggerNoArrow;
Dropdown.Content = DropdownContent;
Dropdown.Item = DropdownItem;
