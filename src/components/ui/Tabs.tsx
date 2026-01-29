import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../utils';
import { Badge } from './Core';
import type { TabContentProps, TabsContextType, TabsListProps, TabsProps, TabTriggerProps } from '../../types';

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs provider');
  }
  return context;
};

export function Tabs({
  defaultValue,
  variant = 'default',
  size = 'md',
  className,
  children,
  onChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, variant, size }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, fullWidth = false, centered = false }: TabsListProps) {
  const { variant, size } = useTabs();

  const sizeClasses = {
    sm: 'h-7 text-xs sm:h-8 sm:text-sm',
    md: 'h-9 text-sm sm:h-10 sm:text-base',
    lg: 'h-11 text-base sm:h-12 sm:text-lg',
  };

  const variantClasses = {
    default: 'gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900',
    underline: 'gap-0 border-b border-slate-200 dark:border-slate-800',
    pills: 'gap-1 sm:gap-2',
    segmented: 'gap-0 p-1 rounded-lg bg-slate-100 dark:bg-slate-900',
    vertical: 'flex-col items-start gap-1',
  };

  return (
    <div
      className={cn(
        "flex",
        variant === 'vertical' ? 'flex-col' : 'flex-row',
        variantClasses[variant],
        fullWidth && variant !== 'vertical' && 'w-full',
        centered && 'justify-center',
        className
      )}
      role="tablist"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            variant,
            size: sizeClasses[size],
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabTrigger({
  value,
  icon,
  badge,
  disabled = false,
  className,
  children,
  ...props
}: TabTriggerProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { activeTab, setActiveTab, variant, size } = useTabs();

  const isActive = activeTab === value;

  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed",
    size,
    className
  );

  const variantClasses = {
    default: cn(
      "rounded-md px-2 sm:px-3",
      isActive
        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-50"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
    ),
    underline: cn(
      "relative px-2 sm:px-4 py-1.5 sm:py-2",
      isActive
        ? "text-primary-600 dark:text-primary-400"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300",
      isActive && "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-primary-600 dark:after:bg-primary-400"
    ),
    pills: cn(
      "rounded-full px-3 sm:px-4",
      isActive
        ? "bg-primary-600 text-white dark:bg-primary-500"
        : "text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
    ),
    segmented: cn(
      "flex-1 rounded-md px-2 sm:px-3",
      isActive
        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-50"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
    ),
    vertical: cn(
      "w-full justify-start rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-left",
      isActive
        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-300"
    ),
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant])}
      onClick={() => !disabled && setActiveTab(value)}
      {...props}
    >
      {icon && <span className="mr-1 sm:mr-2">{icon}</span>}
      <span className="truncate">{children}</span>
      {badge !== undefined && (
        <Badge
          variant={isActive ? 'default' : 'outline'}
          className="ml-1 sm:ml-2 text-xs"
        >
          {badge}
        </Badge>
      )}
    </button>
  );
}

export function TabContent({ value, className, children }: TabContentProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("py-3 sm:py-4 focus-visible:outline-none focus-visible:ring-1 sm:focus-visible:ring-2 focus-visible:ring-primary-500", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}