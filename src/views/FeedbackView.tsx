import { useState } from "react";
import ComponentPreview from "./ComponentPreview";
import { Alert, Dialog } from "../components/ui/Feedback";
import { Button } from "../components/ui/Button";
import { Input, Skeleton } from "../components/ui/Core";

const FeedbackView = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="space-y-10">
      <ComponentPreview title="Alerts" code={`<Alert variant="info">...</Alert>`}>
        <div className="w-full space-y-4">
          <Alert title="Information">New version available.</Alert>
          <Alert variant="success" title="Success">Payment processed successfully.</Alert>
          <Alert variant="warning" title="Warning">Your account is about to expire.</Alert>
          <Alert variant="error" title="Error">Failed to save changes.</Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dialog" code={`<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} ... />`}>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </>
          }
        >
          <div className="grid gap-4 py-4">
            <Input label="Name" defaultValue="Pedro Duarte" />
            <Input label="Username" defaultValue="@peduarte" />
          </div>
        </Dialog>
      </ComponentPreview>

      <ComponentPreview title="Skeleton" code={`<Skeleton className="h-4 w-[250px]" />`}>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
};

export default FeedbackView;