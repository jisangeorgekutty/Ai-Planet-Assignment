import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


export const useWorkflowStore = create((set, get) => ({
    userQuery: "",
    context: "",

    file: null,
    embeddingModel: "",
    kbApiKey: "",

    model: "",
    apiKey: "",
    prompt: "",
    temperature: 0.75,
    webSearch: false,
    serpApiKey: "",

    output: "",

    setUserQuery: (query) => {
        set({ userQuery: query })
        console.log("User Query set to:", query);
        // toast.success('User Query Received');
    },

    setKBInputs: ({ file, embeddingModel, apiKey, sampleContext }) => {
        set({ file, embeddingModel, kbApiKey: apiKey, context: sampleContext })
        console.log("Knowledge Base Inputs set:", { file, embeddingModel, apiKey });
    },

    callKnowledgeBaseAPI: async () => {
        const { file, embeddingModel, kbApiKey, userQuery, context } = get();
        if (!file || !embeddingModel || !kbApiKey || !userQuery) {
            toast.error('Missing required values in KB call.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('embedding_model', embeddingModel);
        formData.append('api_key', kbApiKey);
        formData.append('user_query', userQuery);
        try {
            // const response = await axios.post(
            //     'http://localhost:8000/api/knowledge-base/upload-doc/',
            //     formData,
            //     {
            //         headers: { 'Content-Type': 'multipart/form-data' },
            //     }
            // );

            // const context = response.data?.relevant_chunks?.join(' ') || '';
            // set({ context: });
            toast.success('Context Generated');
            return context;
        } catch (error) {
            console.error("Error processing knowledge base:", error);
        }
    },

    setLLMInputs: ({ model, apiKey, prompt, temperature, webSearch, serpApiKey }) => {
        set({ model, apiKey, prompt, temperature, webSearch, serpApiKey });
        console.log("LLM Inputs set:", { model, apiKey, prompt, temperature, webSearch, serpApiKey });
    },

    callLLMAPI: async () => {
        const { model, apiKey, prompt, temperature } = get();

        if (!model || !apiKey || !prompt) {
            toast.error("Missing required LLM values.");
            return;
        }

        const formData = new FormData();
        formData.append("model", model);
        formData.append("api_key", apiKey);
        formData.append("prompt", prompt);
        formData.append("temperature", temperature);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/llm/llm-model/",
                formData
            );

            const responseText = response.data?.response || "";
            set({ output: responseText });
            return responseText;
        } catch (err) {
            console.error("LLM API Error:", err);
            // toast.error("LLM API Failed");
        }
    },
}));





