import * as React from 'react';
import { cn } from '@/lib/utils';
import Label from '../Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  RightElement?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

export default function Input({
  RightElement,
  label,
  errorMessage,
  disabled,
  className,
  ref,
  'id': idProp,
  'aria-describedby': ariaDescribedBy,
  ...props
}: InputProps) {
  const autoId = React.useId();
  const id = idProp ?? autoId;
  const errorId = `${id}-error`;

  const hasError = !disabled && !!errorMessage;

  const describedBy =
    [hasError ? errorId : null, ariaDescribedBy ?? null]
      .filter(Boolean)
      .join(' ') || undefined;

  return (
    <div className="w-full">
      {label && (
        <Label className="mb-1 block" htmlFor={id}>
          {label}
        </Label>
      )}

      <div
        className={cn(
          'flex h-10 items-center bg-gray-800 outline-transparent',
          'rounded-lg px-3 py-2.5',
          'tablet:rounded-xl tablet:px-4 tablet:py-2',
          !disabled &&
            !hasError &&
            'focus-within:outline-brand-400 focus-within:outline',
          hasError && 'outline-error-100 outline',
          disabled && 'text-gray-400 opacity-50',
          className
        )}
      >
        <input
          {...props}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          className={cn(
            'flex-1 bg-transparent text-white outline-none placeholder:text-gray-300',
            'text-body3-medium placeholder:text-body3-medium',
            'tablet:text-body2-medium tablet:placeholder:text-body2-medium'
          )}
          disabled={disabled}
          id={id}
        />

        {RightElement && (
          <span className="flex size-5 items-center justify-center text-gray-300">
            {RightElement}
          </span>
        )}
      </div>

      {errorMessage && (
        <p
          className="text-error-100 tablet:text-body3-semibold text-caption-semibold mt-2"
          id={errorId}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
