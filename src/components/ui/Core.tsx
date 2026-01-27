import React from 'react';
 
import { AlertCircle } from 'lucide-react';
import type { BadgeProps, BaseProps, InputProps } from '../../types';
import { cn } from '../../utils';

// --- Input Component ---
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();
    
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-200">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-2.5 text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder:text-slate-600",
              leftIcon && "pl-10",
              error && "border-error-500 focus:ring-error-500",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-error-600 flex items-center mt-1 animate-fade-in">
            <AlertCircle className="w-3 h-3 mr-1" /> {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

// --- Badge Component ---
export const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 border-primary-200 dark:border-primary-800',
    secondary: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    outline: 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600',
    destructive: 'bg-error-100 text-error-700 dark:bg-error-900/50 dark:text-error-300 border-error-200 dark:border-error-800',
    success: 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300 border-success-200 dark:border-success-800',
    warning: 'bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300 border-warning-200 dark:border-warning-800',
  };

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

// --- Avatar Component ---
interface AvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  fallback: string;
}

export const Avatar = ({ className, src, alt, fallback }: AvatarProps) => {
  return (
    <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700", className)}>
      <img className="aspect-square h-full w-full object-cover" src={src || `https://ui-avatars.com/api/?name=${fallback}&background=random`} alt={alt} />
      {!src && (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
          {fallback.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

// --- Skeleton Component ---
export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-800", className)} {...props} />
  );
};

// --- Separator Component ---
export const Separator = ({ className, orientation = 'horizontal' }: { className?: string; orientation?: 'horizontal' | 'vertical' }) => {
  return (
    <div
      className={cn(
        "shrink-0 bg-slate-200 dark:bg-slate-800",
        orientation === 'horizontal' ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
};
