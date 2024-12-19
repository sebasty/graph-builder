// src/context/GraphContext.js
import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (type) => {
    const canvasWidth = 800;
    const canvasHeight = 500;
    const padding = 50;

    const randomX = Math.floor(Math.random() * (canvasWidth - padding * 2)) + padding;
    const randomY = Math.floor(Math.random() * (canvasHeight - padding * 2)) + padding;

    const newNode = { id: `node-${nodes.length + 1}`, type, x: randomX, y: randomY };
    setNodes([...nodes, newNode]);
  };

  const addEdge = (startNode, endNode) => {
    const newEdge = { id: `edge-${edges.length + 1}`, startNode, endNode };
    setEdges([...edges, newEdge]);
  };

  const removeNode = (nodeId) => {
    setNodes(nodes.filter((node) => node.id !== nodeId));
    setEdges(edges.filter((edge) => edge.startNode.id !== nodeId && edge.endNode.id !== nodeId));
  };

  const removeEdge = (edgeId) => {
    setEdges(edges.filter((edge) => edge.id !== edgeId));
  };

  const resetSelectedNode = () => {
    setSelectedNode(null);
  };

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        setSelectedNode,
        addNode,
        addEdge,
        removeNode,
        removeEdge,
        resetSelectedNode,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
