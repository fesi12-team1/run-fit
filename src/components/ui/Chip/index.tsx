import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const chipVariants = cva(
  'text-body3-regular h-[36px] w-[52px] inline-flex items-center justify-center whitespace-nowrap shrink-0 font-semibold transition-colors rounded-xl cursor-pointer',
  {
    variants: {
      tone: {
        primary: '',
        secondary: '',
      },
      state: {
        default: '',
        hover: '',
        active: '',
      },
    },
    compoundVariants: [
      // primary
      {
        tone: 'primary',
        state: 'default',
        className: 'border border-gray-700 bg-gray-800',
      },
      {
        tone: 'primary',
        state: 'hover',
        className: 'border-2 border-brand-800 bg-gray-800',
      },
      {
        tone: 'primary',
        state: 'active',
        className: 'border border-brand-500 bg-brand-950 text-brand-300',
      },

      // secondary
      {
        tone: 'secondary',
        state: 'default',
        className: 'bg-gray-600 border-gray-500',
      },
      {
        tone: 'secondary',
        state: 'hover',
        className: 'border-brand-800 border-2 bg-gray-600',
      },
      {
        tone: 'secondary',
        state: 'active',
        className: 'text-brand-300 border border-brand-500 bg-brand-900',
      },
    ],
    defaultVariants: {
      tone: 'primary',
      state: 'default',
    },
  }
);

type BadgeProps = React.ComponentProps<'div'> & {
  children?: React.ReactNode;
  tone?: 'primary' | 'secondary';
  state?: 'default' | 'hover' | 'active';
};

export default function Chip({
  className,
  tone,
  state,
  children,
  ...rest
}: BadgeProps) {
  return (
    <div
      data-slot="chip"
      className={cn(chipVariants({ tone, state }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}
