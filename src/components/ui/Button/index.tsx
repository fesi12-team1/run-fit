import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl whitespace-nowrap transition-all outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-brand-500 focus-visible:bg-brand-600 hover:bg-brand-600 active:bg-brand-700 text-white hover:text-gray-50 focus-visible:text-gray-50 active:text-gray-200 disabled:bg-gray-700 disabled:text-gray-300',
        outlined:
          'text-brand-400 hover:text-brand-600 focus-visible:text-brand-600 active:text-brand-700 border-brand-400 hover:border-brand-600 focus-visible:border-brand-600 active:border-brand-700 border bg-transparent active:bg-gray-800 disabled:border-gray-400 disabled:text-gray-400',
        neutral:
          'disabled:bg-gray-750 bg-gray-400 text-white hover:bg-gray-600 hover:text-gray-200 focus-visible:bg-gray-600 focus-visible:text-gray-200 active:bg-gray-700 active:text-gray-300 disabled:text-gray-400',
        ghost:
          'bg-transparent hover:bg-gray-800 focus-visible:bg-gray-800 active:bg-gray-700 text-white hover:text-gray-200 focus-visible:text-gray-200 active:text-gray-300 disabled:text-gray-400',
      },
      size: {
        default: 'text-body2-semibold h-12 px-6 py-3 has-[>svg]:px-3',
        sm: 'text-body3-semibold h-9 px-6 py-2 has-[>svg]:px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export default function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
