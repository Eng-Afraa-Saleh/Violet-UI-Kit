import React from 'react';
 
import {  ChevronDown } from 'lucide-react';
import { cn } from '../../utils';

// --- Textarea ---
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    return (
      <div className="grid w-full gap-1.5">
        {label && <label htmlFor={textareaId} className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50",
            error && "border-error-500 focus:ring-error-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-error-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// --- Switch ---
interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Switch = ({ checked, onCheckedChange, disabled, className, ...props }: SwitchProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-950",
        checked ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-700",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-2.5" : "translate-x-0"
        )}
      />
    </button>
  );
};

// --- Checkbox ---
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, id, ...props }, ref) => {
  const checkboxId = id || React.useId();
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary-600 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 accent-primary-600",
            className
            )}
            {...props}
        />
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

// --- Select (Native Wrapper) ---
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, id, ...props }, ref) => {
    const selectId = id || React.useId();
    return (
      <div className="grid w-full gap-1.5">
        {label && <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 pr-8",
              error && "border-error-500",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
        </div>
        {error && <p className="text-xs text-error-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";