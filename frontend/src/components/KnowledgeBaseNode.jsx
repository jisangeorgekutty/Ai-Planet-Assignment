import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Handle, Position } from "reactflow";

const KnowledgeBaseNode = ({ data }) => {
  const [file, setFile] = useState(null);
  const [embeddingModel, setEmbeddingModel] = useState("");
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs relative">
      {/* Incoming connection handle (top) */}
      <Handle type="target" position={Position.Top} className="bg-blue-500 w-2 h-2" />
      
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="text-black" />
        <h2 className="text-base font-semibold">Knowledge Base</h2>
      </div>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Embedding Model"
        value={embeddingModel}
        onChange={(e) => setEmbeddingModel(e.target.value)}
        className="mb-2 w-full border rounded p-2 text-sm"
      />
      <input
        type="password"
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full border rounded p-2 text-sm"
      />

      {/* Outgoing connection handle (bottom) */}
      <Handle type="source" position={Position.Bottom} className="bg-green-500 w-2 h-2" />
    </div>
  );
};

export default KnowledgeBaseNode;
