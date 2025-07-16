import { PanelRightOpen } from "lucide-react";
import { Handle, Position } from "reactflow";

const OutputNode = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-xs relative">
      {/* Incoming connection handle (top) */}
      <Handle type="target" position={Position.Top} className="bg-blue-500 w-2 h-2" />

      <div className="flex items-center gap-2 mb-2">
        <PanelRightOpen className="text-yellow-500" />
        <h2 className="text-base font-semibold">Output</h2>
      </div>

      <div className="text-sm text-gray-700 whitespace-pre-wrap">
        {data?.output || "Output will be generated based on query"}
      </div>

      {/* Optional outgoing connection handle (bottom) */}
      <Handle type="source" position={Position.Bottom} className="bg-green-500 w-2 h-2" />
    </div>
  );
};

export default OutputNode;
