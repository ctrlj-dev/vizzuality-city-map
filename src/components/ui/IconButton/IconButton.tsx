import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const iconButtonVariants = cva(
  'rounded-full inline-flex items-center justify-center focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-primary-200 bg-white text-primary-950 hover:bg-primary-100',
        ghost: 'bg-transparent text-primary-950 hover:bg-primary-100',
      },
      size: {
        sm: 'h-6 w-6',
        default: 'h-8 w-8',
        lg: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  icon: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, icon, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        data-testid="icon-button"
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            'flex items-center justify-center',
            size === 'sm' ? 'text-[12px]' : 'text-[16px]'
          )}
        >
          {icon}
        </span>
      </Comp>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
