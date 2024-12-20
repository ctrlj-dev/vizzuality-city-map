import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ButtonProps } from '../Button';

export const paginationVariants = cva(
  'text-primary-900 rounded py-2 py-4 focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-800 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-color disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        dark: 'text-white font-semibold hover:bg-primary-50 hover:text-primary-800 rounded p-2.5 transition-colors',
        darkActive:
          'text-primary-800 bg-white font-semibold hover:bg-primary-50 hover:text-primary-800 rounded p-2.5 transition-colors',
        ghost:
          'font-semibold hover:bg-primary-50 rounded p-2.5 transition-colors',
        active:
          'bg-primary-100 border border-primary-200 cursor-default hover:bg-primary-50',
      },
      size: {
        sm: 'h-10 px-2',
        default: 'h-9 px-4',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
);

type LinkVariants = 'dark' | 'darkActive' | 'ghost' | 'active';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  theme?: 'light' | 'dark';
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  theme = 'light',
  size = 'icon',
  ...props
}: PaginationLinkProps) => {
  let variant: LinkVariants = theme === 'light' ? 'ghost' : 'dark';
  const isDarkActive = theme === 'dark' && isActive;
  const isLightActive = theme === 'light' && isActive;

  if (isDarkActive) {
    variant = 'darkActive';
  }
  if (isLightActive) {
    variant = 'active';
  }

  return (
    <a
      role="link"
      tabIndex={0}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        `hover:cursor-pointer`,
        paginationVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    />
  );
};

PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  theme,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const variant =
    theme === 'light'
      ? 'text-primary-800'
      : 'text-white hover:text-primary-800';
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(`gap-1 pl-2.5 variant ${variant}`, className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  theme,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const variant =
    theme === 'light'
      ? 'text-primary-800'
      : 'text-white hover:text-primary-800';
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(`gap-1 pl-2.5 variant ${variant}`, className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationRoot,
};
