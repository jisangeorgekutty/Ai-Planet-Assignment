import { useState, useEffect } from "react";
import { BookOpen, Eye, Settings, Upload } from "lucide-react";
import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

const KnowledgeBaseNode = () => {
    const [file, setFile] = useState(null);
    const [embeddingModel, setEmbeddingModel] = useState("gemini-gecko");
    const [apiKey, setApiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);


    const sampleContext = "Artificial Intelligence (AI) has the potential to revolutionize education by personalizing learning, automating administrative tasks, and providing real-time feedback to both students and teachers.However, challenges remain in areas such as data privacy, equity of access, and the need for teacher training.Successful integration of AI requires a careful balance between innovation and ethical considerations, ensuring that technology enhances rather than replaces the human element in education."

    const { setKBInputs } = useWorkflowStore();

    useEffect(() => {
        if (file && embeddingModel && apiKey) {
            setKBInputs({ file, embeddingModel, apiKey, sampleContext });
        }
    }, [file, embeddingModel, apiKey, sampleContext]);

    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs relative border border-gray-200">
            {/* Handles */}
            <Handle type="target" position={Position.Left} style={{ background: "#F97316", width: 8, height: 8 }} />
            <Handle type="source" position={Position.Right} style={{ background: "#F97316", width: 8, height: 8 }} />

            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <BookOpen className="text-gray-700 w-4 h-4" />
                    <h2 className="text-sm font-semibold">Knowledge Base</h2>
                </div>
                <div className="text-gray-500">
                    <Settings className="w-4 h-4 text-black cursor-pointer" />
                </div>
            </div>

            {/* Subheader */}
            <div className="bg-blue-100 text-black text-xs font-medium px-2 py-1 rounded mb-3">
                Let LLM search info in your file
            </div>

            {/* Upload Box */}
            <label className="block text-sm font-medium text-gray-700 mb-1">File for Knowledge Base</label>
            <div className="w-full mb-3">
                <label className="border border-dashed border-green-700 rounded-md p-3 text-center text-sm text-green-700 cursor-pointer block hover:bg-gray-50">
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="hidden"
                    />
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-sm truncate max-w-[150px]">
                            {file ? file.name : "Upload File"}
                        </span>
                        <Upload className="w-5 h-5 text-green-700" />
                    </div>
                </label>
            </div>
            {/* Embedding Model Select */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Embedding Model</label>
            <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="gemini-gecko@003">textembedding-gecko@003</option>
                <option value="text-embedding-3-large">text-embedding-3-large</option>
                <option value="text-embedding-ada-002">text-embedding-ada-002</option>
            </select>

            {/* API Key Input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
            <div className="relative">
                <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="API Key"
                    className="w-full border border-gray-300 rounded p-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Eye
                    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowApiKey(!showApiKey)}
                />
            </div>
        </div>
    );
};

export default KnowledgeBaseNode;
