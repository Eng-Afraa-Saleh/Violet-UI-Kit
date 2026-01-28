import  { useState, useEffect } from 'react';
import { Users, DollarSign, ShoppingCart, TrendingUp, Zap, Clock, Target, Star, Globe, Shield, Heart, Package, MessageSquare, Eye, Download, Cloud } from 'lucide-react';
 import { Stats, SingleStat, type StatItem } from '../components/ui/Stats';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';
 
const StatsView = () => {
  const [animate, setAnimate] = useState(true);
  const [liveStats, setLiveStats] = useState([
    { id: 1, value: 12456, title: 'Visitors', trend: 'up' as const, trendValue: '12%' },
    { id: 2, value: 892, title: 'Orders', trend: 'up' as const, trendValue: '8%' },
    { id: 3, value: 12560, title: 'Revenue', trend: 'down' as const, trendValue: '3%' },
    { id: 4, value: 94, title: 'Satisfaction', trend: 'neutral' as const, trendValue: '0%' },
  ]);

  // Simulate live updates
  useEffect(() => {
    if (!animate) return;

    const interval = setInterval(() => {
      setLiveStats(prev => prev.map(stat => ({
        ...stat,
        value: stat.value + Math.floor(Math.random() * 100),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [animate]);

  // Sample data
  const defaultStats: StatItem[] = [
    {
      id: 1,
      title: 'Total Revenue',
      value: 45289,
      prefix: '$',
      description: 'Monthly revenue generated',
      trend: 'up',
      trendValue: '+20.1%',
      icon: <DollarSign className="h-5 w-5" />,
      format: 'currency',
    },
    {
      id: 2,
      title: 'Active Users',
      value: 2350,
      description: 'Users currently online',
      trend: 'up',
      trendValue: '+180.1%',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: 12.5,
      suffix: '%',
      description: 'Visitor to customer rate',
      trend: 'down',
      trendValue: '-1.2%',
      icon: <Target className="h-5 w-5" />,
      format: 'decimal',
      decimals: 1,
    },
    {
      id: 4,
      title: 'Avg. Response Time',
      value: 24,
      suffix: 'ms',
      description: 'Server response time',
      trend: 'up',
      trendValue: '-15%',
      icon: <Zap className="h-5 w-5" />,
    },
  ];

  const cardStats: StatItem[] = [
    {
      id: 1,
      title: 'New Orders',
      value: 1245,
      description: 'This month',
      trend: 'up',
      trendValue: '+12%',
      icon: <ShoppingCart className="h-5 w-5" />,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 2,
      title: 'Page Views',
      value: 89234,
      description: 'Total views this week',
      trend: 'up',
      trendValue: '+24%',
      icon: <Eye className="h-5 w-5" />,
      color: 'text-green-600 dark:text-green-400',
    },
    {
      id: 3,
      title: 'Downloads',
      value: 3456,
      description: 'Files downloaded',
      trend: 'down',
      trendValue: '-3%',
      icon: <Download className="h-5 w-5" />,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 4,
      title: 'Server Uptime',
      value: 99.9,
      suffix: '%',
      description: 'Last 30 days',
      trend: 'neutral',
      icon: <Cloud className="h-5 w-5" />,
      color: 'text-orange-600 dark:text-orange-400',
      format: 'decimal',
      decimals: 1,
    },
  ];

  const gradientStats: StatItem[] = [
    {
      id: 1,
      title: 'Happy Customers',
      value: 98,
      suffix: '%',
      description: 'Customer satisfaction rate',
      icon: <Heart className="h-5 w-5" />,
      format: 'percent',
    },
    {
      id: 2,
      title: 'Global Reach',
      value: 156,
      description: 'Countries served',
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: 3,
      title: 'Secure Transactions',
      value: 100,
      suffix: '%',
      description: 'Fraud protection',
      icon: <Shield className="h-5 w-5" />,
      format: 'percent',
    },
    {
      id: 4,
      title: 'Support Rating',
      value: 4.8,
      suffix: '/5',
      description: 'Average support score',
      icon: <Star className="h-5 w-5" />,
      format: 'decimal',
      decimals: 1,
    },
  ];

  const largeStats: StatItem[] = [
    {
      id: 1,
      title: 'Annual Revenue',
      value: 1250000,
      prefix: '$',
      description: 'Total revenue this year',
      trend: 'up',
      trendValue: '+32%',
      icon: <DollarSign className="h-6 w-6" />,
      format: 'currency',
      target: 1500000,
    },
    {
      id: 2,
      title: 'Active Subscribers',
      value: 89234,
      description: 'Monthly active subscribers',
      trend: 'up',
      trendValue: '+18%',
      icon: <Users className="h-6 w-6" />,
      target: 100000,
      progress: 89,
    },
  ];

  const minimalStats: StatItem[] = [
    {
      id: 1,
      title: 'Messages',
      value: 1245,
      delay: 0,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 2,
      title: 'Orders',
      value: 892,
      delay: 200,
      icon: <Package className="h-4 w-4" />,
    },
    {
      id: 3,
      title: 'Response Time',
      value: 32,
      suffix: 'ms',
      delay: 400,
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: 4,
      title: 'Uptime',
      value: 99.9,
      suffix: '%',
      delay: 600,
      icon: <Zap className="h-4 w-4" />,
      format: 'decimal',
      decimals: 1,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Stats & CountUp</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Animated statistics counters with smooth counting animations and multiple display variants.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Animation</span>
            <Switch checked={animate} onCheckedChange={setAnimate} />
          </div>
          <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
            Reset Counters
          </Button>
        </div>
        <div className="text-sm text-slate-500">
          Scroll down to trigger animations
        </div>
      </div>

      {/* Default Stats */}
      <ComponentPreview
        title="Default Stats"
        description="Basic stats with counting animation, trends, and descriptions."
        code={`const stats = [
  {
    title: 'Total Revenue',
    value: 45289,
    prefix: '$',
    description: 'Monthly revenue generated',
    trend: 'up',
    trendValue: '+20.1%',
    icon: <DollarSign />,
    format: 'currency',
  },
  // ... more items
];

<Stats
  items={stats}
  animate={true}
  columns={4}
/>`}
      >
        <Stats
          items={defaultStats}
          animate={animate}
          columns={4}
        />
      </ComponentPreview>

      {/* Card Stats */}
      <ComponentPreview
        title="Card Stats"
        description="Stats displayed in card containers with custom colors."
        code={`<Stats
  items={cardStats}
  variant="card"
  animate={true}
  columns={4}
/>`}
      >
        <Stats
          items={cardStats}
          variant="card"
          animate={animate}
          columns={4}
        />
      </ComponentPreview>

      {/* Gradient Stats */}
      <ComponentPreview
        title="Gradient Stats"
        description="Stats with gradient backgrounds for highlighting important metrics."
        code={`<Stats
  items={gradientStats}
  variant="gradient"
  animate={true}
  columns={4}
/>`}
      >
        <div className="p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800">
          <Stats
            items={gradientStats}
            variant="gradient"
            animate={animate}
            columns={4}
          />
        </div>
      </ComponentPreview>

      {/* Large Stats with Targets */}
      <ComponentPreview
        title="Large Stats with Progress"
        description="Large format stats with progress bars and target indicators."
        code={`<Stats
  items={largeStats}
  size="lg"
  variant="highlight"
  columns={2}
  animate={true}
/>`}
      >
        <Stats
          items={largeStats}
          size="lg"
          variant="highlight"
          columns={2}
          animate={animate}
        />
      </ComponentPreview>

      {/* Minimal Stats */}
      <ComponentPreview
        title="Minimal Stats"
        description="Compact stats for dense interfaces like headers or sidebars."
        code={`<Stats
  items={minimalStats}
  variant="minimal"
  size="sm"
  columns={4}
  animate={true}
/>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Stats
            items={minimalStats}
            variant="minimal"
            size="sm"
            columns={4}
            animate={animate}
          />
        </div>
      </ComponentPreview>

      {/* Single Stat Examples */}
      <ComponentPreview
        title="Single Stat Component"
        description="Individual stat component for flexible placement."
        code={`<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <SingleStat
    title="Conversion Rate"
    value={12.5}
    suffix="%"
    description="Monthly conversion"
    trend="up"
    trendValue="+2.1%"
    size="lg"
    animate={true}
  />
  
  <SingleStat
    title="Revenue"
    value={125000}
    prefix="$"
    description="Q4 2023"
    variant="gradient"
    size="lg"
    animate={true}
  />
  
  <SingleStat
    title="Active Users"
    value={89234}
    description="Real-time count"
    variant="glass"
    size="lg"
    animate={true}
  />
</div>`}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SingleStat
            title="Conversion Rate"
            value={12.5}
            suffix="%"
            description="Monthly conversion rate"
            trend="up"
            trendValue="+2.1%"
            size="lg"
            animate={animate}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          
          <SingleStat
            title="Quarterly Revenue"
            value={125000}
            prefix="$"
            description="Q4 2023 Revenue"
            variant="gradient"
            size="lg"
            animate={animate}
            icon={<DollarSign className="h-6 w-6" />}
          />
          
          <SingleStat
            title="Active Users"
            value={89234}
            description="Real-time user count"
            variant="glass"
            size="lg"
            animate={animate}
            icon={<Users className="h-6 w-6" />}
            className="bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          />
        </div>
      </ComponentPreview>

      {/* Live Updating Stats */}
      <ComponentPreview
        title="Live Updating Stats"
        description="Stats that update in real-time with smooth animations."
        code={`const [liveStats, setLiveStats] = useState([
  { id: 1, value: 12456, title: 'Visitors', trend: 'up' },
  // ... more
]);

// Update values periodically
useEffect(() => {
  const interval = setInterval(() => {
    setLiveStats(prev => prev.map(stat => ({
      ...stat,
      value: stat.value + Math.random() * 100,
    })));
  }, 3000);
  
  return () => clearInterval(interval);
}, []);

<Stats
  items={liveStats}
  variant="card"
  animate={true}
  animationDuration={1000}
/>`}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Live Dashboard Metrics</h3>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success-500 animate-pulse"></div>
              <span className="text-sm text-slate-500">Live updating</span>
            </div>
          </div>
          <Stats
            items={liveStats}
            variant="card"
            animate={animate}
            animationDuration={1000}
          />
        </div>
      </ComponentPreview>

      {/* Different Sizes */}
      <ComponentPreview
        title="Stat Sizes"
        description="Stats available in four different sizes."
        code={`<div className="space-y-6">
  <Stats items={smallStats} size="sm" columns={4} />
  <Stats items={mediumStats} size="md" columns={4} />
  <Stats items={largeStats} size="lg" columns={2} />
  <SingleStat title="Extra Large" value={99.9} size="xl" />
</div>`}
      >
        <div className="space-y-6">
          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Small Size</div>
            <Stats
              items={minimalStats}
              size="sm"
              columns={4}
              animate={animate}
            />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Medium Size (Default)</div>
            <Stats
              items={defaultStats.slice(0, 2)}
              size="md"
              columns={2}
              animate={animate}
            />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Large Size</div>
            <Stats
              items={largeStats}
              size="lg"
              columns={2}
              animate={animate}
            />
          </div>
          
          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Extra Large Size</div>
            <SingleStat
              title="Performance Score"
              value={99.9}
              suffix="%"
              description="System performance rating"
              size="xl"
              variant="card"
              animate={animate}
              icon={<Zap className="h-8 w-8" />}
            />
          </div>
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement animated statistics."
        code={`import { Stats, SingleStat, StatItem } from '../components/ui/Stats';
import { Users, DollarSign, TrendingUp } from 'lucide-react';

const DashboardStats = () => {
  const [animate, setAnimate] = useState(true);
  
  const dashboardStats: StatItem[] = [
    {
      id: 1,
      title: 'Monthly Revenue',
      value: 45289,
      prefix: '$',
      description: 'Compared to last month',
      trend: 'up',
      trendValue: '+20.1%',
      icon: <DollarSign size={20} />,
      format: 'currency',
      delay: 0,
    },
    {
      id: 2,
      title: 'Active Users',
      value: 12345,
      description: 'Currently online',
      trend: 'up',
      trendValue: '+15.3%',
      icon: <Users size={20} />,
      delay: 200,
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: 8.5,
      suffix: '%',
      description: 'Visitor to customer',
      trend: 'down',
      trendValue: '-1.2%',
      icon: <TrendingUp size={20} />,
      format: 'decimal',
      decimals: 1,
      delay: 400,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <button
          onClick={() => setAnimate(!animate)}
          className="px-4 py-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200"
        >
          {animate ? 'Pause Animations' : 'Start Animations'}
        </button>
      </div>
      
      <Stats
        items={dashboardStats}
        variant="card"
        columns={3}
        animate={animate}
        animationDuration={1500}
      />
      
      <SingleStat
        title="Yearly Target"
        value={850000}
        prefix="$"
        description="Annual revenue target"
        target={1000000}
        size="lg"
        variant="highlight"
        animate={animate}
      />
    </div>
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <TrendingUp className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Smooth Counting Animations</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Stats component features smooth counting animations with intersection observer,
              customizable formats, progress bars, and live updating capabilities.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Currency</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Percent</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Decimal</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Live Updates</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Progress Bars</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default StatsView;