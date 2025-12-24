'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Label({
  className,
  htmlFor,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        'text-caption-semibold text-gray-50',
        'tablet:text-body3-semibold',
        className
      )}
      {...props}
    >
      {props.children}
    </LabelPrimitive.Root>
  );
}
