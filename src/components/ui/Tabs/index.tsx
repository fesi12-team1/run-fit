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
      className={cn('flex flex-col gap-2', className)}
      data-slot="tabs"
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
      className={cn(
        'inline-flex w-full items-center justify-between',
        className
      )}
      data-slot="tabs-list"
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
      className={cn(
        "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 border-b border-b-gray-400 p-2.5 whitespace-nowrap text-gray-300 transition-all disabled:pointer-events-none data-[state=active]:border-b-white data-[state=active]:text-white [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // size별 스타일
        size === 'sm' &&
          'text-body3-medium data-[state=active]:text-body3-semibold',
        size === 'lg' &&
          'text-body2-medium data-[state=active]:text-body2-semibold',

        className
      )}
      data-slot="tabs-trigger"
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
      className={cn('flex-1 outline-none', className)}
      data-slot="tabs-content"
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
