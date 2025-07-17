import React from "react";
import {
  FileInput,
  BookOpen,
  Sparkles,
  Globe,
  Menu,
  FolderPen,
  FileOutput
} from "lucide-react";


const SideBar = ({ onDragStart ,stack}) => (
 <aside className="w-64 bg-[#f9f9fb] p-4 border-r hidden md:block">
    <div
      className="flex items-center justify-between border border-gray-300 rounded px-2 py-1.5 text-sm cursor-move backdrop-blur-md bg-white/60 mb-4"
      draggable
      onDragStart={(e) => onDragStart(e, "chatHeader")}
    >
      <div className="flex items-center gap-2 text-gray-500 text-center">
        <span className="text-black ml-6 font-semibold">{stack.name}</span>
      </div>
      <FolderPen size={16} className="text-black font-semibold" />
    </div>

    <p className="text-xs font-medium text-black mb-3">Components</p>

    <div className="space-y-2">
      <div
        className="flex items-center justify-between border border-gray-300 rounded px-2 py-1.5 bg-white text-sm cursor-move"
        draggable
        onDragStart={(e) => onDragStart(e, "userQuery")}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <FileInput size={16} />
          <span className="text-black">User Query</span>
        </div>
        <Menu size={16} className="text-gray-400" />
      </div>

      <div
        className="flex items-center justify-between border border-gray-300 rounded px-2 py-1.5 bg-white text-sm cursor-move"
        draggable
        onDragStart={(e) => onDragStart(e, "llmNode")}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <Sparkles size={16} />
          <span className="text-black">LLM (OpenAI)</span>
        </div>
        <Menu size={16} className="text-gray-400" />
      </div>

      <div
        className="flex items-center justify-between border border-gray-300 rounded px-2 py-1.5 bg-white text-sm cursor-move"
        draggable
        onDragStart={(e) => onDragStart(e, "knowledgeBase")}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <BookOpen size={16} />
          <span className="text-black">Knowledge Base</span>
        </div>
        <Menu size={16} className="text-gray-400" />
      </div>

      <div
        className="flex items-center justify-between border border-gray-300 rounded px-2 py-1.5 bg-white text-sm cursor-move"
        draggable
        onDragStart={(e) => onDragStart(e, "outputNode")}
      >
        <div className="flex items-center gap-2 text-gray-500">
          <FileOutput size={16} />
          <span className="text-black">Output</span>
        </div>
        <Menu size={16} className="text-gray-400" />
      </div>
    </div>
  </aside>
);

export default SideBar;