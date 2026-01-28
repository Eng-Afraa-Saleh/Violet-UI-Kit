import { Button } from "../components/ui/Button";
import { Switch } from "../components/ui/Form";
import { Card, Grid } from "../components/ui/Layout";
import ComponentPreview from "./ComponentPreview";

const LayoutView = () => (
  <div className="space-y-10">
    <ComponentPreview title="Card" code={`<Card title="..." description="...">Content</Card>`}>
      <Card
        title="Notifications"
        description="Manage your notification preferences."
        footer={<Button className="w-full">Save Preferences</Button>}
        className="max-w-sm w-full"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Email Notifications</div>
            <Switch checked />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">Push Notifications</div>
            <Switch />
          </div>
        </div>
      </Card>
    </ComponentPreview>

    <ComponentPreview title="Grid System" code={`<Grid cols={3} gap={4}>...</Grid>`}>
      <Grid cols={3} gap={4} className="w-full">
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">1</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">2</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">3</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">4</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">5</div>
        <div className="bg-primary-100 p-4 rounded text-center text-primary-700">6</div>
      </Grid>
    </ComponentPreview>
  </div>
);
export default LayoutView;  