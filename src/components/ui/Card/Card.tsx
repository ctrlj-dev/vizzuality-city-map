import { cn } from '@/lib/utils';
import React from 'react';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative block px-4 py-4 rounded-sm border-b border-primary-100 hover:bg-primary-100 transition-colors cursor-pointer group',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'font-bold text-xl leading-7 text-primary-800 mb-1',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-2', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2 mb-2;', className)}
    {...props}
  />
));
CardItem.displayName = 'CardItem';

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'absolute h-10 bottom-2 right-2 flex items-center',
        className
      )}
      {...props}
    />
  );
});
CardAction.displayName = 'CardAction';

export { Card, CardAction, CardContent, CardItem, CardTitle };
