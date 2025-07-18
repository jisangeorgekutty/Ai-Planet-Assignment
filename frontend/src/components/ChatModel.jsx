// src/components/ChatModal.jsx
import { X, Send, Bot, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useWorkflowStore } from "../store/useWorkflowStore";

const ChatModal = ({ onClose }) => {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { chatMessages, sendChatQuery } = useWorkflowStore();

  const handleSend = async () => {
    console.log("handleSend called");
    if (newMessage.trim()) {
      try {
        setLoading(true);
        await sendChatQuery(newMessage);
        setNewMessage("");
      } catch (err) {
        console.error("Error sending message:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[80vh] flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 text-green-700 rounded-full p-1">
              <Bot size={18} />
            </div>
            <h2 className="text-sm font-medium">GenAI Stack Chat</h2>
          </div>
          <button onClick={onClose}>
            <X size={18} className="text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-2">
              <div className="bg-green-100 text-green-600 rounded-full p-2">
                <Bot size={24} />
              </div>
              <h3 className="font-semibold">GenAI Stack Chat</h3>
              <p className="text-sm text-gray-500">Start a conversation to test your stack</p>
            </div>
          ) : (
            chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-md ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end text-right ml-auto"
                    : "bg-gray-100 self-start text-left mr-auto"
                }`}
              >
                <p className="text-sm text-black whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-white rounded-md border px-4 py-2 shadow-sm">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Send a message"
              className="flex-1 outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleSend}
              className="text-gray-500 hover:text-black ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
