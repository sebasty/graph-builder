// src/context/GraphContext.js
import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [temporaryEdge, setTemporaryEdge] = useState(null);

  const addNode = (type) => {
    const canvasWidth = 800; // Define your canvas width
    const canvasHeight = 500; // Define your canvas height
    const padding = 50; // To ensure nodes aren't too close to the edges
    
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

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        selectedNode,
        setSelectedNode,
        setNodes,
        setEdges,        // Make sure to provide setEdges here
        addNode,
        addEdge,
        removeNode,
        removeEdge,
        connecting,
        setConnecting,
        temporaryEdge,
        setTemporaryEdge,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
