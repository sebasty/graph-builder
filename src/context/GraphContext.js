import React, { createContext, useState, useEffect } from 'react';

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [temporaryEdge, setTemporaryEdge] = useState(null);

  // State for canvas dimensions
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth * 0.8,  // Canvas width 80% of the viewport width
    height: 500, // Fixed height or dynamic if you need to change it
  });

  // Resize handler to update canvas size when the window resizes
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth * 0.8,  // Adjust width dynamically
        height: 500,  // Optionally, you can change this too
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addNode = (type) => {
    const { width, height } = canvasSize;
    const padding = 50;  // Padding for node placement

    const randomX = Math.floor(Math.random() * (width - padding * 2)) + padding;
    const randomY = Math.floor(Math.random() * (height - padding * 2)) + padding;

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
        setEdges,
        addNode,
        addEdge,
        removeNode,
        removeEdge,
        connecting,
        setConnecting,
        temporaryEdge,
        setTemporaryEdge,
        canvasSize,  // Provide canvasSize state
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};
