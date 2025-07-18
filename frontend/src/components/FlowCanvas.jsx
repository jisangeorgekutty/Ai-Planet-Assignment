import React, { useCallback, useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
    useViewport,
} from "reactflow";
import "reactflow/dist/style.css";
import { Play, Save, Plus, Minus, Scan, ChevronDown, Bot, X, Send } from "lucide-react";

import UserQueryNode from "../components/UserQueryNode";
import KnowledgeBaseNode from "../components/KnowledgeBaseNode";
import LLMNode from "../components/LLMNode";
import OutputNode from "../components/OutputNode";
import { useWorkflowStore } from "../store/useWorkflowStore";
import toast from "react-hot-toast";
import ChatModal from "./ChatModel";

const nodeTypes = {
    userQuery: UserQueryNode,
    knowledgeBase: KnowledgeBaseNode,
    llmNode: LLMNode,
    outputNode: OutputNode,
};

let id = 0;
const getId = () => `node_${id++}`;

const FlowCanvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { project, zoomIn, zoomOut, fitView } = useReactFlow();
    const { zoom } = useViewport();
    const [showChat, setShowChat] = useState(false);
    const [isBuilding, setIsBuilding] = useState(false);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const type = event.dataTransfer.getData("application/reactflow");
            const position = project({ x: event.clientX - 300, y: event.clientY });
            const newNode = {
                id: getId(),
                type,
                position,
                data: {},
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [project, setNodes]
    );

    const { callLLMAPI, callKnowledgeBaseAPI, context } = useWorkflowStore();

    const handleBuildStack = async () => {
        setIsBuilding(true);
        try {
            const hasKnowledgeBase = nodes.some((node) => node.type === "knowledgeBase");
            if (hasKnowledgeBase) {
                console.log("Step 1: Calling Knowledge Base API...");
                const context = await callKnowledgeBaseAPI();

                if (!context) {
                    toast.error("Knowledge base failed. Check inputs.");
                    return;
                }
                console.log("Knowledge Base Context:", context);
            } else {
                useWorkflowStore.setState({ context: "" });
                console.log("No Knowledge Base node found. Skipping context generation.");
            }


            console.log("Step 2: Calling LLM API...");
            const llmResponse = await callLLMAPI();

            if (!llmResponse) {
                toast.error("LLM failed. Check inputs.");
                return;
            }
            toast.success("Build Stack Complete!");
            console.log("Build complete! :");
        } catch (error) {
            console.error("Build stack failed:", error);
            toast.error("Build stack failed")
        } finally {
            setIsBuilding(false);
        }
    }
    return (
        <div className="flex-1 relative">
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
            >
                <Background />
                <div className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white shadow-md px-4 py-1 rounded text-sm text-gray-600">
                    <button
                        onClick={zoomIn}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Zoom In"
                    >
                        <Plus size={18} className="text-black font-semibold" />
                    </button>
                    <button
                        onClick={zoomOut}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Zoom Out"
                    >
                        <Minus size={18} className="text-black font-semibold" />
                    </button>
                    <button
                        onClick={() => fitView()}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Fit View"
                    >
                        <Scan size={18} className="text-black font-semibold" />
                    </button>
                    <span className="text-sm text-gray-600">
                        <div className="flex items-center gap-2 text-black font-semibold">
                            {(zoom * 100).toFixed(0)}% <ChevronDown size={16} className="text-gray-400" />
                        </div>
                    </span>
                </div>
            </ReactFlow>

            <div className="absolute bottom-20 right-4 flex flex-col gap-3 items-end">
                <div className="group relative">
                    <button onClick={handleBuildStack} className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-300 shadow-lg">
                        {isBuilding ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                            <Save size={18} />
                        )}
                    </button>
                    <div className="opacity-0 group-hover:opacity-100 absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none">
                        <h2 className="text-black">Build Stack</h2>
                        <div className="absolute left-full top-1/2 -ml-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                </div>

                <div className="group relative">
                    <button onClick={() => setShowChat(true)} className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-300 shadow-lg">
                        <Play size={18} />
                    </button>
                    <div className="opacity-0 group-hover:opacity-100 absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none">
                        <h2 className="text-black">Chat with Stack</h2>
                        <div className="absolute left-full top-1/2 -ml-1 transform -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                </div>
            </div>

            {/* Chat Modal */}
            {showChat && <ChatModal onClose={() => setShowChat(false)} />}
        </div>
    );
};

export default FlowCanvas;