import { Button } from "../components/ui/Button";
import { Separator } from "../components/ui/Core";
import { Card } from "../components/ui/Layout";

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
export default IntroView;