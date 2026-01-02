import * as React from 'react';
import { cn } from '@/lib/utils';
import Label from '../Label';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export default function Textarea({
  label,
  errorMessage,
  disabled,
  ref,
  'id': idProp,
  'aria-describedby': ariaDescribedBy,
  className,
  ...props
}: TextareaProps) {
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
      <textarea
        ref={ref}
        aria-describedby={describedBy}
        className={cn(
          'focus-visible:border-brand-400 aria-invalid:border-error-100 h-30 w-full resize-none rounded-lg border border-transparent bg-gray-800 px-3 py-2 text-sm text-white transition-all outline-none placeholder:text-gray-300 disabled:cursor-not-allowed',
          'tablet:rounded-xl tablet:px-4 tablet:py-3 tablet:text-body2-medium',
          !disabled &&
            !hasError &&
            'focus-within:outline-brand-400 focus-within:outline',
          hasError && 'outline-error-100 outline',
          disabled && 'text-gray-400 opacity-50',
          className
        )}
        data-slot="textarea"
        disabled={disabled}
        id={id}
        {...props}
      />

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
