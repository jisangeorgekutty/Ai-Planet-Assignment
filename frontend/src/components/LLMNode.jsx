import { useState } from "react";
import { Bot } from "lucide-react";
import { Handle, Position } from "reactflow";

const LLMNode = ({ data }) => {
  const [model, setModel] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [serpApiKey, setSerpApiKey] = useState("");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs relative">
      {/* Incoming connection handle */}
      <Handle type="target" position={Position.Top} className="bg-blue-500 w-2 h-2" />

      <div className="flex items-center gap-2 mb-2">
        <Bot className="text-purple-600" />
        <h2 className="text-base font-semibold">LLM (OpenAI)</h2>
      </div>

      <input
        type="text"
        placeholder="Model (e.g. GPT-4o-Mini)"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="mb-2 w-full border rounded p-2 text-sm"
      />
      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="mb-2 w-full border rounded p-2 text-sm"
      />
      <textarea
        placeholder="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-2 w-full border rounded p-2 text-sm"
      />
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm">WebSearch Tool</label>
        <input
          type="checkbox"
          checked={webSearch}
          onChange={(e) => setWebSearch(e.target.checked)}
        />
      </div>
      <input
        type="password"
        placeholder="SERP API"
        value={serpApiKey}
        onChange={(e) => setSerpApiKey(e.target.value)}
        className="w-full border rounded p-2 text-sm"
      />

      {/* Outgoing connection handle */}
      <Handle type="source" position={Position.Bottom} className="bg-green-500 w-2 h-2" />
    </div>
  );
};

export default LLMNode;
