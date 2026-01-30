import React, { useState, useCallback } from 'react';
import {
    Copy,
    Check,
    Palette,
    Sparkles,
    Zap,

    Droplets,
    Grid3x3,
    Circle,
    Waves,
    Cpu,
    Stars,
    Hexagon,
    Radio,
    Play,
    Pause
} from 'lucide-react';
import { cn } from '../../utils';
import { Button } from './Button';
import { Switch } from './Form';
import type {
    BackgroundConfig,
    BackgroundPattern,
    BackgroundPreviewProps,
    BackgroundsGalleryProps,
    BackgroundGeneratorProps,
    GradientType
} from '../../types';

const patternIcons: Record<BackgroundPattern, React.ReactNode> = {
    gradient: <Palette className="h-4 w-4" />,
    grid: <Grid3x3 className="h-4 w-4" />,
    dots: <Circle className="h-4 w-4" />,
    lines: <Radio className="h-4 w-4" />,
    waves: <Waves className="h-4 w-4" />,
    circuit: <Cpu className="h-4 w-4" />,
    topography: <Droplets className="h-4 w-4" />,
    stars: <Stars className="h-4 w-4" />,
    bubbles: <Circle className="h-4 w-4" />,
    hexagon: <Hexagon className="h-4 w-4" />,
    noise: <Sparkles className="h-4 w-4" />,
    abstract: <Zap className="h-4 w-4" />,
};

const patternNames: Record<BackgroundPattern, string> = {
    gradient: 'Gradient',
    grid: 'Grid',
    dots: 'Dots',
    lines: 'Lines',
    waves: 'Waves',
    circuit: 'Circuit',
    topography: 'Topography',
    stars: 'Stars',
    bubbles: 'Bubbles',
    hexagon: 'Hexagon',
    noise: 'Noise',
    abstract: 'Abstract',
};

const sizeClasses = {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
};

export function BackgroundPreview({
    config,
    size = 'md',
    interactive = true,
    className,
    onSelect,
}: BackgroundPreviewProps) {
    const [copied, setCopied] = useState(false);
    const [isPlaying, setIsPlaying] = useState(config.animated);

    const handleCopy = useCallback(() => {
        const css = generateBackgroundCSS(config);
        navigator.clipboard.writeText(css);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [config]);

    const handlePlayPause = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const generateBackgroundCSS = (bgConfig: BackgroundConfig): string => {
        let css = '';

        switch (bgConfig.pattern) {
            case 'gradient':
                if (bgConfig.gradient) {
                    const { type, stops, angle = 45 } = bgConfig.gradient;
                    const gradientStops = stops.map(stop => `${stop.color} ${stop.position}%`).join(', ');

                    switch (type) {
                        case 'linear':
                            css = `background: linear-gradient(${angle}deg, ${gradientStops});`;
                            break;
                        case 'radial':
                            css = `background: radial-gradient(circle, ${gradientStops});`;
                            break;
                        case 'conic':
                            css = `background: conic-gradient(from ${angle}deg, ${gradientStops});`;
                            break;
                        case 'mesh':
                            css = `background: radial-gradient(circle at 50% 0%, ${gradientStops[0]}, transparent 50%),
                      radial-gradient(circle at 100% 50%, ${gradientStops[1]}, transparent 50%),
                      radial-gradient(circle at 50% 100%, ${gradientStops[2]}, transparent 50%),
                      radial-gradient(circle at 0% 50%, ${gradientStops[3]}, transparent 50%);`;
                            break;
                    }
                } else {
                    css = `background: linear-gradient(135deg, ${bgConfig.colors[0]}, ${bgConfig.colors[1] || bgConfig.colors[0]});`;
                }
                break;

            case 'grid':
                css = `
          background-color: ${bgConfig.colors[0]};
          background-image: 
            linear-gradient(${bgConfig.colors[1] || '#ffffff20'} 1px, transparent 1px),
            linear-gradient(90deg, ${bgConfig.colors[1] || '#ffffff20'} 1px, transparent 1px);
          background-size: ${bgConfig.gradient?.size || 20}px ${bgConfig.gradient?.size || 20}px;
        `;
                break;

            case 'dots':
                css = `
          background-color: ${bgConfig.colors[0]};
          background-image: radial-gradient(${bgConfig.colors[1] || '#ffffff40'} 1px, transparent 1px);
          background-size: ${bgConfig.gradient?.size || 20}px ${bgConfig.gradient?.size || 20}px;
        `;
                break;

            case 'lines':
                css = `
          background-color: ${bgConfig.colors[0]};
          background-image: repeating-linear-gradient(
            45deg,
            ${bgConfig.colors[1] || '#ffffff20'} 0,
            ${bgConfig.colors[1] || '#ffffff20'} 1px,
            transparent 1px,
            transparent ${bgConfig.gradient?.size || 10}px
          );
        `;
                break;

            default:
                css = `background: ${bgConfig.colors[0]};`;
        }

        if (bgConfig.blur) {
            css += `\nbackdrop-filter: blur(${bgConfig.blur}px);`;
        }

        return css;
    };

    const backgroundStyle: React.CSSProperties = {
        backgroundImage: config.pattern === 'gradient' && config.gradient
            ? `${config.gradient.type}-gradient(${config.gradient.type === 'linear'
                ? `${config.gradient.angle || 45}deg, `
                : config.gradient.type === 'conic'
                    ? `from ${config.gradient.angle || 45}deg, `
                    : ''
            }${config.gradient.stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
            : undefined,
        backgroundColor: config.colors[0],
        opacity: config.opacity || 1,
        animation: config.animated && isPlaying
            ? `backgroundAnimation ${config.animationSpeed || 20}s infinite linear`
            : undefined,
    };

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-300',
                sizeClasses[size],
                interactive && 'cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700',
                className
            )}
            onClick={() => onSelect?.(config)}
            style={backgroundStyle}
        >
            {/* Overlay for patterns */}
            {config.pattern !== 'gradient' && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: config.pattern === 'dots'
                            ? `radial-gradient(${config.colors[1] || '#ffffff40'} 1px, transparent 1px)`
                            : config.pattern === 'grid'
                                ? `linear-gradient(${config.colors[1] || '#ffffff20'} 1px, transparent 1px),
                 linear-gradient(90deg, ${config.colors[1] || '#ffffff20'} 1px, transparent 1px)`
                                : config.pattern === 'lines'
                                    ? `repeating-linear-gradient(45deg, ${config.colors[1] || '#ffffff20'} 0, ${config.colors[1] || '#ffffff20'} 1px, transparent 1px, transparent ${config.gradient?.size || 10}px)`
                                    : undefined,
                        backgroundSize: `${config.gradient?.size || 20}px ${config.gradient?.size || 20}px`,
                    }}
                />
            )}

            {/* Interactive overlay */}
            {interactive && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                                {patternIcons[config.pattern]}
                                <span>{patternNames[config.pattern]}</span>
                            </div>

                            {config.animated && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 rounded-full bg-black/70 p-0 text-white hover:bg-black/80"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? (
                                        <Pause className="h-3 w-3" />
                                    ) : (
                                        <Play className="h-3 w-3" />
                                    )}
                                </Button>
                            )}
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 rounded-full bg-black/70 p-0 text-white hover:bg-black/80"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopy();
                            }}
                        >
                            {copied ? (
                                <Check className="h-3 w-3" />
                            ) : (
                                <Copy className="h-3 w-3" />
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {/* Corner indicator */}
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-800 dark:bg-slate-900/90 dark:text-slate-200">
                {patternIcons[config.pattern]}
                <span>{patternNames[config.pattern]}</span>
            </div>

            {/* Animated elements for specific patterns */}
            {config.animated && isPlaying && (
                <>
                    {config.pattern === 'stars' && (
                        <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute h-[1px] w-[1px] rounded-full bg-white"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                                        animationDelay: `${Math.random() * 2}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {config.pattern === 'bubbles' && (
                        <div className="absolute inset-0">
                            {[...Array(15)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute rounded-full border border-white/30"
                                    style={{
                                        width: `${10 + Math.random() * 30}px`,
                                        height: `${10 + Math.random() * 30}px`,
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animation: `float ${10 + Math.random() * 20}s infinite linear`,
                                        animationDelay: `${Math.random() * 5}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}


        </div>
    );
}

export function BackgroundsGallery({
    backgrounds,
    columns = 4,
    size = 'md',
    interactive = true,
    showLabels = true,
    className,
    onBackgroundSelect,
    onBackgroundCopy,
}: BackgroundsGalleryProps) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    };

    const handleSelect = useCallback((config: BackgroundConfig) => {
        onBackgroundSelect?.(config);
    }, [onBackgroundSelect]);

    const handleCopy = useCallback((config: BackgroundConfig) => {
        onBackgroundCopy?.(config);
    }, [onBackgroundCopy]);

    return (
        <div className={cn('space-y-4', className)}>
            <div className={cn('grid gap-4', gridCols[columns])}>
                {backgrounds.map((background) => (
                    <div key={background.id} className="space-y-2">
                        <BackgroundPreview
                            config={background}
                            size={size}
                            interactive={interactive}
                            onSelect={handleSelect}
                        />

                        {showLabels && (
                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                        {background.name}
                                    </h4>
                                    {background.animated && (
                                        <Sparkles className="h-3 w-3 text-yellow-500" />
                                    )}
                                </div>
                                {background.description && (
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {background.description}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function BackgroundGenerator({
    defaultConfig,
    onConfigChange,
    showControls = true,
    className,
}: BackgroundGeneratorProps) {
    const [config, setConfig] = useState<BackgroundConfig>({
        id: 'generator',
        name: 'Custom Background',
        pattern: 'gradient',
        colors: ['#667eea', '#764ba2'],
        gradient: {
            type: 'linear',
            stops: [
                { color: '#667eea', position: 0 },
                { color: '#764ba2', position: 100 },
            ],
            angle: 135,
        },
        animated: false,
        animationSpeed: 20,
        blur: 0,
        opacity: 1,
        ...defaultConfig,
    });

    const [activeTab, setActiveTab] = useState<'pattern' | 'colors' | 'effects'>('pattern');

    const patterns: BackgroundPattern[] = [
        'gradient', 'grid', 'dots', 'lines', 'waves',
        'circuit', 'topography', 'stars', 'bubbles',
        'hexagon', 'noise', 'abstract'
    ];

    const gradientTypes: GradientType[] = ['linear', 'radial', 'conic', 'mesh'];

    const handlePatternChange = useCallback((pattern: BackgroundPattern) => {
        const newConfig = { ...config, pattern };
        setConfig(newConfig);
        onConfigChange?.(newConfig);
    }, [config, onConfigChange]);

    const handleColorChange = useCallback((index: number, color: string) => {
        const newColors = [...config.colors];
        newColors[index] = color;
        const newConfig = { ...config, colors: newColors };
        setConfig(newConfig);
        onConfigChange?.(newConfig);
    }, [config, onConfigChange]);

    const handleGradientTypeChange = useCallback((type: GradientType) => {
        const newConfig = {
            ...config,
            gradient: {
                ...config.gradient!,
                type,
            },
        };
        setConfig(newConfig);
        onConfigChange?.(newConfig);
    }, [config, onConfigChange]);

    const handleGradientStopChange = useCallback((index: number, stop: { color: string; position: number }) => {
        const newStops = [...(config.gradient?.stops || [])];
        newStops[index] = stop;
        const newConfig = {
            ...config,
            gradient: {
                ...config.gradient!,
                stops: newStops,
            },
        };
        setConfig(newConfig);
        onConfigChange?.(newConfig);
    }, [config, onConfigChange]);

    const handleAddGradientStop = useCallback(() => {
        const stops = config.gradient?.stops || [];
        if (stops.length < 5) {
            const newStop = {
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                position: Math.floor(Math.random() * 100),
            };
            const newConfig = {
                ...config,
                gradient: {
                    ...config.gradient!,
                    stops: [...stops, newStop],
                },
            };
            setConfig(newConfig);
            onConfigChange?.(newConfig);
        }
    }, [config, onConfigChange]);

    const handleRemoveGradientStop = useCallback((index: number) => {
        const stops = config.gradient?.stops || [];
        if (stops.length > 2) {
            const newStops = stops.filter((_, i) => i !== index);
            const newConfig = {
                ...config,
                gradient: {
                    ...config.gradient!,
                    stops: newStops,
                },
            };
            setConfig(newConfig);
            onConfigChange?.(newConfig);
        }
    }, [config, onConfigChange]);

    if (!showControls) {
        return (
            <BackgroundPreview
                config={config}
                size="lg"
                interactive={false}
                className={className}
            />
        );
    }

    return (
        <div className={cn('space-y-6', className)}>
            {/* Preview */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <BackgroundPreview
                    config={config}
                    size="lg"
                    interactive={false}
                />
            </div>

            {/* Controls */}
            <div className="space-y-4">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                    {(['pattern', 'colors', 'effects'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'px-4 py-2 text-sm font-medium capitalize transition-colors',
                                activeTab === tab
                                    ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Pattern Selection */}
                {activeTab === 'pattern' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                            {patterns.map((pattern) => (
                                <button
                                    key={pattern}
                                    onClick={() => handlePatternChange(pattern)}
                                    className={cn(
                                        'flex flex-col items-center gap-2 rounded-lg p-3 transition-all',
                                        config.pattern === pattern
                                            ? 'bg-primary-50 border border-primary-200 dark:bg-primary-900/20 dark:border-primary-800'
                                            : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800'
                                    )}
                                >
                                    <div className="h-8 w-8 flex items-center justify-center">
                                        {patternIcons[pattern]}
                                    </div>
                                    <span className="text-xs font-medium">{patternNames[pattern]}</span>
                                </button>
                            ))}
                        </div>

                        {/* Gradient Type Selection */}
                        {config.pattern === 'gradient' && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium">Gradient Type</h4>
                                <div className="flex flex-wrap gap-2">
                                    {gradientTypes.map((type) => (
                                        <Button
                                            key={type}
                                            size="sm"
                                            variant={config.gradient?.type === type ? 'primary' : 'outline'}
                                            onClick={() => handleGradientTypeChange(type)}
                                            className="capitalize"
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </div>

                                {/* Gradient Stops Editor */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium">Color Stops</h4>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={handleAddGradientStop}
                                            disabled={(config.gradient?.stops.length || 0) >= 5}
                                        >
                                            Add Color
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        {config.gradient?.stops.map((stop, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="color"
                                                    value={stop.color}
                                                    onChange={(e) => handleGradientStopChange(index, {
                                                        ...stop,
                                                        color: e.target.value,
                                                    })}
                                                    className="h-8 w-12 cursor-pointer"
                                                />
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={stop.position}
                                                    onChange={(e) => handleGradientStopChange(index, {
                                                        ...stop,
                                                        position: parseInt(e.target.value),
                                                    })}
                                                    className="flex-1"
                                                />
                                                <span className="text-xs w-8 text-right">{stop.position}%</span>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleRemoveGradientStop(index)}
                                                    disabled={(config.gradient?.stops.length || 0) <= 2}
                                                    className="h-6 w-6 p-0"
                                                >
                                                    ×
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Color Selection */}
                {activeTab === 'colors' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {config.colors.map((color, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Color {index + 1}</span>
                                        <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                            {color}
                                        </code>
                                    </div>
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => handleColorChange(index, e.target.value)}
                                        className="h-12 w-full cursor-pointer rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Add/Remove Colors */}
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    const newColors = [...config.colors, `#${Math.floor(Math.random() * 16777215).toString(16)}`];
                                    const newConfig = { ...config, colors: newColors };
                                    setConfig(newConfig);
                                    onConfigChange?.(newConfig);
                                }}
                                disabled={config.colors.length >= 4}
                            >
                                Add Color
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    const newColors = config.colors.slice(0, -1);
                                    const newConfig = { ...config, colors: newColors };
                                    setConfig(newConfig);
                                    onConfigChange?.(newConfig);
                                }}
                                disabled={config.colors.length <= 1}
                            >
                                Remove Color
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === 'effects' && (
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-sm font-medium">Animation</span>
                                </div>
                                <Switch
                                    checked={config.animated || false}
                                    onCheckedChange={(checked) => {
                                        const newConfig = { ...config, animated: checked };
                                        setConfig(newConfig);
                                        onConfigChange?.(newConfig);
                                    }}
                                />
                            </div>

                            {config.animated && (
                                <div className="space-y-2 pl-6">
                                    <label className="text-sm text-slate-600 dark:text-slate-400">
                                        Speed: {config.animationSpeed}s
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="60"
                                        value={config.animationSpeed || 20}
                                        onChange={(e) => {
                                            const newConfig = {
                                                ...config,
                                                animationSpeed: parseInt(e.target.value),
                                            };
                                            setConfig(newConfig);
                                            onConfigChange?.(newConfig);
                                        }}
                                        className="w-full"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Blur Effect</span>
                                <span className="text-sm text-slate-500">{config.blur}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={config.blur || 0}
                                onChange={(e) => {
                                    const newConfig = { ...config, blur: parseInt(e.target.value) };
                                    setConfig(newConfig);
                                    onConfigChange?.(newConfig);
                                }}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Opacity</span>
                                <span className="text-sm text-slate-500">{config.opacity || 1}</span>
                            </div>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                value={config.opacity || 1}
                                onChange={(e) => {
                                    const newConfig = { ...config, opacity: parseFloat(e.target.value) };
                                    setConfig(newConfig);
                                    onConfigChange?.(newConfig);
                                }}
                                className="w-full"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export function LiveBackground({
    config,
    children,
    className,
}: {
    config: BackgroundConfig;
    children?: React.ReactNode;
    className?: string;
}) {
    const backgroundStyle: React.CSSProperties = {
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: config.pattern === 'gradient' && config.gradient
            ? `${config.gradient.type}-gradient(${config.gradient.type === 'linear'
                ? `${config.gradient.angle || 45}deg, `
                : config.gradient.type === 'conic'
                    ? `from ${config.gradient.angle || 45}deg, `
                    : ''
            }${config.gradient.stops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
            : undefined,
        backgroundColor: config.colors[0],
        opacity: config.opacity || 1,
        animation: config.animated
            ? `backgroundAnimation ${config.animationSpeed || 20}s infinite linear`
            : undefined,
    };

    return (
        <div className={cn('relative overflow-hidden', className)} style={backgroundStyle}>
            {/* Pattern overlay */}
            {config.pattern !== 'gradient' && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: config.pattern === 'dots'
                            ? `radial-gradient(${config.colors[1] || '#ffffff40'} 1px, transparent 1px)`
                            : config.pattern === 'grid'
                                ? `linear-gradient(${config.colors[1] || '#ffffff20'} 1px, transparent 1px),
                 linear-gradient(90deg, ${config.colors[1] || '#ffffff20'} 1px, transparent 1px)`
                                : config.pattern === 'lines'
                                    ? `repeating-linear-gradient(45deg, ${config.colors[1] || '#ffffff20'} 0, ${config.colors[1] || '#ffffff20'} 1px, transparent 1px, transparent ${config.gradient?.size || 10}px)`
                                    : undefined,
                        backgroundSize: `${config.gradient?.size || 20}px ${config.gradient?.size || 20}px`,
                    }}
                />
            )}

            {/* Animated elements */}
            {config.animated && (
                <>
                    {config.pattern === 'stars' && (
                        <div className="absolute inset-0">
                            {[...Array(50)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute h-[2px] w-[2px] rounded-full bg-white"
                                    style={{
                                        top: `${Math.random() * 100}%`,
                                        left: `${Math.random() * 100}%`,
                                        animation: `twinkle ${2 + Math.random() * 3}s infinite`,
                                        animationDelay: `${Math.random() * 2}s`,
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Content */}
            <div className="relative z-10">{children}</div>


        </div>
    );
}