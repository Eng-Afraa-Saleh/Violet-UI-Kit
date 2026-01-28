import { useState } from "react";
import ComponentPreview from "./ComponentPreview";
import { Checkbox, Select, Switch, Textarea } from "../components/ui/Form";

const FormsView = () => {
  const [aiText, setAiText] = useState("The fox jump over dog.");
  // const [loading, setLoading] = useState(false);

  // const handleAiFix = async () => {
  //   setLoading(true);
  //   const fixed = await improveText(aiText);
  //   setAiText(fixed);
  //   setLoading(false);
  // };

  return (
    <div className="space-y-10">
      <ComponentPreview title="Form Controls" code={`<Switch /> <Checkbox /> <Select />`}>
        <div className="w-full max-w-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Airplane Mode</span>
            <Switch />
          </div>
          <Checkbox label="Accept terms and conditions" />
          <Select
            label="Framework"
            options={[
              { label: 'React', value: 'react' },
              { label: 'Vue', value: 'vue' },
              { label: 'Angular', value: 'angular' }
            ]}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Textarea with AI" description="Uses Gemini API to improve text." code={`// Uses services/ai.ts
improveText(text).then(result => setText(result));`}>
        <div className="w-full max-w-md space-y-4">
          <Textarea
            label="Bio"
            value={aiText}
            onChange={(e) => setAiText(e.target.value)}
            rows={4}
          />
          {/* <div className="flex justify-end">
             <Button size="sm" variant="secondary" onClick={handleAiFix} isLoading={loading} leftIcon={<Wand2 size={14} />}>
               Fix Grammar (AI)
             </Button>
          </div> */}
        </div>
      </ComponentPreview>
    </div>
  );
};
export default FormsView;