import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon, Zap, DollarSign, Target, Settings, Thermometer, Bell, Battery, Wifi, Music, Mic } from 'lucide-react';
 import { Slider, RangeSlider } from '../components/ui/Slider';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Layout';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';

const SliderView = () => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [temperature, setTemperature] = useState(22);
  const [priceRange, setPriceRange] = useState({ min: 25, max: 75 });
  const [performance, setPerformance] = useState(80);
  const [notificationVolume, setNotificationVolume] = useState(50);
  const [micSensitivity, setMicSensitivity] = useState(65);
  const [batterySaver, setBatterySaver] = useState(30);
  const [wifiStrength, setWifiStrength] = useState(85);
  const [musicVolume, setMusicVolume] = useState(70);

  const formatCurrency = (value: number) => `$${value}`;
  const formatTemperature = (value: number) => `${value}°C`;
  const formatPercent = (value: number) => `${value}%`;

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Slider</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Interactive slider controls for selecting values from a range with multiple variants.
        </p>
      </div>

      {/* Default Slider */}
      <ComponentPreview
        title="Default Slider"
        description="Basic slider with value display and keyboard navigation."
        code={`const [volume, setVolume] = useState(75);

<Slider
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  step={1}
  label="Volume"
  showValue={true}
  showLabels={true}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <Slider
              value={volume}
              onChange={setVolume}
              min={0}
              max={100}
              step={1}
              label="Volume"
              showValue={true}
              showLabels={true}
              iconLeft={<VolumeX size={20} />}
              iconRight={<Volume2 size={20} />}
            />
            
            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
              <span>Current value: {volume}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs">Try:</span>
                <Button size="sm" variant="outline" onClick={() => setVolume(0)}>Mute</Button>
                <Button size="sm" variant="outline" onClick={() => setVolume(50)}>50%</Button>
                <Button size="sm" variant="outline" onClick={() => setVolume(100)}>Max</Button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Slider Variants */}
      <ComponentPreview
        title="Slider Variants"
        description="Different visual styles for sliders including gradient and thumb variants."
        code={`<div className="space-y-6">
  <Slider variant="default" label="Default" value={50} />
  <Slider variant="range" label="Range Style" value={50} />
  <Slider variant="gradient" label="Gradient" value={50} />
  <Slider variant="thumb" label="Thumb Style" value={50} />
</div>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <Slider
              variant="default"
              label="Default Slider"
              value={50}
              showValue={true}
            />
            
            <Slider
              variant="range"
              label="Range Style"
              value={65}
              showValue={true}
            />
            
            <Slider
              variant="gradient"
              label="Gradient Style"
              value={35}
              showValue={true}
            />
            
            <Slider
              variant="thumb"
              label="Thumb Style"
              value={80}
              showValue={true}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Slider Sizes */}
      <ComponentPreview
        title="Slider Sizes"
        description="Sliders available in small, medium, and large sizes."
        code={`<div className="space-y-6">
  <Slider size="sm" label="Small" value={30} />
  <Slider size="md" label="Medium (Default)" value={50} />
  <Slider size="lg" label="Large" value={70} />
</div>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <Slider
              size="sm"
              label="Small Size"
              value={30}
              showValue={true}
            />
            
            <Slider
              size="md"
              label="Medium Size (Default)"
              value={50}
              showValue={true}
            />
            
            <Slider
              size="lg"
              label="Large Size"
              value={70}
              showValue={true}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Slider with Marks */}
      <ComponentPreview
        title="Slider with Marks"
        description="Slider with value marks and custom formatting."
        code={`<Slider
  label="Temperature"
  value={temperature}
  onChange={setTemperature}
  min={10}
  max={40}
  step={0.5}
  showMarks={true}
  marks={[10, 20, 30, 40]}
  formatValue={formatTemperature}
  iconLeft={<Thermometer size={20} />}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <Slider
              label="Temperature Control"
              value={temperature}
              onChange={setTemperature}
              min={10}
              max={40}
              step={0.5}
              showMarks={true}
              marks={[10, 20, 30, 40]}
              formatValue={formatTemperature}
              iconLeft={<Thermometer size={20} />}
              showValue={true}
            />
            
            <div className="flex items-center justify-center gap-4">
              <Button size="sm" variant="outline" onClick={() => setTemperature(18)}>
                Cool (18°C)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setTemperature(22)}>
                Comfort (22°C)
              </Button>
              <Button size="sm" variant="outline" onClick={() => setTemperature(26)}>
                Warm (26°C)
              </Button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Range Slider */}
      <ComponentPreview
        title="Range Slider"
        description="Dual-thumb slider for selecting a range of values."
        code={`const [priceRange, setPriceRange] = useState({ min: 25, max: 75 });

<RangeSlider
  minValue={priceRange.min}
  maxValue={priceRange.max}
  min={0}
  max={100}
  step={5}
  label="Price Range"
  formatValue={formatCurrency}
  onChange={setPriceRange}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <RangeSlider
              minValue={priceRange.min}
              maxValue={priceRange.max}
              min={0}
              max={100}
              step={5}
              label="Price Range Filter"
              formatValue={formatCurrency}
              onChange={setPriceRange}
            />
            
            <Card className="p-4">
              <div className="text-center space-y-2">
                <div className="text-sm text-slate-500 dark:text-slate-400">Selected Range</div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  ${Math.round(priceRange.max - priceRange.min)} range
                </div>
              </div>
            </Card>
          </div>
        </div>
      </ComponentPreview>

      {/* Vertical Slider */}
      <ComponentPreview
        title="Vertical Slider"
        description="Vertical orientation slider for specialized interfaces."
        code={`<Slider
  variant="vertical"
  label="Brightness"
  value={brightness}
  onChange={setBrightness}
  min={0}
  max={100}
  showValue={true}
  iconLeft={<Sun size={20} />}
  iconRight={<Moon size={20} />}
  formatValue={formatPercent}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="space-y-4">
              <Slider
                variant="vertical"
                label="Screen Brightness"
                value={brightness}
                onChange={setBrightness}
                min={0}
                max={100}
                showValue={true}
                formatValue={formatPercent}
              />
              
              <div className="flex justify-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setBrightness(0)}>
                  <Moon size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setBrightness(50)}>
                  50%
                </Button>
                <Button size="sm" variant="outline" onClick={() => setBrightness(100)}>
                  <Sun size={16} />
                </Button>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className={`text-6xl font-bold ${
                brightness < 30 ? 'text-slate-400' :
                brightness < 70 ? 'text-slate-600' :
                'text-slate-900 dark:text-slate-50'
              }`}>
                Aa
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Preview text brightness
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Disabled Slider */}
      <ComponentPreview
        title="Disabled State"
        description="Slider in disabled state with custom styling."
        code={`<Slider
  label="Performance Mode"
  value={performance}
  min={0}
  max={100}
  disabled={true}
  showValue={true}
  iconLeft={<Zap size={20} />}
  formatValue={formatPercent}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <div className="space-y-8 max-w-2xl">
            <Slider
              label="Performance Mode (Disabled)"
              value={performance}
              min={0}
              max={100}
              disabled={true}
              showValue={true}
              iconLeft={<Zap size={20} />}
              formatValue={formatPercent}
            />
            
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                This slider is disabled. Enable the switch to interact with it.
              </div>
              <Switch
                checked={!performance}
                onCheckedChange={(checked) => setPerformance(checked ? 80 : 0)}
              />
            </div>
          </div>
        </div>
      </ComponentPreview>

      {/* Settings Dashboard Example */}
      <ComponentPreview
        title="Settings Dashboard"
        description="Real-world example of sliders in a settings panel."
        code={`<Card className="p-6">
  <h3 className="text-lg font-semibold mb-6">Audio Settings</h3>
  
  <div className="space-y-6">
    <Slider
      label="Music Volume"
      value={musicVolume}
      onChange={setMusicVolume}
      iconLeft={<Music size={18} />}
      showValue={true}
    />
    
    <Slider
      label="Notification Volume"
      value={notificationVolume}
      onChange={setNotificationVolume}
      iconLeft={<Bell size={18} />}
      showValue={true}
    />
    
    <Slider
      label="Microphone Sensitivity"
      value={micSensitivity}
      onChange={setMicSensitivity}
      iconLeft={<Mic size={18} />}
      showValue={true}
    />
  </div>
</Card>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6">
              Device Settings Dashboard
            </h3>
            
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Slider
                  label="Music Volume"
                  value={musicVolume}
                  onChange={setMusicVolume}
                  iconLeft={<Music size={18} />}
                  showValue={true}
                />
                
                <Slider
                  label="Notification Volume"
                  value={notificationVolume}
                  onChange={setNotificationVolume}
                  iconLeft={<Bell size={18} />}
                  showValue={true}
                />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Slider
                  label="Microphone Sensitivity"
                  value={micSensitivity}
                  onChange={setMicSensitivity}
                  iconLeft={<Mic size={18} />}
                  showValue={true}
                />
                
                <Slider
                  label="Battery Saver"
                  value={batterySaver}
                  onChange={setBatterySaver}
                  iconLeft={<Battery size={18} />}
                  showValue={true}
                  formatValue={formatPercent}
                />
              </div>
              
              <Slider
                label="Wi-Fi Signal Strength"
                value={wifiStrength}
                onChange={setWifiStrength}
                iconLeft={<Wifi size={18} />}
                showValue={true}
                formatValue={formatPercent}
                variant="gradient"
              />
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Current battery: {100 - batterySaver}%
                </div>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement sliders in your application."
        code={`import { Slider, RangeSlider } from '../components/ui/Slider';
import { Volume2, Sun, DollarSign } from 'lucide-react';
import { useState } from 'react';

const SettingsPanel = () => {
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [priceRange, setPriceRange] = useState({ min: 25, max: 75 });
  
  const formatPercent = (value: number) => \`\${value}%\`;
  const formatCurrency = (value: number) => \`$\${value}\`;
  
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Audio Settings</h2>
        <Slider
          label="Master Volume"
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          step={1}
          iconLeft={<Volume2 size={20} />}
          showValue={true}
          formatValue={formatPercent}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Display Settings</h2>
        <Slider
          label="Screen Brightness"
          value={brightness}
          onChange={setBrightness}
          min={0}
          max={100}
          variant="gradient"
          iconLeft={<Sun size={20} />}
          showValue={true}
          formatValue={formatPercent}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-4">Price Filter</h2>
        <RangeSlider
          minValue={priceRange.min}
          maxValue={priceRange.max}
          min={0}
          max={1000}
          step={10}
          label="Filter by Price"
          formatValue={formatCurrency}
          onChange={setPriceRange}
        />
        <div className="mt-4 text-center text-lg font-semibold">
          Selected: {formatCurrency(priceRange.min)} - {formatCurrency(priceRange.max)}
        </div>
      </div>
    </div>
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Settings className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Interactive Slider Controls</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Slider component supports 5 variants, 3 sizes, vertical orientation, range selection,
              marks, custom formatting, and full accessibility compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Drag & Drop</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Keyboard Nav</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Range Slider</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Vertical</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Marks</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default SliderView;