
import './index.css'

import { useState, useEffect } from 'react';
import {
  Layout, Type, MousePointer2, FormInput,
  MessageSquare, LayoutTemplate,
  Menu, X, Search, Terminal,
  Palette,
  Navigation as NavIcon

} from 'lucide-react';
import { Input } from './components/ui/Core';
import { Switch } from './components/ui/Form';
import { cn } from './utils';
import IntroView from './views/IntroView';
import ButtonsView from './views/ButtonsView';
import InputsView from './views/InputsView';
import FormsView from './views/FormsView';
import FeedbackView from './views/FeedbackView';
import LayoutView from './views/LayoutView';
import NavigationView from './views/NavigationView';
import CreativeCardsView from './views/CreativeCardsView';
import ChatBotView from './views/ChatBotView';
import DashboardTemplate from './views/DashboardTemplate';

// --- Types ---
type View = 'intro' | 'buttons' | 'inputs' | 'layout' | 'feedback' | 'forms' | 'template' | 'creative-cards' | 'navigation' | 'chatbot';
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
    { id: 'chatbot', label: 'AI ChatBot', icon: <MessageSquare size={18} /> },
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
      case 'chatbot': return <ChatBotView />;
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