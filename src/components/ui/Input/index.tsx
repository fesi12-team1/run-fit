import * as React from 'react';
import { cn } from '@/lib/utils';
import Label from '../Label';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'lg' | 'sm';
  label?: string;
  errorMessage?: string;
  RightElement?: React.ReactNode;
}

export default function Input({
  size = 'lg',
  errorMessage,
  RightElement,
  label,
  className,
  ...props
}: InputProps) {
  const hasError = !props.disabled && !!errorMessage;

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={props.id}>
        {label}
        <div
          className={cn(
            'mt-1 flex items-center bg-gray-800',

            // focus 상태 (disabled 제외)
            !props.disabled &&
              !hasError &&
              'focus-within:ring-brand-400 focus-within:ring-1',

            // warning (disabled보다 낮은 우선)
            hasError ? 'border-error-100 border' : 'border-transparent',

            // disabled
            props.disabled && 'pointer-events-none text-gray-400 opacity-50',

            // 사이즈
            size === 'lg'
              ? 'h-9 rounded-xl px-4 py-2'
              : 'h-8 rounded-lg px-3 py-2.5',
            className
          )}
        >
          <input
            className={cn(
              'flex-1 bg-transparent text-white outline-none placeholder:text-gray-400',
              size === 'lg' &&
                'text-body2-medium placeholder:text-body2-medium',
              size === 'sm' && 'text-body3-medium placeholder:text-body3-medium'
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
