import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Handle, Position } from "reactflow";

const UserQueryNode = ({ data }) => {
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs relative">
      {/* Source handle: to connect from UserQuery to next node */}
      <Handle type="source" position={Position.Bottom} className="bg-green-500 w-2 h-2" />

      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="text-blue-500" />
        <h2 className="text-base font-semibold">User Query</h2>
      </div>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your query here"
        className="w-full border rounded p-2 text-sm resize-none"
      />
    </div>
  );
};

export default UserQueryNode;
