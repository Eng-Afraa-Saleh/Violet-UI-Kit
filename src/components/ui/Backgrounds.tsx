import React, { useState, useCallback, useMemo } from 'react';
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

// --- Icons & Labels Mapping ---
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

// --- Helper: Generate Pattern Styles ---
// This function creates the CSS background image strings for all patterns
const getPatternBackgroundImage = (config: BackgroundConfig): string | undefined => {
    const primaryColor = config.colors[1] || 'rgba(255,255,255,0.1)';
    const size = config.gradient?.size || 20;

    // Helper to encode SVG for data URI
    const svgToDataUri = (svgString: string) => 
        `url("data:image/svg+xml,${encodeURIComponent(svgString.trim())}")`;

    switch (config.pattern) {
        case 'dots':
            return `radial-gradient(${primaryColor} 1px, transparent 1px)`;
        
        case 'grid':
            return `linear-gradient(${primaryColor} 1px, transparent 1px),
                    linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)`;
        
        case 'lines':
            return `repeating-linear-gradient(45deg, ${primaryColor} 0, ${primaryColor} 1px, transparent 0, transparent 50%)`;
            
        case 'hexagon':
             return svgToDataUri(`
                <svg width='${size * 2}' height='${size * 2}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z' fill='none' stroke='${primaryColor}' stroke-width='1'/>
                </svg>
             `);

        case 'circuit':
             return svgToDataUri(`
                <svg width='${size * 4}' height='${size * 4}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M10,10 L90,10 M10,10 L10,90 M50,50 L90,50 M50,50 L50,90' stroke='${primaryColor}' stroke-width='2' fill='none'/>
                    <circle cx='10' cy='10' r='4' fill='${primaryColor}'/>
                    <circle cx='50' cy='50' r='4' fill='${primaryColor}'/>
                    <circle cx='90' cy='10' r='2' fill='${primaryColor}'/>
                </svg>
             `);

        case 'topography':
            return svgToDataUri(`
                <svg width='${size * 5}' height='${size * 5}' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 50 Q 25 25, 50 50 T 100 50' stroke='${primaryColor}' fill='none' stroke-width='1'/>
                    <path d='M0 30 Q 25 5, 50 30 T 100 30' stroke='${primaryColor}' fill='none' stroke-width='1' opacity='0.5'/>
                    <path d='M0 70 Q 25 45, 50 70 T 100 70' stroke='${primaryColor}' fill='none' stroke-width='1' opacity='0.5'/>
                </svg>
            `);

        case 'noise':
            return `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`;

        case 'waves':
             return `radial-gradient(circle at 50% 100%, ${primaryColor} 0, transparent 50%), 
                     radial-gradient(circle at 50% 0%, ${primaryColor} 0, transparent 50%)`;

        default:
            return undefined;
    }
};

const getBackgroundBaseStyle = (config: BackgroundConfig, isPlaying: boolean): React.CSSProperties => {
    const isGradient = config.pattern === 'gradient';
    let background = config.colors[0];

    // Handle Main Gradient Logic
    if (isGradient && config.gradient) {
        const { type, stops, angle = 45 } = config.gradient;
        const stopString = stops.map(s => `${s.color} ${s.position}%`).join(', ');
        
        if (type === 'linear') background = `linear-gradient(${angle}deg, ${stopString})`;
        if (type === 'radial') background = `radial-gradient(circle, ${stopString})`;
        if (type === 'conic') background = `conic-gradient(from ${angle}deg, ${stopString})`;
        if (type === 'mesh') {
             background = `
                radial-gradient(at 0% 0%, ${stops[0]?.color || config.colors[0]} 0px, transparent 50%),
                radial-gradient(at 100% 0%, ${stops[1]?.color || config.colors[1]} 0px, transparent 50%),
                radial-gradient(at 100% 100%, ${stops[2]?.color || config.colors[2] || config.colors[0]} 0px, transparent 50%),
                radial-gradient(at 0% 100%, ${stops[3]?.color || config.colors[0]} 0px, transparent 50%)
             `;
             // Mesh often needs a base color
             return {
                 backgroundColor: config.colors[0],
                 backgroundImage: background,
                 backgroundSize: '150% 150%', // Mesh looks better larger
                 animation: config.animated && isPlaying ? `backgroundAnimation ${config.animationSpeed || 10}s ease infinite` : undefined,
                 opacity: config.opacity || 1
             };
        }
    }

    return {
        background: background,
        backgroundColor: config.colors[0], // Fallback/Base
        // Important: For gradients to animate position, size must be larger than container
        backgroundSize: (config.animated && isGradient) ? '400% 400%' : 'cover',
        animation: (config.animated && isGradient && isPlaying) 
            ? `backgroundAnimation ${config.animationSpeed || 15}s ease infinite` 
            : undefined,
        opacity: config.opacity || 1
    };
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
        // Simplified copy logic for demo
        navigator.clipboard.writeText(`/* CSS for ${config.name} */\nbackground: ${config.colors[0]};`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [config]);

    const handlePlayPause = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // Calculate styles
    const containerStyle = useMemo(() => getBackgroundBaseStyle(config, isPlaying??false), [config, isPlaying]);
    const patternImage = useMemo(() => getPatternBackgroundImage(config), [config]);
    const patternSize = config.gradient?.size || 20;

    return (
        <div
            className={cn(
                'group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-300',
                sizeClasses[size],
                interactive && 'cursor-pointer hover:shadow-xl hover:scale-[1.02] hover:border-primary-300 dark:hover:border-primary-700',
                className
            )}
            onClick={() => onSelect?.(config)}
            style={containerStyle}
        >
            {/* Pattern Overlay */}
            {config.pattern !== 'gradient' && patternImage && (
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: patternImage,
                        backgroundSize: `${patternSize}px ${patternSize}px`,
                        opacity: 0.6 // Subtle pattern overlay
                    }}
                />
            )}

            {/* Backdrop Blur if configured */}
            {config.blur && config.blur > 0 && (
                <div className="absolute inset-0 backdrop-blur-[2px]" style={{ backdropFilter: `blur(${config.blur}px)` }} />
            )}

            {/* Interactive Overlay */}
            {interactive && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10">
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/90 dark:bg-black/70 px-2 py-1 text-xs text-slate-900 dark:text-white backdrop-blur-md">
                                {patternIcons[config.pattern]}
                                <span>{patternNames[config.pattern]}</span>
                            </div>

                            {config.animated && (
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 rounded-full bg-white/90 dark:bg-black/70 p-0 text-slate-900 dark:text-white hover:bg-white/100"
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                                </Button>
                            )}
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 rounded-full bg-white/90 dark:bg-black/70 p-0 text-slate-900 dark:text-white hover:bg-white/100"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopy();
                            }}
                        >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                    </div>
                </div>
            )}

            {/* Always visible label (top-left) */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/80 dark:bg-black/50 px-2 py-1 text-xs font-medium text-slate-800 dark:text-slate-200 backdrop-blur-sm border border-white/20">
                {patternIcons[config.pattern]}
                <span>{patternNames[config.pattern]}</span>
            </div>

            {/* Special Animations (Stars, Bubbles) */}
            {config.animated && isPlaying && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {config.pattern === 'stars' && [...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `twinkle ${2 + Math.random() * 3}s infinite alternate`,
                                animationDelay: `${Math.random() * 2}s`,
                                opacity: Math.random()
                            }}
                        />
                    ))}

                    {config.pattern === 'bubbles' && [...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-white/30 bg-white/5"
                            style={{
                                width: `${20 + Math.random() * 40}px`,
                                height: `${20 + Math.random() * 40}px`,
                                bottom: '-50px',
                                left: `${Math.random() * 100}%`,
                                animation: `float ${5 + Math.random() * 10}s infinite linear`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
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
 }: BackgroundsGalleryProps) {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
        6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    };

    return (
        <div className={cn('space-y-4', className)}>
            <div className={cn('grid gap-4', gridCols[columns])}>
                {backgrounds.map((background) => (
                    <div key={background.id} className="space-y-2">
                        <BackgroundPreview
                            config={background}
                            size={size}
                            interactive={interactive}
                            onSelect={onBackgroundSelect}
                        />
                        {showLabels && (
                            <div className="flex justify-between items-start px-1">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-50 leading-tight">
                                        {background.name}
                                    </h4>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                                        {patternNames[background.pattern]}
                                    </p>
                                </div>
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
    // ... (Keep existing state logic, it is mostly fine, just ensuring it passes complete config)
    const [config, setConfig] = useState<BackgroundConfig>({
        id: 'generator',
        name: 'Custom Background',
        pattern: 'gradient',
        colors: ['#4f46e5', '#818cf8'], // Use visible colors by default
        gradient: {
            type: 'linear',
            stops: [
                { color: '#4f46e5', position: 0 },
                { color: '#818cf8', position: 100 },
            ],
            angle: 135,
            size: 20
        },
        animated: true,
        animationSpeed: 20,
        blur: 0,
        opacity: 1,
        ...defaultConfig,
    });

    const [activeTab, setActiveTab] = useState<'pattern' | 'colors' | 'effects'>('pattern');

    // ... (Handlers - these are fine in your original code, just make sure `onConfigChange` is called)
    // Re-implementing a simplified version of handlers to ensure they work with the new structure if needed, 
    // but the original logic for state updates was mostly correct.
    
    // Quick Handler Fixes:
    const updateConfig = (updates: Partial<BackgroundConfig>) => {
        const newConfig = { ...config, ...updates };
        setConfig(newConfig);
        onConfigChange?.(newConfig);
    };

    const patterns: BackgroundPattern[] = [
        'gradient', 'grid', 'dots', 'lines', 'waves',
        'circuit', 'topography', 'stars', 'bubbles',
        'hexagon', 'noise'
    ];

    if (!showControls) {
        return <BackgroundPreview config={config} size="lg" interactive={false} className={className} />;
    }

    return (
        <div className={cn('space-y-6', className)}>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/50">
                <BackgroundPreview config={config} size="lg" interactive={false} />
            </div>

            {/* Controls Container */}
            <div className="space-y-6">
                {/* Tabs */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {(['pattern', 'colors', 'effects'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'flex-1 py-1.5 text-sm font-medium rounded-md capitalize transition-all',
                                activeTab === tab
                                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                    {activeTab === 'pattern' && (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {patterns.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => updateConfig({ pattern: p })}
                                    className={cn(
                                        'flex flex-col items-center justify-center gap-1 p-2 rounded-lg border transition-all aspect-square',
                                        config.pattern === p
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700'
                                    )}
                                >
                                    <div className="opacity-80">{patternIcons[p]}</div>
                                    <span className="text-[10px] truncate w-full text-center">{patternNames[p]}</span>
                                </button>
                            ))}
                            
                            {config.pattern === 'gradient' && (
                                <div className="col-span-full mt-4 space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Gradient Type</label>
                                    <div className="flex gap-2">
                                        {(['linear', 'radial', 'conic', 'mesh'] as GradientType[]).map(t => (
                                            <Button 
                                                key={t} 
                                                size="sm" 
                                                variant={config.gradient?.type === t ? 'primary' : 'outline'}
                                                onClick={() => setConfig({
                                                    ...config,
                                                    gradient: { ...config.gradient!, type: t }
                                                })}
                                            >
                                                {t}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                             {/* Scale/Size Slider for patterns */}
                             {config.pattern !== 'gradient' && (
                                <div className="col-span-full mt-4 space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Pattern Size: {config.gradient?.size}px</label>
                                    <input 
                                        type="range" min="10" max="100" 
                                        value={config.gradient?.size || 20}
                                        onChange={(e) => setConfig({
                                            ...config,
                                            gradient: { ...config.gradient!, size: Number(e.target.value) }
                                        })}
                                        className="w-full accent-primary-500"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'colors' && (
                        <div className="space-y-4">
                            {config.colors.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                                        <input
                                            type="color"
                                            value={color}
                                            onChange={(e) => {
                                                const newColors = [...config.colors];
                                                newColors[idx] = e.target.value;
                                                updateConfig({ colors: newColors });
                                            }}
                                            className="h-full w-full opacity-0 cursor-pointer"
                                            style={{ backgroundColor: color }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Color {idx + 1}</p>
                                        <p className="text-xs text-slate-500">{color}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-2 flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => updateConfig({ colors: [...config.colors, '#ffffff'] })} disabled={config.colors.length >= 4}>
                                    Add Color
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => updateConfig({ colors: config.colors.slice(0, -1) })} disabled={config.colors.length <= 1}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'effects' && (
                         <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-medium">Animation</h4>
                                    <p className="text-xs text-slate-500">Enable movement</p>
                                </div>
                                <Switch checked={config.animated} onCheckedChange={(c) => updateConfig({ animated: c })} />
                            </div>

                            {config.animated && (
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500">Speed ({config.animationSpeed}s)</label>
                                    <input 
                                        type="range" min="1" max="60" 
                                        value={config.animationSpeed || 20}
                                        onChange={(e) => updateConfig({ animationSpeed: Number(e.target.value) })}
                                        className="w-full accent-primary-500"
                                    />
                                </div>
                            )}

                             <div className="space-y-2">
                                <label className="text-xs text-slate-500">Opacity ({config.opacity})</label>
                                <input 
                                    type="range" min="0" max="1" step="0.1"
                                    value={config.opacity || 1}
                                    onChange={(e) => updateConfig({ opacity: Number(e.target.value) })}
                                    className="w-full accent-primary-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
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
    // Reuse the exact same style logic as the preview
    const containerStyle = useMemo(() => getBackgroundBaseStyle(config, true), [config]);
    const patternImage = useMemo(() => getPatternBackgroundImage(config), [config]);
    const patternSize = config.gradient?.size || 20;

    return (
        <div className={cn('relative w-full overflow-hidden transition-all duration-500', className)} style={{...containerStyle, minHeight: '100%'}}>
            
            {/* Pattern Layer */}
            {config.pattern !== 'gradient' && patternImage && (
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: patternImage,
                        backgroundSize: `${patternSize}px ${patternSize}px`,
                        opacity: 0.5
                    }}
                />
            )}

            {/* Stars/Bubbles Animation Layer */}
            {config.animated && (
                 <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    {config.pattern === 'stars' && [...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 3 + 'px',
                                height: Math.random() * 3 + 'px',
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `twinkle ${2 + Math.random() * 4}s infinite alternate`,
                                animationDelay: `${Math.random() * 5}s`,
                                opacity: Math.random()
                            }}
                        />
                    ))}
                     {config.pattern === 'bubbles' && [...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-white/20 bg-white/5"
                            style={{
                                width: `${20 + Math.random() * 60}px`,
                                height: `${20 + Math.random() * 60}px`,
                                bottom: '-100px',
                                left: `${Math.random() * 100}%`,
                                animation: `float ${10 + Math.random() * 15}s infinite linear`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Content Layer */}
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    );
}