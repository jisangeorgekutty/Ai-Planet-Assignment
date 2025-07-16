import { X, Send, Bot } from "lucide-react";
import React from "react";

const ChatModal = ({ onClose }) => {
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

        {/* Empty Chat Body */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-green-100 text-green-600 rounded-full p-2">
              <Bot size={24} />
            </div>
            <h3 className="font-semibold">GenAI Stack Chat</h3>
            <p className="text-sm text-gray-500">Start a conversation to test your stack</p>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center bg-white rounded-md border px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Send a message"
              className="flex-1 outline-none text-sm"
            />
            <button className="text-gray-500 hover:text-black">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
