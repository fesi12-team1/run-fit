'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as React from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg?react';
import { cn } from '@/lib/utils';

type DropdownSize = 'sm' | 'lg';

type DropdownContextValue = {
  size: DropdownSize;
  hasSelected: boolean;
};

const DropdownContext = React.createContext<DropdownContextValue>({
  size: 'sm',
  hasSelected: false,
});

function useDropdownContext() {
  return React.useContext(DropdownContext);
}

export default function Dropdown({
  size = 'sm',
  hasSelected = false,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root> & {
  size?: DropdownSize;
  hasSelected?: boolean;
}) {
  return (
    <DropdownContext.Provider value={{ size, hasSelected }}>
      <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  const { size, hasSelected } = useDropdownContext();

  const isLarge = size === 'lg';

  return (
    <DropdownMenuPrimitive.Trigger
      className={cn(
        isLarge
          ? 'text-body3-medium h-10 gap-2'
          : 'text-caption-medium h-8 gap-1',
        'group flex items-center justify-between rounded-lg px-3 py-2',
        'bg-gray-800 text-gray-200',
        'border border-transparent',
        'data-[state=open]:border-brand-500 data-[state=open]:bg-brand-950 data-[state=open]:text-brand-200',
        'shrink-0',
        hasSelected && 'border-brand-500 bg-brand-950 text-brand-200',
        className
      )}
      data-slot="dropdown-menu-trigger"
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
      <button className={cn('outline-none', className)} type="button">
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
        align={align}
        className={cn(
          'overflow-hidden rounded-xl border border-gray-500',
          'min-w-(--radix-dropdown-menu-trigger-width)',
          'max-h-[300px] overflow-y-auto',
          className
        )}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
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
  const { size } = useDropdownContext();
  const isLarge = size === 'lg';

  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        isLarge ? 'text-body2-regular' : 'text-body3-regular',
        'cursor-pointer bg-gray-600 px-4 py-3 text-gray-100 outline-none',
        'transition-colors duration-150 focus:bg-gray-700',
        selected && 'bg-gray-800 text-white',
        className
      )}
      data-slot="dropdown-menu-item"
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
