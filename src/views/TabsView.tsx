import { User, Settings, Bell, Database, Code, Lock, Globe, BarChart, Mail, Image, Video, FileText, Download, Upload, Cloud, Server } from 'lucide-react';
import { Tabs, TabsList, TabTrigger, TabContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Core';
import { Card } from '../components/ui/Layout';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';

const TabsView = () => {
  return (
    <div className="space-y-6 sm:space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Tabs</h1>
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
          Navigate between different views or sections within the same context.
        </p>
      </div>

      <ComponentPreview
        title="Default Tabs"
        description="Standard tab interface with rounded corners and subtle hover effects."
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabTrigger value="account">Account</TabTrigger>
    <TabTrigger value="password">Password</TabTrigger>
    <TabTrigger value="notifications">Notifications</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Tabs defaultValue="account">
            <TabsList>
              <TabTrigger value="account" icon={<User size={14} className="sm:size-4" />}>
                Account
              </TabTrigger>
              <TabTrigger value="password" icon={<Lock size={14} className="sm:size-4" />}>
                Password
              </TabTrigger>
              <TabTrigger value="notifications" icon={<Bell size={14} className="sm:size-4" />} badge={3}>
                Notifications
              </TabTrigger>
              <TabTrigger value="billing" icon={<Database size={14} className="sm:size-4" />}>
                Billing
              </TabTrigger>
            </TabsList>

            <TabContent value="account" className="pt-4 sm:pt-6">
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-50">Account Settings</h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  Manage your account preferences, profile information, and privacy settings.
                </p>
                <div className="grid gap-3 sm:gap-4 max-w-sm">
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Email" placeholder="john@example.com" type="email" />
                  <Button className="w-fit text-sm">Save Changes</Button>
                </div>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Underline Tabs"
        description="Clean underline style tabs with animated active indicator."
        code={`<Tabs defaultValue="overview" variant="underline">
  <TabsList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="analytics">Analytics</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Tabs defaultValue="overview" variant="underline">
            <TabsList>
              <TabTrigger value="overview" icon={<BarChart size={14} className="sm:size-4" />}>
                Overview
              </TabTrigger>
              <TabTrigger value="analytics" icon={<Database size={14} className="sm:size-4" />}>
                Analytics
              </TabTrigger>
              <TabTrigger value="reports" icon={<FileText size={14} className="sm:size-4" />} badge="New">
                Reports
              </TabTrigger>
              <TabTrigger value="settings" icon={<Settings size={14} className="sm:size-4" />}>
                Settings
              </TabTrigger>
            </TabsList>

            <TabContent value="overview" className="pt-4 sm:pt-6">
              <div className="grid gap-3 sm:gap-6 sm:grid-cols-3">
                <Card className="p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold">1,234</div>
                  <div className="text-xs sm:text-sm text-slate-500">Total Visitors</div>
                </Card>
                <Card className="p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold">$12,456</div>
                  <div className="text-xs sm:text-sm text-slate-500">Revenue</div>
                </Card>
                <Card className="p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl font-bold">89%</div>
                  <div className="text-xs sm:text-sm text-slate-500">Conversion Rate</div>
                </Card>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Pills Tabs"
        description="Rounded pill-shaped tabs for a modern look."
        code={`<Tabs defaultValue="all" variant="pills">
  <TabsList>
    <TabTrigger value="all">All Files</TabTrigger>
    <TabTrigger value="images">Images</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Tabs defaultValue="all" variant="pills">
            <TabsList>
              <TabTrigger value="all" icon={<FileText size={14} className="sm:size-4" />}>
                All Files
              </TabTrigger>
              <TabTrigger value="images" icon={<Image size={14} className="sm:size-4" />} badge={12}>
                Images
              </TabTrigger>
              <TabTrigger value="documents" icon={<FileText size={14} className="sm:size-4" />} badge={5}>
                Documents
              </TabTrigger>
              <TabTrigger value="videos" icon={<Video size={14} className="sm:size-4" />}>
                Videos
              </TabTrigger>
            </TabsList>

            <TabContent value="all" className="pt-4 sm:pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText size={16} className="text-slate-400 sm:size-5" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">project_docs.pdf</div>
                      <div className="text-xs sm:text-sm text-slate-500">Updated 2 hours ago</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs sm:text-sm">Download</Button>
                </div>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Segmented Tabs"
        description="Segmented control style tabs that fill available width."
        code={`<Tabs defaultValue="monthly" variant="segmented">
  <TabsList fullWidth>
    <TabTrigger value="daily">Daily</TabTrigger>
    <TabTrigger value="weekly">Weekly</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Tabs defaultValue="monthly" variant="segmented">
            <TabsList fullWidth>
              <TabTrigger value="daily">Daily</TabTrigger>
              <TabTrigger value="weekly">Weekly</TabTrigger>
              <TabTrigger value="monthly">Monthly</TabTrigger>
              <TabTrigger value="yearly">Yearly</TabTrigger>
            </TabsList>

            <TabContent value="monthly" className="pt-4 sm:pt-6">
              <Card className="p-4 sm:p-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold">3,456</div>
                  <div className="text-sm text-slate-500">Active users this month</div>
                </div>
              </Card>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Vertical Tabs"
        description="Vertical tabs for sidebar navigation or settings panels."
        code={`<div className="flex gap-6">
  <Tabs defaultValue="general" variant="vertical">
    <TabsList>
      <TabTrigger value="general">General</TabTrigger>
    </TabsList>
  </Tabs>
</div>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl">
          <Tabs defaultValue="general" variant="vertical">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <TabsList>
                <TabTrigger value="general" icon={<Settings size={14} className="sm:size-4" />}>
                  General
                </TabTrigger>
                <TabTrigger value="editor" icon={<Code size={14} className="sm:size-4" />}>
                  Editor
                </TabTrigger>
                <TabTrigger value="integrations" icon={<Globe size={14} className="sm:size-4" />}>
                  Integrations
                </TabTrigger>
                <TabTrigger value="advanced" icon={<Server size={14} className="sm:size-4" />}>
                  Advanced
                </TabTrigger>
              </TabsList>

              <div className="flex-1">
                <TabContent value="general" className="pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">General Settings</h3>
                    <div className="space-y-3 sm:space-y-4 max-w-md">
                      <Input label="Workspace Name" defaultValue="My Workspace" />
                      <Input label="Workspace URL" defaultValue="my-workspace" />
                    </div>
                  </div>
                </TabContent>
              </div>
            </div>
          </Tabs>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Tab Sizes"
        description="Tabs available in small, medium, and large sizes."
        code={`<div className="space-y-6">
  <Tabs defaultValue="tab1" size="sm">
    <TabsList>
      <TabTrigger value="tab1">Small</TabTrigger>
    </TabsList>
  </Tabs>
</div>`}
      >
        <div className="p-4 sm:p-6 border border-slate-200 dark:border-slate-800 rounded-lg sm:rounded-xl space-y-6 sm:space-y-8">
          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Small Size</div>
            <Tabs defaultValue="small1" size="sm">
              <TabsList>
                <TabTrigger value="small1" icon={<Mail size={12} />}>
                  Inbox
                </TabTrigger>
                <TabTrigger value="small2" icon={<Upload size={12} />}>
                  Sent
                </TabTrigger>
                <TabTrigger value="small3" icon={<Download size={12} />} badge={5}>
                  Drafts
                </TabTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Medium Size (Default)</div>
            <Tabs defaultValue="medium1" size="md">
              <TabsList>
                <TabTrigger value="medium1" icon={<Cloud size={14} className="sm:size-4" />}>
                  Cloud Storage
                </TabTrigger>
                <TabTrigger value="medium2" icon={<Server size={14} className="sm:size-4" />}>
                  Local Storage
                </TabTrigger>
                <TabTrigger value="medium3" icon={<Database size={14} className="sm:size-4" />}>
                  Database
                </TabTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Large Size</div>
            <Tabs defaultValue="large1" size="lg">
              <TabsList>
                <TabTrigger value="large1" icon={<User size={16} className="sm:size-5" />}>
                  Profile
                </TabTrigger>
                <TabTrigger value="large2" icon={<Settings size={16} className="sm:size-5" />}>
                  Settings
                </TabTrigger>
                <TabTrigger value="large3" icon={<Bell size={16} className="sm:size-5" />}>
                  Notifications
                </TabTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement tabs with different variants."
        code={`import { Tabs, TabsList, TabTrigger, TabContent } from '../components/ui/Tabs';
import { User, Settings, Bell } from 'lucide-react';

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="profile" variant="underline">
      <TabsList className="mb-6">
        <TabTrigger value="profile" icon={<User size={16} />}>
          Profile
        </TabTrigger>
      </TabsList>
    </Tabs>
  );
};`}
      >
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Settings className="text-primary-600 dark:text-primary-400 size-4 sm:size-5" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50 text-sm sm:text-base">Flexible Tab Components</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Tabs component supports 5 different variants, 3 sizes, icons, badges, and full accessibility compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 pt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Default</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Underline</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">Pills</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Segmented</span>
              <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400">Vertical</span>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default TabsView;