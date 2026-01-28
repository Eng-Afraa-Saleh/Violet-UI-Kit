 import { User, Settings, Bell, Database, Code, Lock, Globe, BarChart, Mail, Image, Video, FileText, Download, Upload, Cloud, Server } from 'lucide-react';
 import { Tabs, TabsList, TabTrigger, TabContent } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Core';
import { Card } from '../components/ui/Layout';
import { Switch } from '../components/ui/Form';
import ComponentPreview from './ComponentPreview';

const TabsView = () => {
 
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Tabs</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Navigate between different views or sections within the same context.
        </p>
      </div>

      {/* Default Tabs */}
      <ComponentPreview
        title="Default Tabs"
        description="Standard tab interface with rounded corners and subtle hover effects."
        code={`<Tabs defaultValue="account">
  <TabsList>
    <TabTrigger value="account">Account</TabTrigger>
    <TabTrigger value="password">Password</TabTrigger>
    <TabTrigger value="notifications">Notifications</TabTrigger>
  </TabsList>
  
  <TabContent value="account">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Account Settings</h3>
      <p>Manage your account preferences and profile information.</p>
    </div>
  </TabContent>
  
  <TabContent value="password">
    <div>Password settings content</div>
  </TabContent>
  
  <TabContent value="notifications">
    <div>Notification settings content</div>
  </TabContent>
</Tabs>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Tabs defaultValue="account">
            <TabsList>
              <TabTrigger value="account" icon={<User size={16} />}>
                Account
              </TabTrigger>
              <TabTrigger value="password" icon={<Lock size={16} />}>
                Password
              </TabTrigger>
              <TabTrigger value="notifications" icon={<Bell size={16} />} badge={3}>
                Notifications
              </TabTrigger>
              <TabTrigger value="billing" icon={<Database size={16} />}>
                Billing
              </TabTrigger>
            </TabsList>

            <TabContent value="account" className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Account Settings</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your account preferences, profile information, and privacy settings.
                </p>
                <div className="grid gap-4 max-w-sm">
                  <Input label="Full Name" placeholder="John Doe" />
                  <Input label="Email" placeholder="john@example.com" type="email" />
                  <Button className="w-fit">Save Changes</Button>
                </div>
              </div>
            </TabContent>

            <TabContent value="password" className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Password & Security</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Update your password and enhance your account security.
                </p>
                <div className="grid gap-4 max-w-sm">
                  <Input label="Current Password" type="password" />
                  <Input label="New Password" type="password" />
                  <Input label="Confirm New Password" type="password" />
                  <Button className="w-fit">Update Password</Button>
                </div>
              </div>
            </TabContent>

            <TabContent value="notifications" className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Notifications</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Configure how and when you receive notifications.
                </p>
                <div className="space-y-4 max-w-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-slate-500">Receive updates via email</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-slate-500">Browser push notifications</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Alerts</div>
                      <div className="text-sm text-slate-500">Important alerts via SMS</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabContent>

            <TabContent value="billing" className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Billing & Plans</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Manage your subscription and payment methods.
                </p>
                <div className="grid gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Pro Plan</div>
                        <div className="text-sm text-slate-500">$29/month</div>
                      </div>
                      <Button variant="outline">Change Plan</Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Underline Tabs */}
      <ComponentPreview
        title="Underline Tabs"
        description="Clean underline style tabs with animated active indicator."
        code={`<Tabs defaultValue="overview" variant="underline">
  <TabsList>
    <TabTrigger value="overview">Overview</TabTrigger>
    <TabTrigger value="analytics">Analytics</TabTrigger>
    <TabTrigger value="reports">Reports</TabTrigger>
    <TabTrigger value="settings">Settings</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Tabs defaultValue="overview" variant="underline">
            <TabsList>
              <TabTrigger value="overview" icon={<BarChart size={16} />}>
                Overview
              </TabTrigger>
              <TabTrigger value="analytics" icon={<Database size={16} />}>
                Analytics
              </TabTrigger>
              <TabTrigger value="reports" icon={<FileText size={16} />} badge="New">
                Reports
              </TabTrigger>
              <TabTrigger value="settings" icon={<Settings size={16} />}>
                Settings
              </TabTrigger>
            </TabsList>

            <TabContent value="overview" className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-4">
                  <div className="text-2xl font-bold">1,234</div>
                  <div className="text-sm text-slate-500">Total Visitors</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold">$12,456</div>
                  <div className="text-sm text-slate-500">Revenue</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-slate-500">Conversion Rate</div>
                </Card>
              </div>
            </TabContent>

            <TabContent value="analytics" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">
                Detailed analytics dashboard with charts and metrics.
              </div>
            </TabContent>

            <TabContent value="reports" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">
                Generated reports and insights for your business.
              </div>
            </TabContent>

            <TabContent value="settings" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">
                Analytics configuration and settings.
              </div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Pills Tabs */}
      <ComponentPreview
        title="Pills Tabs"
        description="Rounded pill-shaped tabs for a modern look."
        code={`<Tabs defaultValue="all" variant="pills">
  <TabsList>
    <TabTrigger value="all">All Files</TabTrigger>
    <TabTrigger value="images">Images</TabTrigger>
    <TabTrigger value="documents">Documents</TabTrigger>
    <TabTrigger value="videos">Videos</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Tabs defaultValue="all" variant="pills">
            <TabsList>
              <TabTrigger value="all" icon={<FileText size={16} />}>
                All Files
              </TabTrigger>
              <TabTrigger value="images" icon={<Image size={16} />} badge={12}>
                Images
              </TabTrigger>
              <TabTrigger value="documents" icon={<FileText size={16} />} badge={5}>
                Documents
              </TabTrigger>
              <TabTrigger value="videos" icon={<Video size={16} />}>
                Videos
              </TabTrigger>
              <TabTrigger value="audio" icon={<Globe size={16} />} disabled>
                Audio (Soon)
              </TabTrigger>
            </TabsList>

            <TabContent value="all" className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-slate-400" />
                    <div>
                      <div className="font-medium">project_docs.pdf</div>
                      <div className="text-sm text-slate-500">Updated 2 hours ago</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">Download</Button>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900">
                  <div className="flex items-center gap-3">
                    <Image size={20} className="text-slate-400" />
                    <div>
                      <div className="font-medium">screenshot.png</div>
                      <div className="text-sm text-slate-500">Updated yesterday</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">Download</Button>
                </div>
              </div>
            </TabContent>

            <TabContent value="images" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">Image files gallery view.</div>
            </TabContent>

            <TabContent value="documents" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">Document files list view.</div>
            </TabContent>

            <TabContent value="videos" className="pt-6">
              <div className="text-slate-600 dark:text-slate-400">Video files gallery view.</div>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Segmented Tabs */}
      <ComponentPreview
        title="Segmented Tabs"
        description="Segmented control style tabs that fill available width."
        code={`<Tabs defaultValue="monthly" variant="segmented">
  <TabsList fullWidth>
    <TabTrigger value="daily">Daily</TabTrigger>
    <TabTrigger value="weekly">Weekly</TabTrigger>
    <TabTrigger value="monthly">Monthly</TabTrigger>
    <TabTrigger value="yearly">Yearly</TabTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Tabs defaultValue="monthly" variant="segmented">
            <TabsList fullWidth>
              <TabTrigger value="daily">Daily</TabTrigger>
              <TabTrigger value="weekly">Weekly</TabTrigger>
              <TabTrigger value="monthly">Monthly</TabTrigger>
              <TabTrigger value="yearly">Yearly</TabTrigger>
            </TabsList>

            <TabContent value="daily" className="pt-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">124</div>
                  <div className="text-slate-500">Active users today</div>
                </div>
              </Card>
            </TabContent>

            <TabContent value="weekly" className="pt-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">892</div>
                  <div className="text-slate-500">Active users this week</div>
                </div>
              </Card>
            </TabContent>

            <TabContent value="monthly" className="pt-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">3,456</div>
                  <div className="text-slate-500">Active users this month</div>
                </div>
              </Card>
            </TabContent>

            <TabContent value="yearly" className="pt-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">41,289</div>
                  <div className="text-slate-500">Active users this year</div>
                </div>
              </Card>
            </TabContent>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Vertical Tabs */}
     <ComponentPreview
        title="Vertical Tabs"
        description="Vertical tabs for sidebar navigation or settings panels."
        code={`<div className="flex gap-6">
  <Tabs defaultValue="general" variant="vertical">
    <TabsList>
      <TabTrigger value="general">General</TabTrigger>
      <TabTrigger value="editor">Editor</TabTrigger>
      <TabTrigger value="integrations">Integrations</TabTrigger>
      <TabTrigger value="advanced">Advanced</TabTrigger>
    </TabsList>
    
    <div className="flex-1 pl-6">
      <TabContent value="general">General settings</TabContent>
      <TabContent value="editor">Editor settings</TabContent>
      <TabContent value="integrations">Integrations settings</TabContent>
      <TabContent value="advanced">Advanced settings</TabContent>
    </div>
  </Tabs>
</div>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl">
          <Tabs defaultValue="general" variant="vertical">
            <div className="flex gap-8">
              <TabsList>
                <TabTrigger value="general" icon={<Settings size={16} />}>
                  General
                </TabTrigger>
                <TabTrigger value="editor" icon={<Code size={16} />}>
                  Editor
                </TabTrigger>
                <TabTrigger value="integrations" icon={<Globe size={16} />}>
                  Integrations
                </TabTrigger>
                <TabTrigger value="advanced" icon={<Server size={16} />}>
                  Advanced
                </TabTrigger>
              </TabsList>

              <div className="flex-1">
                <TabContent value="general" className="pt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Settings</h3>
                    <div className="space-y-4 max-w-md">
                      <Input label="Workspace Name" defaultValue="My Workspace" />
                      <Input label="Workspace URL" defaultValue="my-workspace" />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Public Profile</div>
                          <div className="text-sm text-slate-500">Make your profile visible to everyone</div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabContent>

                <TabContent value="editor" className="pt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Editor Settings</h3>
                    <div className="text-slate-600 dark:text-slate-400">
                      Configure your code editor preferences and themes.
                    </div>
                  </div>
                </TabContent>

                <TabContent value="integrations" className="pt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Integrations</h3>
                    <div className="text-slate-600 dark:text-slate-400">
                      Connect third-party services and APIs.
                    </div>
                  </div>
                </TabContent>

                <TabContent value="advanced" className="pt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Advanced Settings</h3>
                    <div className="text-slate-600 dark:text-slate-400">
                      Advanced configuration options for power users.
                    </div>
                  </div>
                </TabContent>
              </div>
            </div>
          </Tabs>
        </div>
      </ComponentPreview>

      {/* Different Sizes */}
      <ComponentPreview
        title="Tab Sizes"
        description="Tabs available in small, medium, and large sizes."
        code={`<div className="space-y-6">
  <Tabs defaultValue="tab1" size="sm">
    <TabsList>
      <TabTrigger value="tab1">Small</TabTrigger>
      <TabTrigger value="tab2">Small</TabTrigger>
    </TabsList>
  </Tabs>
  
  <Tabs defaultValue="tab1" size="md">
    <TabsList>
      <TabTrigger value="tab1">Medium</TabTrigger>
      <TabTrigger value="tab2">Medium</TabTrigger>
    </TabsList>
  </Tabs>
  
  <Tabs defaultValue="tab1" size="lg">
    <TabsList>
      <TabTrigger value="tab1">Large</TabTrigger>
      <TabTrigger value="tab2">Large</TabTrigger>
    </TabsList>
  </Tabs>
</div>`}
      >
        <div className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl space-y-8">
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
                <TabTrigger value="medium1" icon={<Cloud size={16} />}>
                  Cloud Storage
                </TabTrigger>
                <TabTrigger value="medium2" icon={<Server size={16} />}>
                  Local Storage
                </TabTrigger>
                <TabTrigger value="medium3" icon={<Database size={16} />}>
                  Database
                </TabTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <div className="text-sm font-medium mb-2 text-slate-500">Large Size</div>
            <Tabs defaultValue="large1" size="lg">
              <TabsList>
                <TabTrigger value="large1" icon={<User size={18} />}>
                  Profile
                </TabTrigger>
                <TabTrigger value="large2" icon={<Settings size={18} />}>
                  Settings
                </TabTrigger>
                <TabTrigger value="large3" icon={<Bell size={18} />}>
                  Notifications
                </TabTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </ComponentPreview>

      {/* Implementation Example */}
      <ComponentPreview
        title="Implementation Example"
        description="Complete code example showing how to implement tabs with different variants."
        code={`import { Tabs, TabsList, TabTrigger, TabContent } from '../components/ui/Tabs';
import { User, Settings, Bell } from 'lucide-react';

const SettingsTabs = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs 
        defaultValue="profile" 
        variant="underline"
        onChange={(tabId) => setActiveTab(tabId)}
      >
        <TabsList className="mb-6">
          <TabTrigger value="profile" icon={<User size={16} />}>
            Profile
          </TabTrigger>
          <TabTrigger value="account" icon={<Settings size={16} />}>
            Account
          </TabTrigger>
          <TabTrigger value="notifications" icon={<Bell size={16} />} badge={3}>
            Notifications
          </TabTrigger>
        </TabsList>

        <TabContent value="profile" className="space-y-6">
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          {/* Profile form content */}
        </TabContent>

        <TabContent value="account" className="space-y-6">
          <h2 className="text-2xl font-bold">Account Settings</h2>
          {/* Account form content */}
        </TabContent>

        <TabContent value="notifications" className="space-y-6">
          <h2 className="text-2xl font-bold">Notification Settings</h2>
          {/* Notification settings content */}
        </TabContent>
      </Tabs>
      
      <div className="mt-4 text-sm text-slate-500">
        Current active tab: {activeTab}
      </div>
    </div>
  );
};`}
      >
        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-3">
            <div className="h-10 w-10 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Settings className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-medium text-slate-900 dark:text-slate-50">Flexible Tab Components</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              The Tabs component supports 5 different variants, 3 sizes, icons, badges, and full accessibility compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
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