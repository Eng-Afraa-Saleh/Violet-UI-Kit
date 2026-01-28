import {  MousePointer2 } from "lucide-react";
import { Avatar, Badge, Input } from "../components/ui/Core";
import ComponentPreview from "./ComponentPreview";

const InputsView = () => (
  <div className="space-y-10">
    <ComponentPreview title="Input Fields" code={`<Input label="Email" placeholder="user@example.com" />`} >
      <div className="w-full max-w-sm space-y-4">
        <Input label="Email" placeholder="user@example.com" />
        <Input label="Password" type="password" placeholder="••••••••" />
        <Input label="With Icon" leftIcon={<MousePointer2 size={16} />} placeholder="Click me" />
        <Input label="Error State" error="Invalid email address" defaultValue="invalid@" />
      </div>
    </ComponentPreview>

    <ComponentPreview title="Badges" code={`<Badge>Default</Badge>`}>
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Error</Badge>
      </div>
    </ComponentPreview>

    <ComponentPreview title="Avatars" code={`<Avatar fallback="JD" />`}>
      <div className="flex gap-4">
        <Avatar fallback="CN" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <Avatar fallback="JD" />
        <Avatar fallback="AB" className="bg-pink-100 text-pink-600" />
      </div>
    </ComponentPreview>
  </div>
);
export default InputsView;  