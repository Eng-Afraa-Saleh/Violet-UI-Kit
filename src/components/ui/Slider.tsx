import React, { useState, useRef } from 'react';
import { cn } from '../../utils';
import type { RangeSliderProps, SliderProps } from '../../types';

export function Slider({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  variant = 'default',
  sliderSize = 'md',
  showValue = true,
  showLabels = true,
  showMarks = false,
  marks,
  label,
  iconLeft,
  iconRight,
  className,
  trackClassName,
  thumbClassName,
  onChange,
  onChangeEnd,
  formatValue = (value) => value.toString(),
  disabled = false,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const sizeClasses = {
    sm: {
      track: 'h-1.5',
      thumb: 'h-4 w-4',
      container: 'h-6',
      value: 'text-sm',
      label: 'text-sm',
    },
    md: {
      track: 'h-2',
      thumb: 'h-5 w-5',
      container: 'h-8',
      value: 'text-base',
      label: 'text-base',
    },
    lg: {
      track: 'h-3',
      thumb: 'h-6 w-6',
      container: 'h-10',
      value: 'text-lg',
      label: 'text-lg',
    },
  };

  const variantClasses = {
    default: {
      track: 'bg-slate-200 dark:bg-slate-700',
      fill: 'bg-primary-500',
      thumb: 'bg-white border-2 border-primary-500 shadow-lg',
    },
    range: {
      track: 'bg-slate-200 dark:bg-slate-700',
      fill: 'bg-gradient-to-r from-primary-500 to-primary-600',
      thumb: 'bg-white border-2 border-primary-500 shadow-lg',
    },
    gradient: {
      track: 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700',
      fill: 'bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600',
      thumb: 'bg-white border-2 border-primary-500 shadow-xl',
    },
    thumb: {
      track: 'bg-slate-200 dark:bg-slate-700',
      fill: 'bg-primary-500',
      thumb: 'bg-primary-500 border-2 border-white shadow-xl',
    },
    vertical: {
      track: 'bg-slate-200 dark:bg-slate-700',
      fill: 'bg-primary-500',
      thumb: 'bg-white border-2 border-primary-500 shadow-lg',
    },
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (disabled) return;

    setIsDragging(true);
    handleDrag(event);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleDrag(moveEvent);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onChangeEnd?.(value);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDrag = (event: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;

    let newPercentage = (offsetX / width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (disabled) return;

    setIsDragging(true);
    handleTouch(event);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      handleTouch(moveEvent);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      onChangeEnd?.(value);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouch = (event: TouchEvent | React.TouchEvent) => {
    if (!sliderRef.current || disabled || !event.touches[0]) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const touch = event.touches[0];
    const offsetX = touch.clientX - rect.left;
    const width = rect.width;

    let newPercentage = (offsetX / width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    event.preventDefault();
    setInternalValue(newValue);
    onChange?.(newValue);
    onChangeEnd?.(newValue);
  };

  const renderMarks = () => {
    if (!showMarks && !marks) return null;

    const markPoints = marks || [min, min + (max - min) / 4, min + (max - min) / 2, min + 3 * (max - min) / 4, max];

    return (
      <div className="absolute top-full mt-2 w-full flex justify-between px-1">
        {markPoints.map((mark, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="h-1.5 w-0.5 bg-slate-300 dark:bg-slate-600"></div>
            <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {formatValue(mark)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const isVertical = variant === 'vertical';

  if (isVertical) {
    const verticalPercentage = percentage;

    return (
      <div className={cn("flex flex-col items-center", className)}>
        {label && (
          <div className={cn("mb-2 font-medium text-slate-700 dark:text-slate-300", sizeClasses[sliderSize].label)}>
            {label}
          </div>
        )}

        <div className="flex items-center gap-4">
          {showValue && (
            <div className={cn("font-mono font-bold text-slate-900 dark:text-slate-50 min-w-12 text-center", sizeClasses[sliderSize].value)}>
              {formatValue(value)}
            </div>
          )}

          <div className="relative" style={{ height: '200px' }}>
            <div
              ref={sliderRef}
              className={cn(
                "relative w-2 rounded-full cursor-pointer",
                variantClasses[variant].track,
                sizeClasses[sliderSize].track,
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 rounded-full",
                  variantClasses[variant].fill
                )}
                style={{ height: `${verticalPercentage}%` }}
              />

              <div
                ref={thumbRef}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-150",
                  variantClasses[variant].thumb,
                  sizeClasses[sliderSize].thumb,
                  thumbClassName,
                  isDragging && "scale-125",
                  disabled && "cursor-not-allowed"
                )}
                style={{ bottom: `${verticalPercentage}%` }}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={label}
                role="slider"
              />
            </div>

            {showLabels && (
              <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{formatValue(max)}</span>
                <span>{formatValue(min)}</span>
              </div>
            )}
          </div>
        </div>

        {renderMarks()}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {(label || (showValue && !isVertical)) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <div className={cn("font-medium text-slate-700 dark:text-slate-300", sizeClasses[sliderSize].label)}>
              {label}
            </div>
          )}
          {showValue && !isVertical && (
            <div className={cn("font-mono font-bold text-slate-900 dark:text-slate-50", sizeClasses[sliderSize].value)}>
              {formatValue(value)}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {iconLeft && (
          <div className={cn(
            "text-slate-500 dark:text-slate-400",
            disabled && "opacity-50"
          )}>
            {iconLeft}
          </div>
        )}

        <div className="flex-1 relative">
          <div
            ref={sliderRef}
            className={cn(
              "relative rounded-full cursor-pointer",
              variantClasses[variant].track,
              sizeClasses[sliderSize].track,
              disabled && "opacity-50 cursor-not-allowed"
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 rounded-full",
                variantClasses[variant].fill
              )}
              style={{ width: `${percentage}%` }}
            />

            {showMarks && !marks && (
              <div className="absolute inset-0 flex justify-between px-0.5">
                {[0, 25, 50, 75, 100].map((mark) => (
                  <div
                    key={mark}
                    className="h-full w-0.5 bg-white/30"
                    style={{ marginLeft: `${mark === 0 ? '-1px' : '0'}` }}
                  />
                ))}
              </div>
            )}

            <div
              ref={thumbRef}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-150",
                variantClasses[variant].thumb,
                sizeClasses[sliderSize].thumb,
                thumbClassName,
                isDragging && "scale-125",
                disabled && "cursor-not-allowed"
              )}
              style={{ left: `${percentage}%`, transform: `translate(-50%, -50%)` }}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={handleKeyDown}
              aria-valuenow={value}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-label={label}
              role="slider"
            />
          </div>

          {renderMarks()}

          {showLabels && !showMarks && (
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {formatValue(min)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {formatValue(max)}
              </span>
            </div>
          )}
        </div>

        {iconRight && (
          <div className={cn(
            "text-slate-500 dark:text-slate-400",
            disabled && "opacity-50"
          )}>
            {iconRight}
          </div>
        )}
      </div>

      {/* Hidden input for form compatibility */}
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
    </div>
  );
}

// Range Slider Component

export function RangeSlider({
  minValue = 25,
  maxValue = 75,
  min = 0,
  max = 100,
  step = 1,
  label,
  className,
  onChange,
  formatValue = (value) => value.toString(),
}: RangeSliderProps) {
  const [values, setValues] = useState({ min: minValue, max: maxValue });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const minPercentage = ((values.min - min) / (max - min)) * 100;
  const maxPercentage = ((values.max - min) / (max - min)) * 100;

  const handleDrag = (event: MouseEvent, thumb: 'min' | 'max') => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const width = rect.width;

    let newPercentage = (offsetX / width) * 100;
    newPercentage = Math.max(0, Math.min(100, newPercentage));

    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;

    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    setValues(prev => {
      let newValues = { ...prev };

      if (thumb === 'min') {
        newValues.min = Math.min(clampedValue, prev.max - step);
      } else {
        newValues.max = Math.max(clampedValue, prev.min + step);
      }

      return newValues;
    });
  };

  const handleMouseDown = (event: React.MouseEvent, thumb: 'min' | 'max') => {
    setActiveThumb(thumb);
    handleDrag(event as any, thumb);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleDrag(moveEvent, thumb);
    };

    const handleMouseUp = () => {
      setActiveThumb(null);
      onChange?.(values);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-slate-700 dark:text-slate-300">
            {label}
          </div>
          <div className="font-mono font-bold text-slate-900 dark:text-slate-50">
            {formatValue(values.min)} - {formatValue(values.max)}
          </div>
        </div>
      )}

      <div className="relative">
        <div
          ref={sliderRef}
          className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700 cursor-pointer"
        >
          <div
            className="absolute top-0 bottom-0 rounded-full bg-primary-500"
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary-500 shadow-lg cursor-pointer transition-all duration-150",
              activeThumb === 'min' && "scale-125"
            )}
            style={{ left: `${minPercentage}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={(e) => handleMouseDown(e, 'min')}
          />

          {/* Max thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-primary-500 shadow-lg cursor-pointer transition-all duration-150",
              activeThumb === 'max' && "scale-125"
            )}
            style={{ left: `${maxPercentage}%`, transform: 'translate(-50%, -50%)' }}
            onMouseDown={(e) => handleMouseDown(e, 'max')}
          />
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatValue(min)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatValue(max)}
          </span>
        </div>
      </div>
    </div>
  );
}