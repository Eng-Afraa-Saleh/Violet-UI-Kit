import React from 'react';
 import { ArrowUpRight, Heart,  Play, SkipBack, SkipForward, ShoppingBag, Star } from 'lucide-react';
import { Button } from './Button';
 import { cn } from '../../utils';

// 1. Glassmorphism Card
export const GlassCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={cn("group relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 shadow-xl", className)}>
    <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary-500/30 blur-3xl transition-all group-hover:bg-primary-500/40"></div>
    <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-secondary-500/30 blur-3xl transition-all group-hover:bg-secondary-500/40"></div>
    <div className="relative z-10">{children}</div>
  </div>
);

// 2. Neo-Brutalist Card
export const BrutalistCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={cn("relative rounded-none border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none dark:border-white dark:bg-slate-950 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]", className)}>
    {children}
  </div>
);

// 3. Gradient Border Card
export const GradientBorderCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={cn("group relative rounded-xl bg-slate-200 p-[1px] dark:bg-slate-800", className)}>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md"></div>
    <div className="relative h-full rounded-xl bg-white p-6 dark:bg-slate-950">
      {children}
    </div>
  </div>
);

// 4. Neon Glow Card
export const NeonCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={cn("rounded-xl border border-cyan-500/30 bg-slate-950 p-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] text-cyan-50", className)}>
    {children}
  </div>
);

// 5. Notched Card
export const NotchedCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div 
    className={cn("bg-slate-100 p-8 dark:bg-slate-900 filter drop-shadow-md transition-transform hover:-translate-y-1", className)}
    style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)' }}
  >
    {children}
  </div>
);

// 6. 3D Float Card
export const FloatCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
  <div className={cn("group transform-gpu transition-all duration-300 hover:-translate-y-2", className)}>
     <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 transition-all dark:bg-slate-900 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800">
        {children}
     </div>
  </div>
);

// 7. Stacked Card
export const StackedCard = ({ className, children }: { className?: string, children?: React.ReactNode }) => (
    <div className="relative group isolate">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 rounded-xl transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3 -z-20"></div>
        <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 rounded-xl transform translate-x-1 translate-y-1 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 -z-10"></div>
        <div className={cn("relative rounded-xl bg-white dark:bg-slate-900 p-6 border border-slate-100 dark:border-slate-800 shadow-sm", className)}>
            {children}
        </div>
    </div>
);

// 8. Image Overlay Card
export const ImageOverlayCard = ({ image, title, category }: { image: string, title: string, category: string }) => (
  <div className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-md">
    <div className="absolute inset-0 bg-slate-900/20 transition-colors group-hover:bg-slate-900/10 z-10"></div>
    <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end z-20">
      <span className="mb-2 text-xs font-bold uppercase tracking-wider text-cyan-400">{category}</span>
      <h3 className="text-2xl font-bold text-white translate-y-0 transition-transform duration-300 group-hover:-translate-y-1">{title}</h3>
      <div className="mt-4 flex items-center justify-between opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
         <span className="text-sm font-medium text-slate-300">View Project</span>
         <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm text-white hover:bg-white/30 transition-colors">
            <ArrowUpRight size={16} />
         </div>
      </div>
    </div>
  </div>
);

// 9. Pattern Card
export const PatternCard = ({ className, title, children }: { className?: string, title: string, children?: React.ReactNode }) => (
  <div className={cn("relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950", className)}>
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
    <div className="relative z-10">
        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
        <div className="text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  </div>
);

// 10. Music Player Card
export const MusicCard = ({ image, title, artist }: { image: string, title: string, artist: string }) => (
    <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl dark:shadow-slate-950/50">
      <div className="absolute inset-0 bg-cover bg-center blur-2xl opacity-30 dark:opacity-20 transform scale-125" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="relative p-6 flex flex-col items-center z-10">
        <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-6 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="text-center w-full mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm truncate">{artist}</p>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mb-6 overflow-hidden">
             <div className="bg-primary-500 h-full w-1/3 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between w-full px-4 text-slate-700 dark:text-slate-200">
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50"><SkipBack size={20} /></Button>
           <Button variant="primary" size="icon" className="h-14 w-14 rounded-full shadow-lg shadow-primary-500/30"><Play size={24} fill="currentColor" /></Button>
           <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50 dark:hover:bg-slate-800/50"><SkipForward size={20} /></Button>
        </div>
      </div>
    </div>
  );
  
  // 11. Reveal Card
  export const RevealCard = ({ image, title, children }: { image: string, title: string, children?: React.ReactNode }) => (
    <div className="group relative h-96 w-full overflow-hidden rounded-xl bg-slate-900">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-auto group-hover:opacity-100">
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {children}
          </p>
          <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
            Read Story
          </Button>
        </div>
      </div>
    </div>
  );
  
  // 12. Polaroid Card
  export const PolaroidCard = ({ image, caption, date }: { image: string, caption: string, date: string }) => (
    <div className="group bg-white p-4 pb-12 shadow-md hover:shadow-xl transition-all duration-300 transform rotate-2 hover:rotate-0 dark:bg-slate-200">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 mb-4 filter sepia-[.2] group-hover:sepia-0 transition-all duration-500">
        <img src={image} alt={caption} className="h-full w-full object-cover" />
      </div>
      <div className="flex justify-between items-end px-2">
         <p className="font-serif italic text-slate-800 text-lg">{caption}</p>
         <p className="font-mono text-xs text-slate-500">{date}</p>
      </div>
    </div>
  );
  
  // 13. Minimal Product Card
  export const ProductCard = ({ image, name, price, rating }: { image: string, name: string, price: string, rating: number }) => (
    <div className="group relative rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 transition-all hover:shadow-lg">
      <div className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-400 backdrop-blur-sm transition-colors hover:text-red-500 dark:bg-slate-950/50">
        <Heart size={18} />
      </div>
      <div className="relative mb-4 aspect-square overflow-hidden rounded-xl bg-white dark:bg-slate-800">
        <img src={image} alt={name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 px-4">
             <Button className="w-full shadow-lg" size="sm" leftIcon={<ShoppingBag size={14} />}>Add to Cart</Button>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
             <h3 className="font-semibold text-slate-900 dark:text-slate-50 truncate">{name}</h3>
             <div className="flex items-center text-amber-400 text-xs">
                 <Star size={12} fill="currentColor" />
                 <span className="ml-1 text-slate-600 dark:text-slate-400">{rating}</span>
             </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">Premium Collection</p>
        <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{price}</span>
            <span className="text-xs text-slate-400 line-through">$129.00</span>
        </div>
      </div>
    </div>
  );