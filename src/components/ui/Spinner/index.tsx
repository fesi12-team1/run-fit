import { Loader2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
}

export default function Spinner({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      role="status"
      {...props}
    />
  );
}

Spinner.Page = function PageSpinner({ className }: SpinnerProps) {
  return (
    <div className="h-main flex items-center justify-center">
      <Spinner className={cn('text-brand-500 size-12', className)} />
    </div>
  );
};

Spinner.Scroll = function ScrollSpinner({ className }: SpinnerProps) {
  return (
    <div className="flex w-full justify-center py-4">
      <Spinner className={cn('text-brand-500 size-8', className)} />
    </div>
  );
};
