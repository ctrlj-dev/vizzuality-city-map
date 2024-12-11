import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  ' w-min rounded-full focus-visible:outline-none focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-primary-800 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-color disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-800 text-background hover:bg-primary-600 focus-within:ring-primary-600 ',
        outline:
          'border border-input border-primary-200 text-primary-800 bg-transparent hover:bg-primary-200 hover:text-primary-800',
        secondary: 'bg-background text-primary-800',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-10 px-2',
        default: 'h-9 px-4',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
