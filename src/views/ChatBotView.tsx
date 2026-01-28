import { MessageCircle } from "lucide-react";
import ComponentPreview from "./ComponentPreview";
import UniversalChatBot from "../components/ui/UniversalChatBot";

const ChatBotView = () => {
  const chatbotCode = `<UniversalChatBot 
  apiKey="YOUR_API_KEY"
  model="gpt-4"
  title="AI Assistant"
  systemPrompt="You are a helpful assistant."
  language="en"
/>`;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">AI ChatBot Component</h1>
        <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
          A highly customizable, reusable AI chat component that supports any OpenAI-compatible API (OpenRouter, DeepSeek, etc).
        </p>
      </div>

      <ComponentPreview
        title="Universal AI ChatBot"
        description="Features streaming responses, persistent chat history (LocalStorage), and support for multiple API providers."
        code={chatbotCode}
      >
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <MessageCircle size={48} className="text-slate-300 mb-4" />
          <p className="text-slate-500 text-sm text-center">
            The ChatBot toggle is visible at the bottom right/left of the screen. <br />
            Try interacting with the floating button.
          </p>
        </div>
      </ComponentPreview>

       <UniversalChatBot
        apiKey="YOUR_API_KEY_HERE"  
        model="gpt-3.5-turbo"
        title="Preview Bot"
        language="ar"
      />
    </div>
  );
};
export default ChatBotView