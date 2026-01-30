import  { useState } from 'react';
import { 
  Palette, 
   Copy, 
  Check, 
  Download
 
} from 'lucide-react';
import { BackgroundsGallery, BackgroundGenerator, LiveBackground } from '../components/ui/Backgrounds';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';
import type { BackgroundConfig } from '../types';

const BackgroundsView = () => {
  const [animate, setAnimate] = useState(true);
  const [selectedBackground, setSelectedBackground] = useState<BackgroundConfig | null>(null);
  const [copied, setCopied] = useState(false);

   const gradientBackgrounds: BackgroundConfig[] = [
    {
      id: 1,
      name: 'Sunset Glow',
      description: 'Beautiful sunset gradient',
      pattern: 'gradient',
      colors: ['#ff7e5f', '#feb47b'],
      gradient: {
        type: 'linear',
        stops: [
          { color: '#ff7e5f', position: 0 },
          { color: '#feb47b', position: 100 },
        ],
        angle: 135,
      },
      animated: false,
    },
    {
      id: 2,
      name: 'Ocean Breeze',
      description: 'Calm ocean colors',
      pattern: 'gradient',
      colors: ['#667eea', '#764ba2'],
      gradient: {
        type: 'radial',
        stops: [
          { color: '#667eea', position: 0 },
          { color: '#764ba2', position: 100 },
        ],
      },
      animated: true,
      animationSpeed: 30,
    },
    {
      id: 3,
      name: 'Cosmic Dust',
      description: 'Space-inspired gradient',
      pattern: 'gradient',
      colors: ['#0f0c29', '#302b63', '#24243e'],
      gradient: {
        type: 'conic',
        stops: [
          { color: '#0f0c29', position: 0 },
          { color: '#302b63', position: 50 },
          { color: '#24243e', position: 100 },
        ],
        angle: 0,
      },
      animated: true,
      animationSpeed: 40,
    },
    {
      id: 4,
      name: 'Neon Dream',
      description: 'Vibrant neon mesh',
      pattern: 'gradient',
      colors: ['#ff00cc', '#3333ff', '#00ffcc'],
      gradient: {
        type: 'mesh',
        stops: [
          { color: '#ff00cc', position: 0 },
          { color: '#3333ff', position: 33 },
          { color: '#00ffcc', position: 66 },
          { color: '#ffcc00', position: 100 },
        ],
      },
      animated: true,
      animationSpeed: 25,
    },
  ];

  const patternBackgrounds: BackgroundConfig[] = [
    {
      id: 5,
      name: 'Pixel Grid',
      description: 'Modern grid pattern',
      pattern: 'grid',
      colors: ['#0a0a0a', '#ffffff20'],
      gradient: { type: 'linear', stops: [], size: 20 },
      animated: false,
    },
    {
      id: 6,
      name: 'Quantum Dots',
      description: 'Animated dot matrix',
      pattern: 'dots',
      colors: ['#1a1a2e', '#ffffff40'],
      gradient: { type: 'linear', stops: [], size: 25 },
      animated: true,
      animationSpeed: 15,
    },
    {
      id: 7,
      name: 'Wave Lines',
      description: 'Dynamic line pattern',
      pattern: 'lines',
      colors: ['#16213e', '#ffffff30'],
      gradient: { type: 'linear', stops: [], size: 15 },
      animated: true,
      animationSpeed: 20,
    },
    {
      id: 8,
      name: 'Circuit Board',
      description: 'Tech-inspired pattern',
      pattern: 'circuit',
      colors: ['#000000', '#00ff88'],
      gradient: { type: 'linear', stops: [], size: 30 },
      animated: true,
      animationSpeed: 10,
    },
    {
      id: 9,
      name: 'Starry Night',
      description: 'Animated star field',
      pattern: 'stars',
      colors: ['#0a0a2a', '#ffffff'],
      animated: true,
      animationSpeed: 50,
    },
    {
      id: 10,
      name: 'Hexagon Mesh',
      description: 'Geometric honeycomb',
      pattern: 'hexagon',
      colors: ['#1e3c72', '#ffffff20'],
      gradient: { type: 'linear', stops: [], size: 40 },
      animated: false,
    },
    {
      id: 11,
      name: 'Topography',
      description: 'Mountain contour lines',
      pattern: 'topography',
      colors: ['#2c3e50', '#ecf0f1'],
      gradient: { type: 'linear', stops: [], size: 25 },
      animated: false,
    },
    {
      id: 12,
      name: 'Digital Noise',
      description: 'Grainy texture effect',
      pattern: 'noise',
      colors: ['#2d3436', '#636e72'],
      animated: true,
      animationSpeed: 5,
      opacity: 0.9,
    },
  ];

 
  const handleBackgroundSelect = (config: BackgroundConfig) => {
    setSelectedBackground(config);
  };

  const handleBackgroundCopy = (config: BackgroundConfig) => {
    const css = generateBackgroundCSS(config);
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateBackgroundCSS = (config: BackgroundConfig): string => {
    let css = '';
    
    switch (config.pattern) {
      case 'gradient':
        if (config.gradient) {
          const { type, stops, angle = 45 } = config.gradient;
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
        }
        break;
        
      case 'grid':
        css = `
          background-color: ${config.colors[0]};
          background-image: 
            linear-gradient(${config.colors[1] || '#ffffff20'} 1px, transparent 1px),
            linear-gradient(90deg, ${config.colors[1] || '#ffffff20'} 1px, transparent 1px);
          background-size: ${config.gradient?.size || 20}px ${config.gradient?.size || 20}px;
        `;
        break;
        
      case 'dots':
        css = `
          background-color: ${config.colors[0]};
          background-image: radial-gradient(${config.colors[1] || '#ffffff40'} 1px, transparent 1px);
          background-size: ${config.gradient?.size || 20}px ${config.gradient?.size || 20}px;
        `;
        break;
        
      default:
        css = `background: ${config.colors[0]};`;
    }
    
    return css;
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Backgrounds & Patterns
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Beautiful background patterns, gradients, and animations for your projects.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Animation</span>
            <Switch checked={animate} onCheckedChange={setAnimate} />
          </div>
          
          {selectedBackground && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                leftIcon={copied ? <Check size={14} /> : <Copy size={14} />}
                onClick={() => handleBackgroundCopy(selectedBackground)}
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                leftIcon={<Download size={14} />}
                onClick={() => {
                  const css = generateBackgroundCSS(selectedBackground);
                  const blob = new Blob([css], { type: 'text/css' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `background-${selectedBackground.name.toLowerCase().replace(/\s+/g, '-')}.css`;
                  a.click();
                }}
              >
                Download
              </Button>
            </div>
          )}
        </div>
        
        <div className="text-sm text-slate-500">
          Click on any background to select it
        </div>
      </div>

      {/* Gradient Backgrounds */}
      <ComponentPreview
        title="Gradient Backgrounds"
        description="Beautiful gradient backgrounds with various types and animations."
        code={`import { BackgroundsGallery } from '../components/ui/Backgrounds';

const gradientBackgrounds = [
  {
    id: 1,
    name: 'Sunset Glow',
    pattern: 'gradient',
    colors: ['#ff7e5f', '#feb47b'],
    gradient: {
      type: 'linear',
      stops: [
        { color: '#ff7e5f', position: 0 },
        { color: '#feb47b', position: 100 },
      ],
      angle: 135,
    },
  },
];

<BackgroundsGallery
  backgrounds={gradientBackgrounds}
  columns={4}
  size="md"
  interactive={true}
  onBackgroundSelect={handleSelect}
  onBackgroundCopy={handleCopy}
/>`}
      >
        <BackgroundsGallery
          backgrounds={gradientBackgrounds}
          columns={4}
          size="md"
          interactive={true}
          onBackgroundSelect={handleBackgroundSelect}
          onBackgroundCopy={handleBackgroundCopy}
        />
      </ComponentPreview>

      {/* Pattern Backgrounds */}
      <ComponentPreview
        title="Pattern Backgrounds"
        description="Various patterns including grids, dots, lines, and more."
        code={`<BackgroundsGallery
  backgrounds={patternBackgrounds}
  columns={4}
  size="md"
  interactive={true}
  showLabels={true}
/>`}
      >
        <BackgroundsGallery
          backgrounds={patternBackgrounds}
          columns={4}
          size="md"
          interactive={true}
          showLabels={true}
          onBackgroundSelect={handleBackgroundSelect}
          onBackgroundCopy={handleBackgroundCopy}
        />
      </ComponentPreview>

      {/* Background Generator */}
      <ComponentPreview
        title="Background Generator"
        description="Interactive tool to create custom backgrounds with real-time preview."
        code={`import { BackgroundGenerator } from '../components/ui/Backgrounds';

const [customBackground, setCustomBackground] = useState();

<BackgroundGenerator
  onConfigChange={setCustomBackground}
  showControls={true}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <BackgroundGenerator
            onConfigChange={(config) => setSelectedBackground(config)}
            showControls={true}
          />
        </div>
      </ComponentPreview>

      {/* Live Background Preview */}
      {selectedBackground && (
        <ComponentPreview
          title="Live Background Preview"
          description="See your selected background in action with full-screen preview."
          code={`import { LiveBackground } from '../components/ui/Backgrounds';

<LiveBackground config={selectedBackground}>
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Your Content Here</h1>
      <p className="text-xl opacity-90">
        This is how your background will look with content
      </p>
    </div>
  </div>
</LiveBackground>`}
        >
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="h-96 overflow-hidden">
              <LiveBackground config={selectedBackground}>
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 backdrop-blur-sm bg-white/10 rounded-2xl border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {selectedBackground.name}
                    </h3>
                    <p className="text-white/80">
                      This is how your background looks with content
                    </p>
                    <div className="mt-4 flex gap-2 justify-center">
                      <Button variant="outline" className="bg-white/20 text-white border-white/30">
                        Call to Action
                      </Button>
                      <Button variant="primary" className="bg-white text-slate-900">
                        Primary Button
                      </Button>
                    </div>
                  </div>
                </div>
              </LiveBackground>
            </div>
          </div>
        </ComponentPreview>
      )}

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete example showing how to implement backgrounds in your project."
        code={`import { LiveBackground, BackgroundsGallery } from '../components/ui/Backgrounds';
import { Button } from '../components/ui/Button';

const AppBackground = () => {
  const backgroundConfig = {
    id: 'app-bg',
    name: 'Cosmic Background',
    pattern: 'stars',
    colors: ['#0a0a2a', '#ffffff'],
    animated: true,
    animationSpeed: 50,
  };

  return (
    <LiveBackground config={backgroundConfig}>
      <div className="min-h-screen p-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white">My Awesome App</h1>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  Feature {item}
                </h3>
                <p className="text-white/80">
                  Description of this amazing feature.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </LiveBackground>
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Palette className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">
              Dynamic Background System
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Create stunning backgrounds with gradients, patterns, and animations.
              Perfect for hero sections, dashboards, and immersive experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Gradients
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                Patterns
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Animations
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                Interactive
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">
                CSS Export
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

    </div>
  );
};

export default BackgroundsView;