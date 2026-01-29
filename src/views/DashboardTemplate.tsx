import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip} from "recharts";
import { Button } from "../components/ui/Button";
import { Card, Grid } from "../components/ui/Layout";
import { Avatar } from "../components/ui/Core";

const DashboardTemplate = () => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Overview of your activity.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">Download</Button>
          <Button size="sm" className="text-xs sm:text-sm">Create New</Button>
        </div>
      </div>

      <Grid cols={2} className="md:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 sm:p-6">
          <div className="text-xs sm:text-sm font-medium text-slate-500">Total Revenue</div>
          <div className="text-xl sm:text-2xl font-bold">$45,231.89</div>
          <div className="text-xs text-success-600 font-medium">+20.1% from last month</div>
        </Card>
        <Card className="p-4 sm:p-6">
          <div className="text-xs sm:text-sm font-medium text-slate-500">Subscriptions</div>
          <div className="text-xl sm:text-2xl font-bold">+2350</div>
          <div className="text-xs text-success-600 font-medium">+180.1% from last month</div>
        </Card>
        <Card className="p-4 sm:p-6">
          <div className="text-xs sm:text-sm font-medium text-slate-500">Sales</div>
          <div className="text-xl sm:text-2xl font-bold">+12,234</div>
          <div className="text-xs text-success-600 font-medium">+19% from last month</div>
        </Card>
        <Card className="p-4 sm:p-6">
          <div className="text-xs sm:text-sm font-medium text-slate-500">Active Now</div>
          <div className="text-xl sm:text-2xl font-bold">+573</div>
          <div className="text-xs text-slate-500">+201 since last hour</div>
        </Card>
      </Grid>

      <Grid cols={1} className="lg:grid-cols-7 gap-3 sm:gap-4">
        <Card className="lg:col-span-4 p-4 sm:p-6 min-h-[250px] sm:min-h-[350px]">
          <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Overview</h3>
          <div className="h-[200px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                 <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2} dot={false}  />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="lg:col-span-3 p-4 sm:p-6">
          <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Recent Sales</h3>
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex items-center">
                <Avatar fallback={`U${i}`} className="h-7 w-7 sm:h-9 sm:w-9" />
                <div className="ml-2 sm:ml-4 space-y-0.5 sm:space-y-1">
                  <p className="text-xs sm:text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-xs sm:text-sm text-slate-500">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium text-sm sm:text-base">+$1,999.00</div>
              </div>
            ))}
          </div>
        </Card>
      </Grid>
    </div>
    
  );
};
export default DashboardTemplate;