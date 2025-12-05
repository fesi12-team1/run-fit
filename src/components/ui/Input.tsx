import { Label } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'text-white file:text-foreground placeholder:text-muted-foreground selection:text-purple-400-foreground h-9 w-full min-w-0 rounded-md border border-gray-800 bg-gray-800 px-3 py-1 text-base shadow-xs transition-all outline-none selection:bg-purple-400 md:text-sm',
  {
    variants: {
      variant: {
        default: '',
        disabled: 'cursor-not-allowed opacity-50',
      },
      size: {
        md: 'h-9',
        sm: 'h-8',
      },
      tone: {
        default:
          'focus:border-purple-400 focus-visible:border-purple-400 focus-visible:placeholder:text-white',
        error:
          'border-destructive focus:border-destructive focus-visible:border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  errorMessage?: string;
  size?: 'md' | 'sm';
}

export default function Input({
  className,
  label,
  type = 'text',
  size = 'md',
  disabled = false,
  value,
  placeholder,
  errorMessage,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  const inputVariant = disabled ? 'disabled' : 'default';
  const labelSizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
  const hasError =
    props['aria-invalid'] === true || props['aria-invalid'] === 'true';
  const tone = hasError ? 'error' : 'default';

  return (
    <div className="grid w-full max-w-sm gap-2">
      {label && (
        <Label className={cn(labelSizeClass, 'text-white')}>{label}</Label>
      )}

      <div className="relative">
        <input
          type={currentType}
          data-slot="input"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          className={cn(
            inputVariants({
              variant: inputVariant,
              size,
              tone,
              className,
            })
          )}
          {...props}
        />

        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors hover:text-white"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        )}
      </div>

      {hasError && errorMessage && (
        <p className="text-destructive mt-0.5 text-xs">{errorMessage}</p>
      )}
    </div>
  );
}
