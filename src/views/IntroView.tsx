import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Core";
import { Card } from "../components/ui/Layout";

const IntroView = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* الخلفية المتحركة */}
    <div className="absolute inset-0 overflow-hidden">
      {/* تأثير الضباب الخلفي */}
      <div className="absolute -inset-[10px] opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-pulse delay-2000"></div>
        <div className="absolute top-3/4 right-1/3 w-80 h-80 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 animate-pulse delay-1500"></div>
      </div>
      
      {/* نمط شبكة خلفية */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 dark:opacity-20"></div>
      
      {/* تأثير الجسيمات المتحركة */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 dark:bg-purple-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* تأثير الإشعاع */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50/60 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-purple-50/60 to-transparent dark:from-purple-900/20 dark:to-transparent"></div>
    </div>

    {/* المحتوى الرئيسي */}
    <div className="relative z-10">
      <div className="container  ">
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* العنوان مع تأثيرات */}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-block relative">
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 animate-gradient">
                Violet UI Kit
              </h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70"></div>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
              A professionally crafted, accessible, and customizable component library built with React, Tailwind CSS, and TypeScript.
            </p>
          </div>
          
          {/* الأزرار مع تأثيرات */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative overflow-hidden group transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500"></div>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="relative overflow-hidden group border-2 transition-all duration-300 hover:scale-105 dark:border-slate-600"
            >
              <span className="relative z-10">View on GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </div>
          
          <Separator className="my-12 opacity-30" />
          
          {/* البطاقات مع تأثيرات */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card 
              title="Type Safe" 
              description="Built with TypeScript for a robust development experience." 
              className="relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-blue-100/50 dark:border-blue-900/30 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-200/20 dark:bg-blue-900/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-blue-100/20 dark:bg-blue-800/20 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            </Card>
            
            <Card 
              title="Accessible" 
              description="Follows WAI-ARIA patterns for maximum inclusivity." 
              className="relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-green-100/50 dark:border-green-900/30 hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-200/20 dark:bg-green-900/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-green-100/20 dark:bg-green-800/20 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            </Card>
            
            <Card 
              title="Dark Mode" 
              description="Automatic dark mode support via Tailwind 'class' strategy." 
              className="relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-purple-100/50 dark:border-purple-900/30 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-200/20 dark:bg-purple-900/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-purple-100/20 dark:bg-purple-800/20 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            </Card>
            
            <Card 
              title="Zero Config" 
              description="Copy and paste components. No complex build steps." 
              className="relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-orange-100/50 dark:border-orange-900/30 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-200/20 dark:bg-orange-900/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
              <div className="absolute -left-6 -bottom-6 w-20 h-20 bg-orange-100/20 dark:bg-orange-800/20 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
            </Card>
          </div>
          
          
        </div>
      </div>
    </div>
    
    {/* تعريفات أنيمشن مخصصة */}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(-10px) translateX(-10px); }
        75% { transform: translateY(-30px) translateX(5px); }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-float {
        animation: float linear infinite;
      }
      
      .animate-gradient {
        background-size: 200% 200%;
        animation: gradient 3s ease infinite;
      }
    `}</style>
  </div>
);
export default IntroView;