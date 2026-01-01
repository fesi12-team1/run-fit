import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import ArrowDown from '@/assets/icons/arrow-down.svg?react';
import { cn } from '@/lib/utils';

export default function Pagination({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('flex flex-row items-center gap-2', className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex items-center justify-center',
        'text-body3 size-[34px] rounded-md',
        'tablet:size-10 tablet:rounded-lg tablet:text-body2',
        isActive ? 'font-semibold text-gray-100' : 'font-normal text-gray-300',
        className
      )}
      data-active={isActive}
      data-slot="pagination-link"
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      className={cn(
        'flex items-center justify-center p-2.5',
        'size-[34px] rounded-md',
        'tablet:size-10 tablet:rounded-lg',
        className
      )}
      data-slot="pagination-previous"
      {...props}
    >
      <ArrowDown className="size-6 rotate-90" />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      className={cn(
        'flex items-center justify-center p-2.5',
        'size-[34px] rounded-md',
        'tablet:size-10 tablet:rounded-lg',
        className
      )}
      data-slot="pagination-next"
      {...props}
    >
      <ArrowDown className="size-6 -rotate-90" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex items-center justify-center text-gray-300',
        'size-[34px]',
        'tablet:size-10',
        className
      )}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

Pagination.Content = PaginationContent;
Pagination.Link = PaginationLink;
Pagination.Item = PaginationItem;
Pagination.Previous = PaginationPrevious;
Pagination.Next = PaginationNext;
Pagination.Ellipsis = PaginationEllipsis;
