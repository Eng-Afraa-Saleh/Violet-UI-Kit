import  { useEffect } from 'react';
 import { X, CheckCircle, AlertTriangle, Info, AlertOctagon } from 'lucide-react';
 import { cn } from '../../utils';
import type { AlertProps, DialogProps } from '../../types';

// --- Alert ---
export const Alert = ({ className, variant = 'info', title, icon = true, children, ...props }: AlertProps) => {
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    success: 'bg-success-50 text-success-800 border-success-200 dark:bg-success-900/30 dark:text-success-300 dark:border-success-800',
    warning: 'bg-warning-50 text-warning-800 border-warning-200 dark:bg-warning-900/30 dark:text-warning-300 dark:border-warning-800',
    error: 'bg-error-50 text-error-800 border-error-200 dark:bg-error-900/30 dark:text-error-300 dark:border-error-800',
  };

  const Icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertOctagon,
  };

  const IconComp = Icons[variant];

  return (
    <div role="alert" className={cn("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", styles[variant], className)} {...props}>
      {icon && <IconComp className="h-4 w-4" />}
      <div className={cn(icon && "ml-2")}>
        {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
};



export const Dialog = ({ isOpen, onClose, title, children, footer, size = 'md' }: DialogProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className={cn("relative w-full rounded-xl bg-white p-6 shadow-lg duration-200 dark:bg-slate-900 dark:border dark:border-slate-800 animate-slide-in mx-4", sizes[size])}>
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          {title && <h2 className="text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-50">{title}</h2>}
          <button onClick={onClose} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-800 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">
          {children}
        </div>
        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};