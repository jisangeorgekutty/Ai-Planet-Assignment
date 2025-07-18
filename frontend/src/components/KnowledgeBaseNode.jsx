import { useState } from "react";
import { BookOpen, Eye, Settings, Upload } from "lucide-react";
import { Handle, Position } from "reactflow";
import axios from "axios";

const KnowledgeBaseNode = ({ data }) => {
    const [file, setFile] = useState(null);
    const [embeddingModel, setEmbeddingModel] = useState("gemini-gecko");
    const [apiKey, setApiKey] = useState("");
    const [showApiKey, setShowApiKey] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [context, setContext] = useState("");

    const userQuery = data?.userQuery || "Explain AI in simple terms";

    const handleProcessKnowledgeBase = async () => {
        if (!file || !apiKey || !userQuery) {
            alert("Missing file, API key or query!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("embedding_model", embeddingModel);
        formData.append("api_key", apiKey);
        formData.append("user_query", userQuery);

        setIsProcessing(true);

        try {
            const response = await axios.post("http://localhost:8000/api/knowledge-base/upload-doc/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const contextResponse = response.data?.relevant_chunks?.join(" ");
            setContext(contextResponse);
            alert("Context retrieved from knowledge base.");
            // TODO: Pass context to next node (LLMNode)
        } catch (err) {
            console.error("Error processing knowledge base:", err);
            alert("Failed to process document.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs relative border border-gray-200">
            {/* Handles */}
            <Handle type="target" position={Position.Left} className="bg-orange-500 w-2 h-2" />
            <Handle type="source" position={Position.Right} className="bg-orange-500 w-2 h-2" />

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
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />

                    <div className="flex justify-center"><span className="text-sm">Upload File </span> <Upload className="pl-3 w-6 h-6 text-green-700 cursor-pointer" /></div>
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

            {/* Process Button */}
            <button
                onClick={handleProcessKnowledgeBase}
                disabled={isProcessing}
                className={`w-full text-sm py-2 rounded-md ${isProcessing
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                    }`}
            >
                {isProcessing ? "Processing..." : "Generate Context"}
            </button>

            {/* Output context preview (optional) */}
            {context && (
                <div className="mt-4 text-xs text-gray-700 border-t pt-2">
                    <strong>Context:</strong>
                    <p className="mt-1 line-clamp-3 max-h-20 overflow-y-auto">{context}</p>
                </div>
            )}
        </div>
    );
};

export default KnowledgeBaseNode;
