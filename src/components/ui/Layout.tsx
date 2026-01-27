 import type { BaseProps, CardProps } from '../../types';
import { cn } from '../../utils';
 

// --- Card Components ---
export const Card = ({ className, title, description, footer, children }: CardProps) => {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50", className)}>
      {(title || description) && (
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
          {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        </div>
      )}
      <div className={cn("p-6", (title || description) && "pt-2")}>{children}</div>
      {footer && (
        <div className="flex items-center p-6 pt-0">
          {footer}
        </div>
      )}
    </div>
  );
};

// --- Container ---
export const Container = ({ className, children, ...props }: BaseProps) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)} {...props}>
    {children}
  </div>
);

// --- Grid ---
interface GridProps extends BaseProps {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 2 | 4 | 6 | 8;
}
export const Grid = ({ className, children, cols = 1, gap = 4, ...props }: GridProps) => {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };
  
  const gapStyles = {
    2: 'gap-2',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div className={cn("grid", colStyles[cols], gapStyles[gap], className)} {...props}>
      {children}
    </div>
  );
};
