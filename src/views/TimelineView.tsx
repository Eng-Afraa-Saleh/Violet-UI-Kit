import { useState } from 'react';
import { Check, Clock, AlertCircle, Star, User, Package, MessageSquare, TrendingUp, Truck, CreditCard, Download, ExternalLink } from 'lucide-react';
import { Badge } from '../components/ui/Core';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';
import type { TimelineItem } from '../types';
import { Timeline } from '../components/ui/Timeline';

const TimelineView = () => {
  const [animate, setAnimate] = useState(true);

  const orderTimeline: TimelineItem[] = [
    {
      id: 1,
      title: 'Order Placed',
      description: 'Your order #ORD-7849 has been placed successfully.',
      timestamp: 'Today',
      time: '10:30 AM',
      type: 'success',
      icon: <Check className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['Completed'],
      completed: true,
    },
    {
      id: 2,
      title: 'Payment Confirmed',
      description: 'Payment of $149.99 has been processed successfully.',
      timestamp: 'Today',
      time: '10:35 AM',
      type: 'success',
      icon: <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['Completed'],
      completed: true,
    },
    {
      id: 3,
      title: 'Order Processing',
      description: 'Your items are being prepared for shipment.',
      timestamp: 'Today',
      time: '11:45 AM',
      type: 'primary',
      icon: <Package className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['In Progress'],
      completed: true,
      meta: { progress: 100 },
    },
    {
      id: 4,
      title: 'Shipped',
      description: 'Your order has been shipped via FedEx. Tracking number: FDX-784512369.',
      timestamp: 'Tomorrow',
      time: 'Estimated 9:00 AM',
      type: 'info',
      icon: <Truck className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['Pending'],
      action: <Button size="sm" variant="outline" className="text-xs">Track</Button>,
      meta: { location: 'New York, NY' },
    },
    {
      id: 5,
      title: 'Out for Delivery',
      description: 'Your package is out for delivery today.',
      timestamp: 'Dec 28',
      time: 'Estimated 2:00 PM',
      type: 'warning',
      icon: <Truck className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['Scheduled'],
    },
    {
      id: 6,
      title: 'Delivered',
      description: 'Your package has been delivered.',
      timestamp: 'Dec 28',
      time: 'By 8:00 PM',
      type: 'default',
      icon: <Check className="h-3 w-3 sm:h-4 sm:w-4" />,
      tags: ['Future'],
    },
  ];

  const projectTimeline: TimelineItem[] = [
    {
      id: 1,
      title: 'Project Kickoff',
      description: 'Initial meeting with stakeholders to define project scope and objectives.',
      timestamp: 'Jan 15, 2024',
      type: 'success',
      completed: true,
      user: 'Alex Johnson',
      meta: { location: 'Conference Room A' },
    },
    {
      id: 2,
      title: 'Design Phase',
      description: 'UI/UX design and prototyping completed. Waiting for client approval.',
      timestamp: 'Feb 1, 2024',
      type: 'primary',
      completed: true,
      user: 'Sarah Miller',
      meta: { progress: 100 },
    },
    {
      id: 3,
      title: 'Development Sprint 1',
      description: 'Backend infrastructure and core functionality development.',
      timestamp: 'Mar 10, 2024',
      type: 'info',
      completed: true,
      user: 'Michael Chen',
      meta: { progress: 100 },
    },
    {
      id: 4,
      title: 'Development Sprint 2',
      description: 'Frontend implementation and API integration.',
      timestamp: 'Apr 5, 2024',
      type: 'info',
      user: 'Emma Davis',
      meta: { progress: 85 },
      action: <Button size="sm" variant="outline" className="text-xs">Details</Button>,
    },
    {
      id: 5,
      title: 'QA & Testing',
      description: 'Comprehensive testing phase including unit, integration, and user acceptance testing.',
      timestamp: 'May 20, 2024',
      type: 'warning',
      user: 'David Wilson',
    },
    {
      id: 6,
      title: 'Launch',
      description: 'Production deployment and official launch.',
      timestamp: 'Jun 15, 2024',
      type: 'default',
    },
  ];

  const compactTimeline: TimelineItem[] = [
    {
      id: 1,
      title: 'New user registered',
      timestamp: '2 min ago',
      type: 'info',
      icon: <User className="h-3 w-3" />,
    },
    {
      id: 2,
      title: 'Payment received',
      timestamp: '5 min ago',
      type: 'success',
      icon: <CreditCard className="h-3 w-3" />,
    },
    {
      id: 3,
      title: 'Server warning',
      timestamp: '15 min ago',
      type: 'warning',
      icon: <AlertCircle className="h-3 w-3" />,
    },
    {
      id: 4,
      title: 'New message',
      timestamp: '1 hour ago',
      type: 'primary',
      icon: <MessageSquare className="h-3 w-3" />,
    },
    {
      id: 5,
      title: 'Download completed',
      timestamp: '2 hours ago',
      type: 'success',
      icon: <Download className="h-3 w-3" />,
    },
  ];

  const activityTimeline: TimelineItem[] = [
    {
      id: 1,
      title: 'Website Redesign',
      description: 'Completed homepage redesign with improved UX',
      timestamp: '9:00 AM',
      type: 'success',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      icon: <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly sprint planning meeting',
      timestamp: '11:30 AM',
      type: 'info',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      icon: <User className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
    {
      id: 3,
      title: 'Code Review',
      description: 'Reviewed PR #124 for authentication module',
      timestamp: '2:00 PM',
      type: 'warning',
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      icon: <Check className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
    {
      id: 4,
      title: 'Client Demo',
      description: 'Presented new features to client stakeholders',
      timestamp: '4:30 PM',
      type: 'primary',
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      icon: <Star className="h-3 w-3 sm:h-4 sm:w-4" />,
    },
  ];

  const handleItemClick = (item: TimelineItem) => {
    console.log('Timeline item clicked:', item);
  };

  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Timeline</h1>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
          Visual representation of events in chronological order with multiple display modes.
        </p>
      </div>

      <div className="flex items-center justify-end p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm">Animation</span>
          <Switch checked={animate} onCheckedChange={setAnimate} />
        </div>
      </div>

      <ComponentPreview
        title="Vertical Timeline"
        description="Default vertical timeline with connectors and status indicators."
        code={`const timelineData = [
  {
    id: 1,
    title: 'Order Placed',
    description: 'Your order has been placed successfully.',
    timestamp: 'Today',
    time: '10:30 AM',
    type: 'success',
    completed: true,
  },
];

<Timeline
  items={timelineData}
  animate={true}
  onItemClick={handleItemClick}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Timeline
            items={orderTimeline}
            animate={animate}
            onItemClick={handleItemClick}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Detailed Timeline"
        description="Rich timeline with user info, progress bars, and actions."
        code={`<Timeline
  items={projectTimeline}
  mode="detailed"
  align="alternate"
  showDates={true}
  animate={true}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Timeline
            items={projectTimeline}
            mode="detailed"
            align="alternate"
            showDates={true}
            animate={animate}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Horizontal Timeline"
        description="Compact horizontal timeline suitable for headers or progress indicators."
        code={`<Timeline
  items={compactTimeline}
  direction="horizontal"
  mode="compact"
  showConnectors={true}
  animate={true}
  className="p-6"
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Timeline
            items={compactTimeline}
            direction="horizontal"
            mode="compact"
            showConnectors={true}
            animate={animate}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Compact Activity Timeline"
        description="Minimal timeline for activity feeds or notifications."
        code={`<Timeline
  items={activityTimeline}
  mode="compact"
  align="right"
  showConnectors={false}
  className="max-w-md"
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl max-w-md mx-auto">
          <Timeline
            items={activityTimeline}
            mode="compact"
            align="right"
            showConnectors={false}
            animate={animate}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Custom Colored Timeline"
        description="Timeline with custom colors and icons for different event types."
        code={`const customItems = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Completed homepage redesign',
    timestamp: '9:00 AM',
    color: 'bg-purple-100 text-purple-600',
    icon: <TrendingUp className="h-4 w-4" />,
  },
];

<Timeline
  items={customItems}
  animate={true}
/>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Timeline
            items={activityTimeline.map(item => ({
              ...item,
              action: <Button size="sm" variant="ghost" className="h-6 sm:h-7"><ExternalLink size={10} className="sm:size-3" /></Button>,
            }))}
            animate={animate}
            onItemClick={handleItemClick}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement different timeline variations."
        code={`import { Timeline, TimelineItem } from '../components/ui/Timeline';
import { Check, Clock, User } from 'lucide-react';

const MyTimeline = () => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: 'Task Started',
      description: 'Begin working on the new feature',
      timestamp: '10:00 AM',
      time: 'Today',
      type: 'success',
      icon: <Check size={16} />,
      tags: ['Development'],
      completed: true,
    },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Project Timeline</h2>
      <Timeline
        items={timelineData}
        animate={true}
        onItemClick={(item) => console.log('Clicked:', item)}
      />
    </div>
  );
};`}
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Clock className="text-primary-600 dark:text-primary-400 size-4 sm:size-5" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50 text-sm sm:text-base">Multiple Display Modes</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Timeline component supports vertical, horizontal, compact, and detailed modes.
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 pt-2">
              <Badge variant="outline" className="text-xs">Vertical</Badge>
              <Badge variant="outline" className="text-xs">Horizontal</Badge>
              <Badge variant="outline" className="text-xs">Alternate</Badge>
              <Badge variant="outline" className="text-xs">Compact</Badge>
              <Badge variant="outline" className="text-xs">Detailed</Badge>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default TimelineView;