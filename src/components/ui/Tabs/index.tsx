'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';
import { cn } from '@/lib/utils';

function TabsRoot({
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
  size = 'lg',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  size?: 'sm' | 'lg';
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-b border-b-gray-400 p-2.5 whitespace-nowrap text-gray-300 transition-all disabled:pointer-events-none data-[state=active]:border-b-white data-[state=active]:text-white [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // size별 스타일
        size === 'sm' &&
          'text-body3-medium data-[state=active]:text-body3-semibold',
        size === 'lg' &&
          'text-body2-medium data-[state=active]:text-body2-semibold',

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

const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
