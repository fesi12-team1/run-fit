'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex w-full items-center justify-between',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-b border-b-[#3B3D4C] p-2.5 text-sm whitespace-nowrap text-[#5D616F] transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-[#FFFFFF] data-[state=active]:text-[#FFFFFF] lg:text-xl [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;
