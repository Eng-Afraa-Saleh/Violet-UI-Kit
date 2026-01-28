import { Check, Copy } from "lucide-react";
import { useState } from "react";

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
export default ComponentPreview;    