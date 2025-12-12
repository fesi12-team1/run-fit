'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Label({
  className,
  htmlFor,
  size = 'lg',
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  size?: 'lg' | 'sm';
}) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        'text-white',
        size === 'lg' ? 'text-body3-semibold' : 'text-caption-semibold',
        className
      )}
      {...props}
    >
      {props.children}
    </LabelPrimitive.Root>
  );
}
