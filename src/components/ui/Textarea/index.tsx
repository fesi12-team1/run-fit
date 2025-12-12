import * as React from 'react';
import { cn } from '@/lib/utils';

export default function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'h-30 w-full resize-none overflow-hidden rounded-lg border border-transparent bg-[#181820] px-3 py-2 text-sm text-[#FFFFFF] transition-[color,box-shadow] outline-none placeholder:text-[#5D616F] focus-visible:border-[#6C6BE2] focus-visible:ring-2 focus-visible:ring-[#6C6BE2]/20 disabled:cursor-not-allowed aria-invalid:border-[#DC2626] aria-invalid:ring-2 aria-invalid:ring-[#DC2626]/20 md:rounded-xl md:px-4 md:py-3 md:text-base',
        className
      )}
      {...props}
    />
  );
}
