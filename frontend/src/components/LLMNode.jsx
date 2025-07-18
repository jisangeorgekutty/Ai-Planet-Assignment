import { useState, useEffect } from "react";
import { Sparkles, Eye, Settings } from "lucide-react";
import { Handle, Position } from "reactflow";
import { useWorkflowStore } from "../store/useWorkflowStore";

const LLMNode = () => {
    const [model, setModel] = useState("Gemini-flash-");
    const [apiKey, setApiKey] = useState("");
    const [prompt, setPrompt] = useState("");
    const [webSearch, setWebSearch] = useState(true);
    const [serpApiKey, setSerpApiKey] = useState("");
    const [showAPIKey, setShowAPIKey] = useState(false);
    const [showSerpKey, setShowSerpKey] = useState(false);
    const [temperature, setTemperature] = useState(0.75);
    const { context, userQuery, setLLMInputs } = useWorkflowStore();


    useEffect(() => {
        const promptPrefix = "You are an intelligent assistant specialized in analyzing PDF documents.Instructions:1. Use the provided CONTEXT from the uploaded PDF to answer the user query.2. If the CONTEXT is insufficient or does not contain relevant information, optionally use web search to enhance your response.Response just in a few 3 lines.";
        const promptBody = context?.trim() ? `CONTEXT:\n${context}\n\nUSER QUERY:\n${userQuery}` : `NOTE: No context provided.\n\nUSER QUERY:\n${userQuery}`;
        setPrompt(`${promptPrefix}${promptBody}`);
    }, [context, userQuery]);

    useEffect(() => {
        if (model && apiKey && prompt) {
            setLLMInputs({
                model,
                apiKey,
                prompt,
                temperature: parseFloat(temperature),
                webSearch,
                serpApiKey,
            });
        }
    }, [model, apiKey, prompt, temperature, webSearch, serpApiKey]);


    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-xs relative border border-gray-200">
            {/* React Flow Handles */}
            <Handle type="target" position={Position.Top} style={{ background: "#3B82F6", width: 8, height: 8 }} />
            <Handle type="source" position={Position.Bottom} style={{ background: "#3B82F6", width: 8, height: 8 }} />

            {/* Header */}

            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-gray-700 w-4 h-4" />
                    <h2 className="text-sm font-semibold">LLM</h2>
                </div>
                <div className="text-gray-500">
                    <Settings className="w-4 h-4 text-black cursor-pointer" />
                </div>
            </div>
            <div className="bg-blue-100 text-black text-xs font-medium px-2 py-1 rounded mb-3">
                Run a query with OpenAI / Gemini LLM
            </div>

            {/* Model Dropdown */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">Model</label>
            <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="mb-3 w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                <option value="GPT 4o- Mini">GPT 4o- Mini</option>
                <option value="Gemini-flash">Gemini-1.5-flash</option>
                <option value="GPT-4">GPT-4</option>
                <option value="GPT-3.5-Turbo">GPT-3.5-Turbo</option>
            </select>

            {/* API Key */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">API Key</label>
            <div className="relative mb-3">
                <input
                    type={showAPIKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="API Key"
                    className="w-full border border-gray-300 rounded p-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <Eye
                    className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                    onClick={() => setShowAPIKey(!showAPIKey)}
                />
            </div>

            {/* Prompt Box */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">Prompt</label>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-3 w-full border border-gray-300 rounded p-2 text-sm resize-none h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Temperature */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">Temperature</label>
            <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="mb-3 w-full border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="0.75"
            />

            {/* WebSearch Toggle */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">WebSearch Tool</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={webSearch}
                        onChange={() => setWebSearch(!webSearch)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-all"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full peer-checked:translate-x-5 transition-all"></div>
                </label>
            </div>

            {webSearch && (
                <>
                    <hr className="my-3 border-t border-gray-200" />
                    <label className="text-sm font-medium text-gray-700 mb-1 block">SerpAPI Key</label>
                    <div className="relative mb-2">
                        <input
                            type={showSerpKey ? "text" : "password"}
                            value={serpApiKey}
                            onChange={(e) => setSerpApiKey(e.target.value)}
                            placeholder="***************"
                            className="w-full border border-gray-300 rounded p-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <Eye
                            className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                            onClick={() => setShowSerpKey(!showSerpKey)}
                        />
                    </div>
                </>
            )}

            {/* Output label (non-editable footer text style) */}
            <div className="text-xs text-black mt-1 justify-center text-center">Output</div>
        </div>
    );
};

export default LLMNode;
