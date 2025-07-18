import { useState,useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Settings, FileInput } from "lucide-react";
import { useWorkflowStore } from "../store/useWorkflowStore";

const UserQueryNode = () => {
  const [query, setQuery] = useState("");
  const {setUserQuery}=useWorkflowStore();

  useEffect(() => {
    setUserQuery(query);
    console.log("User Query set to:", query);
  }, [query, setUserQuery]);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs relative border border-gray-200">
      {/* Source handle */}
      <Handle type="source" position={Position.Bottom} className="bg-blue-500 w-2 h-2" />

      {/* Header with icon and settings */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <FileInput className="text-gray-700 w-4 h-4" />
          <h2 className="text-sm font-semibold">User Query</h2>
        </div>
        <Settings className="w-4 h-4 text-black cursor-pointer" />
      </div>

      {/* Subheader */}
      <div className="bg-blue-100 text-black text-xs font-medium px-2 py-1 rounded mb-3">
        Enter point for querys
      </div>

      {/* Textarea */}
      <label className="text-sm font-medium text-gray-700 mb-1 block">Query</label>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your query here"
        className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      {/* Submit button */}
      <div className="flex justify-center">  
        <span className="py-1.5 mt-4 text-xs">Query</span>
      </div>
    </div>
  );
};

export default UserQueryNode;
