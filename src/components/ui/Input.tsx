import { Label } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { useId } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'h-10 w-full min-w-0 rounded-xl bg-gray-800 px-4 py-2 text-base text-white outline-none file:text-white placeholder:text-gray-300',
  {
    variants: {
      variant: {
        default: '',
        disabled: 'placeholder:text-gray-500 cursor-not-allowed',
      },
      size: {
        md: 'h-9',
        sm: 'h-8',
      },
      tone: {
        default:
          'focus:ring-1 focus:ring-brand-400 focus-visible:ring-brand-400',
        error: 'border-warning border-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  label?: string;
  errorMessage?: string;
  size?: VariantProps<typeof inputVariants>['size'];
  Icon?: React.ReactNode;
}

export default function Input({
  className,
  label,
  size = 'md',
  disabled = false,
  value,
  placeholder,
  errorMessage,
  id,
  type,
  Icon,
  ...props
}: InputProps) {
  const {
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedByProp,
    ...restProps
  } = props;

  const inputId = useId();
  const resolvedId = id ?? inputId;

  const hasError = ariaInvalid === true || ariaInvalid === 'true';
  const tone = hasError ? 'error' : 'default';

  const errorId = hasError && errorMessage ? `${resolvedId}-error` : undefined;

  const ariaDescribedBy =
    [ariaDescribedByProp, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="grid w-full gap-2">
      {label && (
        <Label
          htmlFor={resolvedId}
          className={cn(
            'text-white',
            size === 'md' ? 'text-body3-semibold' : 'text-caption-semibold'
          )}
        >
          {label}
        </Label>
      )}

      <div className="relative flex items-center">
        <input
          id={resolvedId}
          data-slot="input"
          disabled={disabled}
          type={type ?? 'text'}
          value={value}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={cn(
            inputVariants({
              variant: disabled ? 'disabled' : 'default',
              size,
              tone,
            }),
            Icon ? 'pr-10' : '',
            className
          )}
          {...restProps}
        />

        {Icon && (
          <span className="absolute right-3 flex w-5 items-center text-gray-300">
            {Icon}
          </span>
        )}
      </div>

      {hasError && errorMessage && (
        <p id={errorId} className="text-warning mt-0.5 text-xs">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
