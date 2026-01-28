import { Layers, MoreHorizontal, Share2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Avatar, Badge } from "../components/ui/Core";
import { BrutalistCard, FloatCard, GlassCard, GradientBorderCard, ImageOverlayCard, MusicCard, NeonCard, NotchedCard, PatternCard, PolaroidCard, ProductCard, RevealCard, StackedCard } from "../components/ui/CreativeCards";
import ComponentPreview from "./ComponentPreview";

const CreativeCardsView = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Creative Cards</h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          A collection of experimental, modern, and non-standard card designs for unique interfaces.
        </p>
      </div>

      {/* 1. Glass Card */}
      <ComponentPreview
        title="Glassmorphism Card"
        description="Features a frosted glass effect with a backdrop filter, borders, and ambient light reflections."
        code={`<GlassCard>
  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Glassmorphism</h3>
  <p className="mt-2 text-slate-600 dark:text-slate-300">
    Features a frosted glass effect with a backdrop filter, borders, and ambient light reflections.
  </p>
  <Button size="sm" variant="ghost" className="mt-4 -ml-4">Learn More</Button>
</GlassCard>`}
      >
        <div className="relative w-full max-w-md p-10">
          {/* Background blob for effect demonstration */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl opacity-20 dark:opacity-40 -z-10 blur-xl"></div>
          <GlassCard>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">Glassmorphism</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Features a frosted glass effect with a backdrop filter, borders, and ambient light reflections.
            </p>
            <Button size="sm" variant="ghost" className="mt-4 -ml-4">Learn More</Button>
          </GlassCard>
        </div>
      </ComponentPreview>

      {/* 2. Gradient Border */}
      <ComponentPreview
        title="Gradient Border Card"
        description="A subtle animated gradient border that glows on hover. Perfect for highlighting features."
        code={`<GradientBorderCard>
  <div className="flex items-center justify-between mb-4">
    <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg">
      <Layers className="text-primary-600" size={20} />
    </div>
    <Badge variant="success">New</Badge>
  </div>
  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gradient Border</h3>
  <p className="mt-2 text-slate-500 dark:text-slate-400">
    A subtle animated gradient border that glows on hover. Perfect for highlighting features.
  </p>
</GradientBorderCard>`}
      >
        <div className="w-full max-w-md">
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
        </div>
      </ComponentPreview>

      {/* 3. Brutalist */}
      <ComponentPreview
        title="Neo-Brutalist Card"
        description="High contrast, bold borders, hard shadows. No blur, no transparency. Raw and direct."
        code={`<BrutalistCard>
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
</BrutalistCard>`}
      >
        <div className="w-full max-w-md">
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
        </div>
      </ComponentPreview>

      {/* 4. Neon */}
      <ComponentPreview
        title="Neon Glow Card"
        description="Glowing borders and shadows suitable for dark-mode heavy or gaming interfaces."
        code={`<NeonCard>
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
</NeonCard>`}
      >
        <div className="w-full max-w-md">
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
        </div>
      </ComponentPreview>

      {/* 5. Float */}
      <ComponentPreview
        title="3D Float Card"
        description="Smooth transform transitions on hover giving a tactile, physical feel to the card."
        code={`<FloatCard>
  <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4 dark:bg-indigo-900/30 dark:text-indigo-300">
    <Share2 size={24} />
  </div>
  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">3D Float</h3>
  <p className="mt-2 text-slate-500 dark:text-slate-400">
    Smooth transform transitions on hover giving a tactile, physical feel to the card.
  </p>
</FloatCard>`}
      >
        <div className="w-full max-w-md p-4">
          <FloatCard>
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full mb-4 dark:bg-indigo-900/30 dark:text-indigo-300">
              <Share2 size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">3D Float</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Smooth transform transitions on hover giving a tactile, physical feel to the card.
            </p>
          </FloatCard>
        </div>
      </ComponentPreview>

      {/* 6. Stacked */}
      <ComponentPreview
        title="Stacked Card"
        description="Creates an illusion of depth with layered backgrounds."
        code={`<StackedCard>
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
</StackedCard>`}
      >
        <div className="w-full max-w-md p-4">
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
      </ComponentPreview>

      {/* 7. Image Overlay */}
      <ComponentPreview
        title="Image Overlay Card"
        description="An elegant card with image background, gradient overlay, and hover reveal effects."
        code={`<ImageOverlayCard
  image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe..."
  title="Abstract Fluidity"
  category="Digital Art"
/>`}
      >
        <div className="w-full max-w-md">
          <ImageOverlayCard
            image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            title="Abstract Fluidity"
            category="Digital Art"
          />
        </div>
      </ComponentPreview>

      {/* 8. Notched */}
      <ComponentPreview
        title="Notched Card"
        description="Uses CSS clip-path to create a futuristic or technical aesthetic with a cut corner."
        code={`<NotchedCard>
  <div className="uppercase tracking-widest text-xs font-bold text-slate-500 mb-2">Notice</div>
  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clipped Corner</h3>
  <p className="text-slate-600 dark:text-slate-400 text-sm">
    Uses CSS clip-path to create a futuristic or technical aesthetic with a cut corner.
  </p>
</NotchedCard>`}
      >
        <div className="w-full max-w-md">
          <NotchedCard>
            <div className="uppercase tracking-widest text-xs font-bold text-slate-500 mb-2">Notice</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clipped Corner</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Uses CSS clip-path to create a futuristic or technical aesthetic with a cut corner.
            </p>
          </NotchedCard>
        </div>
      </ComponentPreview>

      {/* 9. Pattern */}
      <ComponentPreview
        title="Pattern Card"
        description="Subtle background patterns add texture and depth without overwhelming the content."
        code={`<PatternCard title="Pattern Background">
  <p className="text-sm">
    Subtle background patterns can add texture and depth without overwhelming the content.
  </p>
  <div className="mt-4 flex gap-2">
    <Badge variant="secondary">Design</Badge>
    <Badge variant="outline">Texture</Badge>
  </div>
</PatternCard>`}
      >
        <div className="w-full max-w-md">
          <PatternCard title="Pattern Background">
            <p className="text-sm">
              Subtle background patterns can add texture and depth without overwhelming the content.
            </p>
            <div className="mt-4 flex gap-2">
              <Badge variant="secondary">Design</Badge>
              <Badge variant="outline">Texture</Badge>
            </div>
          </PatternCard>
        </div>
      </ComponentPreview>

      {/* 10. Music Player */}
      <ComponentPreview
        title="Music Player Card"
        description="A specialized card layout for media playback with blur effects and controls."
        code={`<MusicCard
  image="https://images.unsplash.com/photo-1493225255756-d9584f8606e9..."
  title="Midnight City"
  artist="M83"
/>`}
      >
        <div className="w-full max-w-xs">
          <MusicCard
            image="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            title="Midnight City"
            artist="M83"
          />
        </div>
      </ComponentPreview>

      {/* 11. Reveal Card */}
      <ComponentPreview
        title="Reveal Content Card"
        description="Expands to show more content on hover, perfect for story previews."
        code={`<RevealCard
  image="https://images.unsplash.com/photo-1542259681-d262296db43f..."
  title="Mountain Expeditions"
>
  Discover the untouched beauty of the highest peaks. Our guided tours offer a safe and unforgettable experience.
</RevealCard>`}
      >
        <div className="w-full max-w-md">
          <RevealCard
            image="https://images.unsplash.com/photo-1542259681-d262296db43f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            title="Mountain Expeditions"
          >
            Discover the untouched beauty of the highest peaks. Our guided tours offer a safe and unforgettable experience for adventurers of all levels.
          </RevealCard>
        </div>
      </ComponentPreview>

      {/* 12. Polaroid */}
      <ComponentPreview
        title="Polaroid Card"
        description="Nostalgic photo style with rotation and sepia filter that clears on hover."
        code={`<PolaroidCard
  image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963..."
  caption="Cinque Terre, 2023"
  date="Aug 14"
/>`}
      >
        <div className="w-full max-w-sm p-8">
          <PolaroidCard
            image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            caption="Cinque Terre, 2023"
            date="Aug 14"
          />
        </div>
      </ComponentPreview>

      {/* 13. Product Card */}
      <ComponentPreview
        title="Minimal Product Card"
        description="E-commerce ready card with hover actions and clean typography."
        code={`<ProductCard
  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30..."
  name="Minimalist Watch"
  price="$95.00"
  rating={4.8}
/>`}
      >
        <div className="w-full max-w-xs">
          <ProductCard
            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            name="Minimalist Watch"
            price="$95.00"
            rating={4.8}
          />
        </div>
      </ComponentPreview>
    </div>
  );
};
export default CreativeCardsView;