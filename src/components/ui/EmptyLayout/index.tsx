import React from 'react';
import { cn } from '@/lib/utils';
import Button from '../Button';

interface EmptyLayoutProps {
  children: React.ReactNode;
  className?: string;
}

function EmptyLayout({ children, className = 'flex-1' }: EmptyLayoutProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-10',
        className
      )}
    >
      {children}
    </div>
  );
}

function EmptyLayoutMessage({ children }: { children: React.ReactNode }) {
  return (
    <span className="tablet:text-body2-medium text-body3-medium text-center text-gray-300">
      {children}
    </span>
  );
}

function EmptyLayoutButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return <Button onClick={onClick}>{children}</Button>;
}

EmptyLayout.Message = EmptyLayoutMessage;
EmptyLayout.Button = EmptyLayoutButton;

export default EmptyLayout;
