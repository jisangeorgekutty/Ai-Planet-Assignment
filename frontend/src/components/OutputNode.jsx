import { Settings, FileOutput } from "lucide-react";
import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

const OutputNode = () => {
    const { output } = useWorkflowStore();
    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs relative border border-gray-200">
            {/* Connection handles */}
            <Handle type="target" position={Position.Top} className="bg-blue-500 w-2 h-2" />

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <FileOutput className="text-gray-700 w-4 h-4" />
                    <h2 className="text-sm font-semibold">Output</h2>
                </div>
                <div className="text-gray-500">
                    <Settings className="w-4 h-4 text-black cursor-pointer" />
                </div>
            </div>

            {/* Subheader */}
            <div className="bg-blue-100 text-black text-xs font-medium px-2 py-1 rounded mb-3">
                Output of the result nodes as text
            </div>

            {/* Output Label */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">Output Text</label>

            {/* Output Box */}
            <div className="w-full bg-gray-100 text-gray-500 text-sm p-3 rounded-md min-h-[60px]">
                {output ? output : "Output will be generated based on query"}
            </div>

            {/* Footer label */}
            <p className="text-xs text-gray-500 mt-3">Output</p>
        </div>
    );
};

export default OutputNode;
