import * as React from 'react';
import { cn } from '@/lib/utils';
import Label from '../Label';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  errorMessage?: string;
  RightElement?: React.ReactNode;
}

export default function Input({
  errorMessage,
  RightElement,
  label,
  className,
  disabled,
  ...props
}: InputProps) {
  const hasError = !disabled && !!errorMessage;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={props.id}>
        {label}
        <div
          className={cn(
            'mt-1 flex h-10 items-center border-transparent bg-gray-800',
            'rounded-lg px-3 py-2.5',
            'tablet:rounded-xl tablet:px-4 tablet:py-2',
            !disabled &&
              !hasError &&
              'focus-within:ring-brand-400 focus-within:ring-1',
            hasError && 'border-error-100 border',
            disabled && 'pointer-events-none text-gray-400 opacity-50',
            className
          )}
        >
          <input
            className={cn(
              'flex-1 bg-transparent text-white outline-none placeholder:text-gray-400',
              'text-body3-medium placeholder:text-body3-medium',
              'tablet:text-body2-medium tablet:placeholder:text-body2-medium'
            )}
            aria-label={label}
            aria-invalid={hasError}
            {...props}
          />
          {RightElement && (
            <span className="flex size-5 items-center justify-center text-gray-300">
              {RightElement}
            </span>
          )}
        </div>
      </Label>
      {errorMessage && (
        <p className="text-error-100 mt-0.5 text-xs">{errorMessage}</p>
      )}
    </div>
  );
}
