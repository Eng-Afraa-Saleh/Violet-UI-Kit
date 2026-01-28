import React from 'react';
import { Check, Clock, AlertCircle, Star, MapPin, Calendar, User, Package, MessageSquare, TrendingUp } from 'lucide-react';
import { cn } from '../../utils';
import { Badge } from './Core';

export type TimelineItemType = 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  time?: string;
  type?: TimelineItemType;
  icon?: React.ReactNode;
  color?: string;
  avatar?: string;
  user?: string;
  tags?: string[];
  action?: React.ReactNode;
  completed?: boolean;
  meta?: Record<string, any>;
}

export interface TimelineProps {
  items: TimelineItem[];
  mode?: 'default' | 'compact' | 'detailed';
  direction?: 'vertical' | 'horizontal';
  align?: 'left' | 'right' | 'alternate';
  showConnectors?: boolean;
  showDates?: boolean;
  animate?: boolean;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: TimelineItem) => void;
}

const typeIcons: Record<TimelineItemType, React.ReactNode> = {
  default: <Clock className="h-4 w-4" />,
  success: <Check className="h-4 w-4" />,
  warning: <AlertCircle className="h-4 w-4" />,
  error: <AlertCircle className="h-4 w-4" />,
  info: <MessageSquare className="h-4 w-4" />,
  primary: <Star className="h-4 w-4" />,
};

const typeColors: Record<TimelineItemType, string> = {
  default: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  success: 'bg-success-100 text-success-600 dark:bg-success-900/30 dark:text-success-400',
  warning: 'bg-warning-100 text-warning-600 dark:bg-warning-900/30 dark:text-warning-400',
  error: 'bg-destructive-100 text-destructive-600 dark:bg-destructive-900/30 dark:text-destructive-400',
  info: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  primary: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
};

export function Timeline({
  items,
  mode = 'default',
  direction = 'vertical',
  align = 'left',
  showConnectors = true,
  showDates = true,
  animate = false,
  className,
  itemClassName,
  onItemClick,
}: TimelineProps) {
  const isHorizontal = direction === 'horizontal';
  const isAlternate = align === 'alternate';
  const isCompact = mode === 'compact';
  const isDetailed = mode === 'detailed';

  const getItemColor = (item: TimelineItem) => {
    if (item.color) return item.color;
    return typeColors[item.type || 'default'];
  };

  const getItemIcon = (item: TimelineItem) => {
    if (item.icon) return item.icon;
    return typeIcons[item.type || 'default'];
  };

  if (isHorizontal) {
    return (
      <div className={cn("flex items-start", className)}>
        <div className="relative flex-1">
          {/* Connector line */}
          {showConnectors && (
            <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-200 dark:bg-slate-800" />
          )}
          
          <div className="relative flex justify-between">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center">
                {/* Timeline dot */}
                <div className="relative z-10">
                  <button
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-md dark:border-slate-900",
                      getItemColor(item),
                      animate && "transition-all duration-300 hover:scale-110",
                      onItemClick && "cursor-pointer hover:shadow-lg"
                    )}
                  >
                    {getItemIcon(item)}
                  </button>
                  
                  {/* Connector line from dot */}
                  {showConnectors && index < items.length - 1 && (
                    <div className="absolute left-1/2 top-4 h-0.5 w-full bg-slate-200 dark:bg-slate-800" />
                  )}
                </div>

                {/* Content */}
                <div className={cn(
                  "mt-4 w-32 text-center",
                  isAlternate && index % 2 === 0 ? '-mt-16' : 'mt-4'
                )}>
                  <div className="space-y-1">
                    {showDates && (
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.timestamp}
                      </div>
                    )}
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {item.title}
                    </div>
                    {!isCompact && item.description && (
                      <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vertical Timeline (default)
  return (
    <div className={cn("relative", className)}>
      {/* Vertical connector line */}
      {showConnectors && (
        <div className={cn(
          "absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
          isAlternate && "left-1/2 -translate-x-1/2"
        )} />
      )}

      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeftAligned = isAlternate ? index % 2 === 0 : align === 'left';
          const isRightAligned = isAlternate ? index % 2 === 1 : align === 'right';

          return (
            <div
              key={item.id}
              className={cn(
                "relative flex gap-4",
                isLeftAligned && "flex-row",
                isRightAligned && "flex-row-reverse",
                animate && "animate-fade-in",
                itemClassName
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div className={cn(
                "relative z-10 flex-shrink-0",
                isLeftAligned && "order-1",
                isRightAligned && "order-3"
              )}>
                <div className="flex h-10 w-10 items-center justify-center">
                  <button
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg dark:border-slate-950",
                      getItemColor(item),
                      item.completed && "ring-2 ring-offset-2 ring-success-500 dark:ring-success-400",
                      animate && "transition-all duration-300 hover:scale-110",
                      onItemClick && "cursor-pointer hover:shadow-xl"
                    )}
                  >
                    {getItemIcon(item)}
                  </button>
                </div>
              </div>

              {/* Content card */}
              <div className={cn(
                "flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50",
                isLeftAligned && "order-2 ml-2",
                isRightAligned && "order-2 mr-2",
                isCompact && "py-3",
                isDetailed && "p-6",
                onItemClick && "cursor-pointer hover:border-slate-300 hover:shadow-md dark:hover:border-slate-700"
              )}
              onClick={() => onItemClick?.(item)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                          {item.title}
                        </h3>
                        {item.tags?.map((tag, i) => (
                          <Badge key={i} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {isDetailed && item.action}
                    </div>

                    {item.description && (
                      <p className={cn(
                        "mt-2 text-slate-600 dark:text-slate-400",
                        isCompact && "text-sm",
                        isDetailed && "text-base"
                      )}>
                        {item.description}
                      </p>
                    )}

                    {/* Meta information for detailed mode */}
                    {isDetailed && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {item.user && (
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <User size={14} />
                            <span>{item.user}</span>
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <Clock size={14} />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.meta?.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin size={14} />
                            <span>{item.meta.location}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!isDetailed && (
                    <div className="flex flex-col items-end gap-2">
                      {showDates && (
                        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {item.timestamp}
                        </div>
                      )}
                      {item.time && !isCompact && (
                        <div className="text-xs text-slate-400 dark:text-slate-500">
                          {item.time}
                        </div>
                      )}
                      {item.action}
                    </div>
                  )}
                </div>

                {/* Progress or status for detailed mode */}
                {isDetailed && item.meta?.progress !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{item.meta.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div 
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: `${item.meta.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Date for vertical timeline */}
              {isDetailed && showDates && (
                <div className={cn(
                  "flex-shrink-0 w-24 text-right",
                  isLeftAligned && "order-3",
                  isRightAligned && "order-1"
                )}>
                  <div className="sticky top-0 pt-2">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {item.timestamp}
                    </div>
                    {item.time && (
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.time}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}