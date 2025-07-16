import React from "react";
import { ReactFlowProvider } from "reactflow";
import Sidebar from "../components/SideBar";
import FlowCanvas from "../components/FlowCanvas";

const WorkFlowPage = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <ReactFlowProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar onDragStart={onDragStart} />
        <FlowCanvas />
      </div>
    </ReactFlowProvider>
  );
};

export default WorkFlowPage;