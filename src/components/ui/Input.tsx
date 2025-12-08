import { Label } from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';
import { useId, useState } from 'react';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'h-10 w-[460px] min-w-0 rounded-xl bg-gray-800 px-4 py-2 text-base text-white outline-none file:text-white placeholder:text-gray-300',
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
  id,
  ...props
}: InputProps) {
  const {
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedByProp,
    ...restProps
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const resolvedId = id ?? inputId;

  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  const inputVariant = disabled ? 'disabled' : 'default';
  const labelSizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
  const hasError = ariaInvalid === true || ariaInvalid === 'true';
  const tone = hasError ? 'error' : 'default';
  const errorId =
    hasError && errorMessage ? `${resolvedId.toString()}-error` : undefined;
  const ariaDescribedBy =
    [ariaDescribedByProp, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="grid w-full gap-2">
      {label && (
        <Label
          htmlFor={resolvedId}
          className={cn(labelSizeClass, 'text-white')}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        <input
          id={resolvedId}
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
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          {...restProps}
        />

        {isPassword && !disabled && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors hover:text-white"
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <EyeOff className="size-4 text-gray-300" />
            ) : (
              <Eye className="size-4 text-gray-300" />
            )}
          </button>
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
