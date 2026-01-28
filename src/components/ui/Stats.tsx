import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown, Minus, Target, Zap, Users, DollarSign, Clock, BarChart, Heart, Star, Globe, Shield } from 'lucide-react';
import { cn } from '../../utils';
import { Badge } from './Core';

export type StatVariant = 'default' | 'card' | 'minimal' | 'gradient' | 'glass' | 'highlight';
export type StatTrend = 'up' | 'down' | 'neutral';
export type StatSize = 'sm' | 'md' | 'lg' | 'xl';

export interface StatItem {
  id: string | number;
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description?: string;
  trend?: StatTrend;
  trendValue?: number | string;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
  duration?: number;
  format?: 'number' | 'currency' | 'percent' | 'decimal';
  decimals?: number;
  loading?: boolean;
  target?: number;
  progress?: number;
}

export interface StatsProps {
  items: StatItem[];
  variant?: StatVariant;
  size?: StatSize;
  columns?: 1 | 2 | 3 | 4;
  animate?: boolean;
  autoAnimate?: boolean;
  animationDuration?: number;
  className?: string;
  onComplete?: () => void;
}

const defaultIcon: Record<string, React.ReactNode> = {
  default: <BarChart className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  revenue: <DollarSign className="h-5 w-5" />,
  time: <Clock className="h-5 w-5" />,
  performance: <Zap className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
  rating: <Star className="h-5 w-5" />,
  global: <Globe className="h-5 w-5" />,
  security: <Shield className="h-5 w-5" />,
};

const trendIcons: Record<StatTrend, React.ReactNode> = {
  up: <ArrowUp className="h-3 w-3" />,
  down: <ArrowDown className="h-3 w-3" />,
  neutral: <Minus className="h-3 w-3" />,
};

const trendColors: Record<StatTrend, string> = {
  up: 'text-success-600 dark:text-success-400',
  down: 'text-destructive-600 dark:text-destructive-400',
  neutral: 'text-slate-500 dark:text-slate-400',
};

const sizeClasses: Record<StatSize, { container: string; value: string; title: string; desc: string }> = {
  sm: {
    container: 'p-3',
    value: 'text-2xl font-bold',
    title: 'text-sm font-medium',
    desc: 'text-xs',
  },
  md: {
    container: 'p-4',
    value: 'text-3xl font-bold',
    title: 'text-base font-medium',
    desc: 'text-sm',
  },
  lg: {
    container: 'p-6',
    value: 'text-4xl font-bold',
    title: 'text-lg font-medium',
    desc: 'text-base',
  },
  xl: {
    container: 'p-8',
    value: 'text-5xl font-bold',
    title: 'text-xl font-medium',
    desc: 'text-lg',
  },
};

const variantClasses: Record<StatVariant, string> = {
  default: 'bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800',
  card: 'bg-white border border-slate-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-slate-800',
  minimal: 'bg-transparent',
  gradient: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white',
  glass: 'backdrop-blur-sm bg-white/10 border border-white/20',
  highlight: 'bg-primary-50 border border-primary-100 dark:bg-primary-900/20 dark:border-primary-800/30',
};

function CountUp({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  format = 'number',
  decimals = 0,
  className,
  animate = true,
}: {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  format?: 'number' | 'currency' | 'percent' | 'decimal';
  decimals?: number;
  className?: string;
  animate?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const formatNumber = (num: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(num);
      case 'percent':
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(num / 100);
      case 'decimal':
        return num.toFixed(decimals);
      default:
        return new Intl.NumberFormat('en-US').format(Math.floor(num));
    }
  };

  const startAnimation = () => {
    if (hasAnimated || !animate) return;
    
    setHasAnimated(true);
    let startTime: number;
    let animationFrame: number;

    const animateFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateFrame);
      }
    };

    setTimeout(() => {
      animationFrame = requestAnimationFrame(animateFrame);
    }, delay);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  };

  useEffect(() => {
    if (!animate) {
      setCount(end);
      return;
    }

    // Create intersection observer
    if (countRef.current && !observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAnimation();
              if (observerRef.current) {
                observerRef.current.unobserve(entry.target);
              }
            }
          });
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(countRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, animate]);

  // Fallback if intersection observer doesn't trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated && animate) {
        startAnimation();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [hasAnimated, animate]);

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {animate ? formatNumber(count) : formatNumber(end)}
      {suffix}
    </span>
  );
}

export function Stats({
  items,
  variant = 'default',
  size = 'md',
  columns = 4,
  animate = true,
  autoAnimate = true,
  animationDuration = 2000,
  className,
  onComplete,
}: StatsProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const renderStat = (item: StatItem, index: number) => {
    const sizeClass = sizeClasses[size];
    const isGradient = variant === 'gradient';
    const isGlass = variant === 'glass';

    const iconColor = isGradient || isGlass 
      ? 'text-white' 
      : item.color || 'text-primary-600 dark:text-primary-400';

    const textColor = isGradient || isGlass
      ? 'text-white'
      : 'text-slate-900 dark:text-slate-50';

    const descColor = isGradient || isGlass
      ? 'text-white/80'
      : 'text-slate-500 dark:text-slate-400';

    return (
      <div
        key={item.id}
        className={cn(
          'rounded-lg transition-all duration-300 hover:shadow-md',
          variantClasses[variant],
          sizeClass.container,
          animate && 'animate-fade-in'
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className={cn('flex items-center gap-2', sizeClass.title)}>
              {item.icon ? (
                <div className={cn('p-2 rounded-lg', iconColor)}>
                  {item.icon}
                </div>
              ) : (
                <div className={cn('p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30', iconColor)}>
                  {defaultIcon.default}
                </div>
              )}
              <span className={cn('font-medium', textColor)}>{item.title}</span>
            </div>

            <div className={cn('mt-4', sizeClass.value, textColor)}>
              {animate && !item.loading ? (
                <CountUp
                  end={item.value}
                  duration={item.duration || animationDuration}
                  delay={item.delay || index * 200}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  format={item.format}
                  decimals={item.decimals}
                  className="tabular-nums"
                  animate={animate}
                />
              ) : (
                <span className="tabular-nums">
                  {item.prefix}
                  {item.format === 'currency'
                    ? `$${item.value.toLocaleString()}`
                    : item.format === 'percent'
                    ? `${item.value}%`
                    : item.value.toLocaleString()}
                  {item.suffix}
                </span>
              )}
            </div>

            {item.description && (
              <p className={cn('mt-2', sizeClass.desc, descColor)}>
                {item.description}
              </p>
            )}

            {(item.trend || item.target !== undefined) && (
              <div className="mt-4 flex items-center gap-3">
                {item.trend && (
                  <div className={cn('flex items-center gap-1', trendColors[item.trend])}>
                    {trendIcons[item.trend]}
                    <span className="text-sm font-medium">
                      {item.trendValue || '0%'}
                    </span>
                  </div>
                )}

                {item.target !== undefined && (
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Target: {item.target.toLocaleString()}</span>
                      <span>{Math.round((item.value / item.target) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: `${Math.min((item.value / item.target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {item.progress !== undefined && (
                  <Badge
                    variant={
                      item.progress >= 100 ? 'success' :
                      item.progress >= 70 ? 'warning' :
                      'secondary'
                    }
                  >
                    {item.progress}%
                  </Badge>
                )}
              </div>
            )}
          </div>

          {item.trend === 'up' && (
            <div className="rounded-full bg-success-50 p-2 text-success-600 dark:bg-success-900/30 dark:text-success-400">
              <TrendingUp className="h-5 w-5" />
            </div>
          )}
          {item.trend === 'down' && (
            <div className="rounded-full bg-destructive-50 p-2 text-destructive-600 dark:bg-destructive-900/30 dark:text-destructive-400">
              <TrendingDown className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {items.map((item, index) => renderStat(item, index))}
    </div>
  );
}

// Single Stat Component
export interface SingleStatProps extends Omit<StatItem, 'id' | 'title'> {
  title?: string;
  variant?: StatVariant;
  size?: StatSize;
  className?: string;
  animate?: boolean;
}

export function SingleStat({
  title,
  value,
  prefix = '',
  suffix = '',
  description,
  trend,
  trendValue,
  icon,
  color,
  variant = 'default',
  size = 'md',
  animate = true,
  className,
  format = 'number',
  decimals = 0,
  loading = false,
  target,
  progress,
}: SingleStatProps) {
  const sizeClass = sizeClasses[size];

  const items: StatItem[] = [
    {
      id: 'single',
      title: title || '',
      value,
      prefix,
      suffix,
      description,
      trend,
      trendValue,
      icon,
      color,
      format,
      decimals,
      loading,
      target,
      progress,
    },
  ];

  return (
    <div className={className}>
      <Stats
        items={items}
        variant={variant}
        size={size}
        columns={1}
        animate={animate}
        autoAnimate={false}
      />
    </div>
  );
}