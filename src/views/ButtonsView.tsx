import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import ComponentPreview from "./ComponentPreview";

const ButtonsView = () => (
  <div className="space-y-10">
    <ComponentPreview
      title="Button Variants"
      description="Use the variant prop to control the visual style."
      code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Button Sizes"
      description="Buttons come in four sizes: sm, md, lg, and icon."
      code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add Item"><Plus size={18} /></Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" aria-label="Add Item"><Plus size={18} /></Button>
      </div>
    </ComponentPreview>

    <ComponentPreview
      title="Button States"
      description="Loading and disabled states."
      code={`<Button isLoading>Loading</Button>
<Button disabled>Disabled</Button>
<Button size="icon" isLoading variant="secondary"><Plus size={18} /></Button>`}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <Button isLoading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button size="icon" isLoading variant="secondary"><Plus size={18} /></Button>
      </div>
    </ComponentPreview>
  </div>
);
export default ButtonsView;