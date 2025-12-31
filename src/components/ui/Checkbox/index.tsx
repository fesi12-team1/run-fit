'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  rounded?: boolean;
};

export default function Checkbox({
  className,
  rounded = false,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer data-[state=checked]:bg-brand-400 data-[state=checked]:text-brand-400-foreground data-[state=checked]:border-brand-400 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex size-5 shrink-0 cursor-pointer items-center justify-center border border-gray-500 bg-transparent shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        rounded
          ? 'data-[state=checked]:bg-brand-400 rounded-full'
          : 'rounded-md',
        className
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="grid place-content-center text-current transition-none"
        data-slot="checkbox-indicator"
      >
        {rounded ? (
          <div className="size-2 rounded-full bg-gray-800" />
        ) : (
          <CheckIcon className="size-4 text-gray-800" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
