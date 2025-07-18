import React, { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "../components/SideBar";
import FlowCanvas from "../components/FlowCanvas";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkFlowPage = () => {
  const { stackId } = useParams();
  const [stack, setStack] = useState(null);
  console.log("Stack ID from URL:", stackId);
  useEffect(() => {
    const fetchStack = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/workflow/${stackId}`);
        setStack(res.data);
      } catch (error) {
        console.error("Failed to fetch stack:", error);
      }
    };

    fetchStack();
  }, [stackId]);

  if (!stack) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex flex-col items-center space-y-2 mt-20">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading stack, please wait...</p>
        </div>
      </div>
    );
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar onDragStart={onDragStart} stack={stack} />
        <FlowCanvas />
      </div>
    </ReactFlowProvider>
  );
};

export default WorkFlowPage;