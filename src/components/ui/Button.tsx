import React from 'react';
import { Loader2 } from 'lucide-react';
import type { ButtonProps } from '../../types';
import { cn } from '../../utils';
 

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm border-transparent focus-visible:ring-primary-500',
      secondary: 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50 shadow-sm border dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
      outline: 'bg-transparent text-primary-600 border-primary-600 hover:bg-primary-50 border dark:text-primary-400 dark:border-primary-400 dark:hover:bg-primary-950',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-transparent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
      destructive: 'bg-error-600 text-white hover:bg-error-700 shadow-sm border-transparent focus-visible:ring-error-500 dark:bg-error-600 dark:hover:bg-error-700',
      link: 'text-primary-600 underline-offset-4 hover:underline bg-transparent border-transparent p-0 h-auto dark:text-primary-400',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-0 flex items-center justify-center',
    };

    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none dark:focus-visible:ring-offset-slate-950';

    const isIcon = size === 'icon';

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className={cn("h-4 w-4 animate-spin", !isIcon && "mr-2")} />
        ) : (
          !isIcon && leftIcon && <span className="mr-2">{leftIcon}</span>
        )}
        
        {/* For icon buttons, hide children while loading to maintain center alignment of spinner */}
        {(!isLoading || !isIcon) && children}

        {!isLoading && !isIcon && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
Button.displayName = 'Button';