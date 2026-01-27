
import './index.css'

import React, { useState, useEffect } from 'react';
import {
  Layout, Type, MousePointer2, FormInput,
  MessageSquare, LayoutTemplate,
  Menu, X, Search, Terminal, Plus,
  Palette, Layers, Share2, MoreHorizontal,
  Navigation as NavIcon, Copy, Check
} from 'lucide-react';
import { Button } from './components/ui/Button';
import { Input, Badge, Avatar, Skeleton, Separator } from './components/ui/Core';
import { Card, Grid } from './components/ui/Layout';
import { Alert, Dialog } from './components/ui/Feedback';
import { Switch, Textarea, Select, Checkbox } from './components/ui/Form';
import {
  GlassCard, BrutalistCard, GradientBorderCard, NeonCard,
  NotchedCard, FloatCard, StackedCard, ImageOverlayCard, PatternCard,
  MusicCard, RevealCard, PolaroidCard, ProductCard
} from './components/ui/CreativeCards';
import {
  Navbar, NavContainer, NavBrand, NavMenu, NavLink,
  SimpleNavbar,
  VisualMegaNavbar, ProfileNavbar, FloatingDock
} from './components/ui/Navigation';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { cn } from './utils';

// --- Types ---
type View = 'intro' | 'buttons' | 'inputs' | 'layout' | 'feedback' | 'forms' | 'template' | 'creative-cards' | 'navigation';

// --- Sidebar ---
const Sidebar = ({ currentView, setView, isOpen, setIsOpen, isDark, toggleTheme }: any) => {
  const menuItems = [
    { id: 'intro', label: 'Introduction', icon: <Terminal size={18} /> },
    { id: 'buttons', label: 'Buttons', icon: <MousePointer2 size={18} /> },
    { id: 'inputs', label: 'Inputs & Data', icon: <Type size={18} /> },
    { id: 'forms', label: 'Form Elements', icon: <FormInput size={18} /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
    { id: 'layout', label: 'Layout', icon: <Layout size={18} /> },
    { id: 'navigation', label: 'Navigation', icon: <NavIcon size={18} /> },
    { id: 'creative-cards', label: 'Creative Cards', icon: <Palette size={18} /> },
    { id: 'template', label: 'Dashboard Template', icon: <LayoutTemplate size={18} /> },
  ];

  return (
    <>
      <div className={cn("fixed inset-0 z-20 bg-black/50 lg:hidden", isOpen ? "block" : "hidden")} onClick={() => setIsOpen(false)} />
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:bg-slate-950 dark:border-slate-800 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary-600 dark:text-primary-400">
            <div className="h-6 w-6 rounded bg-primary-600" />
            Violet UI
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 px-2">
            <Input placeholder="Search components..." leftIcon={<Search size={14} />} className="h-9" />
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setIsOpen(false); }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  currentView === item.id
                    ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-900">
            <span className="text-sm font-medium">Dark Mode</span>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </aside>
    </>
  );
};

// --- Component Viewer ---
const ComponentPreview = ({ title, description, children, code }: { title: string, description?: string, children?: React.ReactNode, code: string }) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="mb-8 scroll-mt-20" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">{title}</h2>
        {description && <p className="mt-1 text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="flex items-center justify-end gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900/50">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
          >
            {copied ? <Check size={12} className="text-success-600" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700" />
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
          >
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
        </div>
        <div className="p-6 md:p-10 bg-white dark:bg-slate-950 flex justify-center items-center min-h-[150px] overflow-x-auto relative">
          {/* Checkered background for transparency check */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
            }}
          />
          <div className="w-full relative z-10">
            {children}
          </div>
        </div>
        {showCode && (
          <div className="border-t border-slate-200 bg-slate-950 p-4 dark:border-slate-800 overflow-x-auto animate-fade-in">
            <pre className="text-sm text-slate-300 font-mono"><code>{code}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
};

// --- View Components ---

const IntroView = () => (
  <div className="space-y-6 max-w-3xl">
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Violet UI Kit</h1>
      <p className="text-xl text-slate-500 dark:text-slate-400">
        A professionally crafted, accessible, and customizable component library built with React, Tailwind CSS, and TypeScript.
      </p>
    </div>
    <div className="flex gap-4 pt-4">
      <Button size="lg" onClick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}>Get Started</Button>
      <Button variant="outline" size="lg">View on GitHub</Button>
    </div>
    <Separator className="my-8" />

    <div className="grid gap-6 md:grid-cols-2">
      <Card title="Type Safe" description="Built with TypeScript for a robust development experience." className="bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30" />
      <Card title="Accessible" description="Follows WAI-ARIA patterns for maximum inclusivity." className="bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30" />
      <Card title="Dark Mode" description="Automatic dark mode support via Tailwind 'class' strategy." className="bg-purple-50/50 border-purple-100 dark:bg-purple-900/10 dark:border-purple-900/30" />
      <Card title="Zero Config" description="Copy and paste components. No complex build steps." className="bg-orange-50/50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/30" />
    </div>
  </div>
);

const ButtonsView = () => (
  <div className="space-y-10">
    <ComponentPreview
      title="Button Variants"
      description="Use the variant prop to control the visual style."
      code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Button Sizes"
      description="Buttons come in four sizes: sm, md, lg, and icon."
      code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add Item"><Plus size={18} /></Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add Item"><Plus size={18} /></Button>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Button States"
      description="Loading and disabled states."
      code={`<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
<Button size="icon" isLoading variant="secondary"><Plus size={18} /></Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button size="icon" isLoading variant="secondary"><Plus size={18} /></Button>
      </div>
    </ComponentPreview>
  </div>
);

const InputsView = () => (
  <div className="space-y-10">
    <ComponentPreview title="Input Fields" code={`<Input label="Email" placeholder="user@example.com" />`} >
      <div className="w-full max-w-sm space-y-4">
        <Input label="Email" placeholder="user@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Input label="With Icon" leftIcon={<MousePointer2 size={16} />} placeholder="Click me" />
        <Input label="Error State" error="Invalid email address" defaultValue="invalid@" />
      </div>
    </ComponentPreview>

    <ComponentPreview title="Badges" code={`<Badge>Default</Badge>`}>
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Avatars" code={`<Avatar fallback="JD" />`}>
      <div className="flex gap-4">
        <Avatar fallback="CN" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Avatar fallback="JD" />
        <Avatar fallback="AB" className="bg-pink-100 text-pink-600" />
      </div>
    </ComponentPreview>
  </div>
);

const FormsView = () => {
  const [aiText, setAiText] = useState("The fox jump over dog.");
  // const [loading, setLoading] = useState(false);

  // const handleAiFix = async () => {
  //   setLoading(true);
  //   const fixed = await improveText(aiText);
  //   setAiText(fixed);
  //   setLoading(false);
  // };

  return (
    <div className="space-y-10">
      <ComponentPreview title="Form Controls" code={`<Switch /> <Checkbox /> <Select />`}>
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Airplane Mode</span>
            <Switch />
          </div>
          <Checkbox label="Accept terms and conditions" />
          <Select
            label="Framework"
            options={[
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
              { label: 'Angular', value: 'angular' }
            ]}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Textarea with AI" description="Uses Gemini API to improve text." code={`// Uses services/ai.ts
improveText(text).then(result => setText(result));`}>
        <div className="w-full max-w-md space-y-4">
          <Textarea
            label="Bio"
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            rows={4}
          />
          {/* <div className="flex justify-end">
             <Button size="sm" variant="secondary" onClick={handleAiFix} isLoading={loading} leftIcon={<Wand2 size={14} />}>
               Fix Grammar (AI)
             </Button>
          </div> */}
        </div>
      </ComponentPreview>
    </div>
  );
};

const FeedbackView = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-10">
      <ComponentPreview title="Alerts" code={`<Alert variant="info">...</Alert>`}>
        <div className="w-full space-y-4">
          <Alert title="Information">New version available.</Alert>
          <Alert variant="success" title="Success">Payment processed successfully.</Alert>
          <Alert variant="warning" title="Warning">Your account is about to expire.</Alert>
          <Alert variant="error" title="Error">Failed to save changes.</Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dialog" code={`<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} ... />`}>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </>
          }
        >
          <div className="grid gap-4 py-4">
            <Input label="Name" defaultValue="Pedro Duarte" />
            <Input label="Username" defaultValue="@peduarte" />
          </div>
        </Dialog>
      </ComponentPreview>

      <ComponentPreview title="Skeleton" code={`<Skeleton className="h-4 w-[250px]" />`}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

const LayoutView = () => (
  <div className="space-y-10">
    <ComponentPreview title="Card" code={`<Card title="..." description="...">Content</Card>`}>
      <Card
        title="Notifications"
        description="Manage your notification preferences."
        footer={<Button className="w-full">Save Preferences</Button>}
        className="max-w-sm w-full"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Email Notifications</div>
            <Switch checked />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Push Notifications</div>
            <Switch />
          </div>
        </div>
      </Card>
    </ComponentPreview>

    <ComponentPreview title="Grid System" code={`<Grid cols={3} gap={4}>...</Grid>`}>
      <Grid cols={3} gap={4} className="w-full">
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">1</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">2</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">3</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">4</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">5</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">6</div>
      </Grid>
    </ComponentPreview>
  </div>
);

const NavigationView = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Navigation</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Responsive navigation components including sticky navbars, branding, and mobile menus.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 overflow-hidden relative min-h-[400px]">
        <div className="absolute inset-0 flex items-start">
          <div className="w-full">
            <SimpleNavbar />
            <div className="p-8">
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="h-64 rounded-xl bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400">
                  Page Content
                </div>
                <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComponentPreview
        title="Navbar Composition"
        description="Build your navbar using Violet components: Navbar, NavContainer, NavBrand, NavMenu, and MobileMenu."
        code={`<Navbar sticky glass>
  <NavContainer>
    <NavBrand>Brand</NavBrand>
    <NavMenu>
      <NavLink href="#" active>Home</NavLink>
      <NavLink href="#">About</NavLink>
    </NavMenu>
    <MobileMenuToggle isOpen={isOpen} onToggle={toggle} />
  </NavContainer>
  <MobileMenu isOpen={isOpen}>
     <MobileNavLink href="#">Home</MobileNavLink>
  </MobileMenu>
</Navbar>`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Navbar className="relative" isBordered={false}>
            <NavContainer>
              <NavBrand>
                <div className="h-6 w-6 rounded-full bg-indigo-500" />
                <span>Startup</span>
              </NavBrand>
              <NavMenu>
                <NavLink href="#" active>Product</NavLink>
                <NavLink href="#">Solutions</NavLink>
                <NavLink href="#">Resources</NavLink>
              </NavMenu>
              <div className="hidden lg:flex gap-2">
                <Button size="sm" variant="outline">Log in</Button>
                <Button size="sm">Get Started</Button>
              </div>
              <div className="lg:hidden">
                <Button size="icon" variant="ghost"><Menu size={20} /></Button>
              </div>
            </NavContainer>
          </Navbar>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Visual Mega Navbar"
        description="A rich mega-menu navbar featuring image-based navigation for high-impact categories."
        code={`<VisualMegaNavbar /> // See source for full implementation using NavDropdown`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[300px] bg-slate-50 dark:bg-slate-900 relative">
          <VisualMegaNavbar />
          <div className="p-8 flex items-center justify-center text-slate-400">
            Hover over "Collections" to see the visual menu.
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Profile Dashboard Navbar"
        description="Application-style navbar with search, notifications, and user profile avatar."
        code={`<ProfileNavbar /> // See source for full implementation`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[200px] bg-slate-900">
          <ProfileNavbar />
          <div className="p-8">
            <div className="h-32 rounded-lg bg-slate-800 border border-slate-700 border-dashed"></div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Floating Dock Navbar"
        description="A playful, floating navigation dock using icons and tooltips."
        code={`<FloatingDock />`}
      >
        <div className="w-full rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[300px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-end pb-8">
          <FloatingDock />
        </div>
      </ComponentPreview>
    </div>
  );
};

// --- Creative Cards View ---
const CreativeCardsView = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Creative Cards</h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          A collection of experimental, modern, and non-standard card designs for unique interfaces.
        </p>
      </div>

      <Grid cols={1} gap={8} className="lg:grid-cols-2 xl:grid-cols-3">
        {/* 1. Glass Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl opacity-20 dark:opacity-40 -z-10 blur-xl"></div>
          <GlassCard>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Glassmorphism</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Features a frosted glass effect with a backdrop filter, borders, and ambient light reflections.
            </p>
            <Button size="sm" variant="ghost" className="mt-4 -ml-4">Learn More</Button>
          </GlassCard>
        </div>

        {/* 2. Gradient Border */}
        <GradientBorderCard>
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg"><Layers className="text-primary-600" size={20} /></div>
            <Badge variant="success">New</Badge>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gradient Border</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            A subtle animated gradient border that glows on hover. Perfect for highlighting features.
          </p>
        </GradientBorderCard>

        {/* 3. Brutalist */}
        <BrutalistCard>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-black uppercase tracking-tight">Neo-Brutalism</h3>
            <div className="w-8 h-8 bg-black dark:bg-white"></div>
          </div>
          <p className="font-mono text-sm mb-6">
            High contrast, bold borders, hard shadows.
            No blur, no transparency. Raw and direct.
          </p>
          <Button className="w-full rounded-none border-2 border-black bg-yellow-400 text-black hover:bg-yellow-500 hover:text-black dark:border-white">
            ACTION
          </Button>
        </BrutalistCard>

        {/* 4. Neon */}
        <NeonCard>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">System Online</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Cyberpunk</h3>
          <p className="text-cyan-100/70 text-sm mb-4">
            Glowing borders and shadows suitable for dark-mode heavy or gaming interfaces.
          </p>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
          </div>
        </NeonCard>

        {/* 5. Float */}
        <FloatCard>
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4 dark:bg-indigo-900/30 dark:text-indigo-300">
            <Share2 size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">3D Float</h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Smooth transform transitions on hover giving a tactile, physical feel to the card.
          </p>
        </FloatCard>

        {/* 6. Stacked */}
        <div className="pt-2 pl-2">
          <StackedCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Stacked</h3>
              <MoreHorizontal className="text-slate-400" />
            </div>
            <div className="space-y-3">
              <div className="h-2 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div>
              <div className="h-2 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div>
            </div>
            <div className="mt-6 flex gap-2">
              <Avatar fallback="A" className="w-8 h-8 text-xs" />
              <Avatar fallback="B" className="w-8 h-8 text-xs bg-blue-100 text-blue-600" />
            </div>
          </StackedCard>
        </div>

        {/* 7. Image Overlay - Spanning */}
        <div className="lg:col-span-2">
          <ImageOverlayCard
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            title="Abstract Fluidity"
            category="Digital Art"
          />
        </div>

        {/* 10. Music Player Card */}
        <div className="lg:col-span-1">
          <MusicCard
            image="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            title="Midnight City"
            artist="M83"
          />
        </div>

        {/* 11. Reveal Card */}
        <div className="lg:col-span-1">
          <RevealCard
            image="https://images.unsplash.com/photo-1542259681-d262296db43f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            title="Mountain Expeditions"
          >
            Discover the untouched beauty of the highest peaks. Our guided tours offer a safe and unforgettable experience for adventurers of all levels.
          </RevealCard>
        </div>

        {/* 12. Polaroid Card */}
        <div className="flex justify-center p-4">
          <PolaroidCard
            image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            caption="Cinque Terre, 2023"
            date="Aug 14"
          />
        </div>

        {/* 13. Product Card */}
        <div>
          <ProductCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            name="Minimalist Watch"
            price="$95.00"
            rating={4.8}
          />
        </div>

        {/* 8. Notched */}
        <NotchedCard>
          <div className="uppercase tracking-widest text-xs font-bold text-slate-500 mb-2">Notice</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clipped Corner</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Uses CSS clip-path to create a futuristic or technical aesthetic with a cut corner.
          </p>
        </NotchedCard>

        {/* 9. Pattern */}
        <PatternCard title="Pattern Background">
          <p className="text-sm">
            Subtle background patterns can add texture and depth without overwhelming the content.
          </p>
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary">Design</Badge>
            <Badge variant="outline">Texture</Badge>
          </div>
        </PatternCard>

      </Grid>
    </div>
  );
};

// --- Dashboard Template Example ---
const DashboardTemplate = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400">Overview of your activity.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Download</Button>
          <Button>Create New</Button>
        </div>
      </div>

      <Grid cols={4} gap={4}>
        <Card className="p-6">
          <div className="text-sm font-medium text-slate-500">Total Revenue</div>
          <div className="text-2xl font-bold">$45,231.89</div>
          <div className="text-xs text-success-600 font-medium">+20.1% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-slate-500">Subscriptions</div>
          <div className="text-2xl font-bold">+2350</div>
          <div className="text-xs text-success-600 font-medium">+180.1% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-slate-500">Sales</div>
          <div className="text-2xl font-bold">+12,234</div>
          <div className="text-xs text-success-600 font-medium">+19% from last month</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-slate-500">Active Now</div>
          <div className="text-2xl font-bold">+573</div>
          <div className="text-xs text-slate-500">+201 since last hour</div>
        </Card>
      </Grid>

      <Grid cols={1} className="lg:grid-cols-7 gap-4">
        <Card className="lg:col-span-4 p-6 min-h-[350px]">
          <h3 className="font-semibold mb-4">Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-3 p-6">
          <h3 className="font-semibold mb-4">Recent Sales</h3>
          <div className="space-y-8">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center">
                <Avatar fallback={`U${i}`} className="h-9 w-9" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-sm text-slate-500">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
  );
};

// --- App Component ---
export default function App() {
  const [currentView, setCurrentView] = useState<View>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const renderView = () => {
    switch (currentView) {
      case 'intro': return <IntroView />;
      case 'buttons': return <ButtonsView />;
      case 'inputs': return <InputsView />;
      case 'forms': return <FormsView />;
      case 'feedback': return <FeedbackView />;
      case 'layout': return <LayoutView />;
      case 'navigation': return <NavigationView />;
      case 'creative-cards': return <CreativeCardsView />;
      case 'template': return <DashboardTemplate />;
      default: return <IntroView />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-slate-50 font-sans">
      <Sidebar
        currentView={currentView}
        setView={setCurrentView}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isDark={isDark}
        toggleTheme={() => setIsDark(!isDark)}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/80 px-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
          <button className="mr-4 lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1">
            {/* Header content like breadcrumbs could go here */}
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:underline text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">Docs</a>
            <a href="#" className="text-sm font-medium hover:underline text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">Components</a>
            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full animate-fade-in">
          {renderView()}
        </main>
      </div>
    </div>
  );
}