import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

 
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type Size = 'sm' | 'md' | 'lg' | 'icon';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
}

export interface BadgeProps extends BaseProps {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
}

export interface CardProps extends BaseProps {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}
