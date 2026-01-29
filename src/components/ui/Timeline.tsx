import React from 'react';
import { Check, Clock, AlertCircle, Star, MapPin, User, MessageSquare } from 'lucide-react';
import { cn } from '../../utils';
import { Badge } from './Core';
import type { TimelineItem, TimelineItemType, TimelineProps } from '../../types';

const typeIcons: Record<TimelineItemType, React.ReactNode> = {
  default: <Clock className="h-3 w-3 sm:h-4 sm:w-4" />,
  success: <Check className="h-3 w-3 sm:h-4 sm:w-4" />,
  warning: <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
  error: <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />,
  info: <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />,
  primary: <Star className="h-3 w-3 sm:h-4 sm:w-4" />,
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
      <div className={cn("flex items-start overflow-x-auto pb-4", className)}>
        <div className="relative flex-1 min-w-max">
          {showConnectors && (
            <div className="absolute left-0 right-0 top-3 sm:top-4 h-0.5 bg-slate-200 dark:bg-slate-800" />
          )}
          
          <div className="relative flex">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col items-center px-2 sm:px-4">
                <div className="relative z-10">
                  <button
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                      "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-white shadow dark:border-slate-900",
                      getItemColor(item),
                      animate && "transition-all duration-300 hover:scale-110",
                      onItemClick && "cursor-pointer hover:shadow-lg"
                    )}
                  >
                    {getItemIcon(item)}
                  </button>
                  
                  {showConnectors && index < items.length - 1 && (
                    <div className="absolute left-1/2 top-3 sm:top-4 h-0.5 w-full bg-slate-200 dark:bg-slate-800" />
                  )}
                </div>

                <div className={cn(
                  "mt-2 sm:mt-4 w-20 sm:w-32 text-center",
                  isAlternate && index % 2 === 0 ? '-mt-12 sm:-mt-16' : 'mt-2 sm:mt-4'
                )}>
                  <div className="space-y-0.5 sm:space-y-1">
                    {showDates && (
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.timestamp}
                      </div>
                    )}
                    <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-50">
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

  return (
    <div className={cn("relative", className)}>
      {showConnectors && (
        <div className={cn(
          "absolute left-4 sm:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
          isAlternate && "left-1/2 -translate-x-1/2"
        )} />
      )}

      <div className="space-y-4 sm:space-y-8">
        {items.map((item, index) => {
          const isLeftAligned = isAlternate ? index % 2 === 0 : align === 'left';
          const isRightAligned = isAlternate ? index % 2 === 1 : align === 'right';

          return (
            <div
              key={item.id}
              className={cn(
                "relative flex flex-col sm:flex-row gap-3 sm:gap-4",
                isLeftAligned && "sm:flex-row",
                isRightAligned && "sm:flex-row-reverse",
                animate && "animate-fade-in",
                itemClassName
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn(
                "relative z-10 flex-shrink-0",
                isLeftAligned && "order-1",
                isRightAligned && "order-3"
              )}>
                <div className="flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center">
                  <button
                    onClick={() => onItemClick?.(item)}
                    className={cn(
                      "flex h-6 w-6 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 sm:border-4 border-white shadow dark:border-slate-950",
                      getItemColor(item),
                      item.completed && "ring-1 sm:ring-2 ring-offset-1 sm:ring-offset-2 ring-success-500 dark:ring-success-400",
                      animate && "transition-all duration-300 hover:scale-110",
                      onItemClick && "cursor-pointer hover:shadow-xl"
                    )}
                  >
                    {getItemIcon(item)}
                  </button>
                </div>
              </div>

              <div className={cn(
                "flex-1 rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50",
                isLeftAligned && "order-2 sm:ml-2",
                isRightAligned && "order-2 sm:mr-2",
                isCompact && "py-2 sm:py-3",
                isDetailed && "p-4 sm:p-6",
                onItemClick && "cursor-pointer hover:border-slate-300 hover:shadow dark:hover:border-slate-700"
              )}
              onClick={() => onItemClick?.(item)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-50">
                          {item.title}
                        </h3>
                        {item.tags?.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {isDetailed && item.action}
                    </div>

                    {item.description && (
                      <p className={cn(
                        "mt-1 sm:mt-2 text-sm text-slate-600 dark:text-slate-400",
                        isCompact && "text-xs sm:text-sm",
                        isDetailed && "text-sm sm:text-base"
                      )}>
                        {item.description}
                      </p>
                    )}

                    {isDetailed && (
                      <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 sm:gap-4">
                        {item.user && (
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <User size={12} className="sm:size-4" />
                            <span>{item.user}</span>
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <Clock size={12} className="sm:size-4" />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.meta?.location && (
                          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <MapPin size={12} className="sm:size-4" />
                            <span>{item.meta.location}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!isDetailed && (
                    <div className="flex flex-col items-start sm:items-end gap-1 sm:gap-2">
                      {showDates && (
                        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
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

                {isDetailed && item.meta?.progress !== undefined && (
                  <div className="mt-3 sm:mt-4">
                    <div className="flex justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{item.meta.progress}%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div 
                        className="h-full rounded-full bg-primary-500"
                        style={{ width: `${item.meta.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {isDetailed && showDates && (
                <div className={cn(
                  "flex-shrink-0 sm:w-24",
                  isLeftAligned && "order-3",
                  isRightAligned && "order-1"
                )}>
                  <div className="pt-1 sm:pt-2">
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