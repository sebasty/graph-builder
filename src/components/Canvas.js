import React, { useContext, useState, useEffect, useRef } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Box } from '@mui/material';

const Canvas = () => {
  const { 
    nodes, edges, setNodes, setEdges, 
    setSelectedNode, removeNode, 
    connecting, setConnecting, 
    selectedNode, addEdge, temporaryEdge, setTemporaryEdge,
    canvasSize
  } = useContext(GraphContext);

  const [nodeSize, setNodeSize] = useState(50);  // Default node size
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false); 
  const [draggedNode, setDraggedNode] = useState(null); 
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Use effect to detect screen size and adjust node size for mobile
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setNodeSize(isMobile ? 25 : 50); // Half the size on mobile
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the size on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNodeClick = (node) => {
    if (connecting) {
      if (!selectedNode) {
        setSelectedNode(node);
      } else {
        addEdge(selectedNode, node);
        setSelectedNode(null);
        setConnecting(false);
        setTemporaryEdge(null);
      }
    } else {
      setSelectedNode(node);
    }
  };

  const handleNodeRightClick = (event, node) => {
    event.preventDefault();
    removeNode(node.id);
  };

  const handleMouseDown = (event, node) => {
    event.preventDefault();
    setIsDragging(true);
    setDraggedNode(node);
    setDragStartPosition({ x: event.clientX, y: event.clientY });
    setOffset({
      x: event.clientX - node.x,
      y: event.clientY - node.y,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging && draggedNode) {
      const dx = event.clientX - dragStartPosition.x;
      const dy = event.clientY - dragStartPosition.y;

      const updatedNode = { 
        ...draggedNode, 
        x: event.clientX - offset.x, 
        y: event.clientY - offset.y 
      };

      setNodes(nodes.map((node) => (node.id === draggedNode.id ? updatedNode : node)));

      setEdges(edges.map((edge) => {
        if (edge.startNode.id === draggedNode.id) {
          return { ...edge, startNode: updatedNode };
        }
        if (edge.endNode.id === draggedNode.id) {
          return { ...edge, endNode: updatedNode };
        }
        return edge;
      }));

      setDragStartPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  // Render edges
  const renderEdges = () => {
    return edges.map((edge) => {
      const startNode = edge.startNode;
      const endNode = edge.endNode;
      return (
        <line
          key={edge.id}
          x1={startNode.x}
          y1={startNode.y}
          x2={endNode.x}
          y2={endNode.y}
          stroke="black"
          strokeWidth="2"
        />
      );
    });
  };

  const renderTemporaryEdge = () => {
    if (temporaryEdge) {
      return (
        <line
          key="temporary-edge"
          x1={temporaryEdge.startNode.x}
          y1={temporaryEdge.startNode.y}
          x2={temporaryEdge.endNode.x}
          y2={temporaryEdge.endNode.y}
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="4"
        />
      );
    }
    return null;
  };

  // Use canvasSize from context for adding nodes
  const handleAddNode = (type) => {
    const { width, height } = canvasSize;
    const padding = 50;  // Padding for node placement

    const randomX = Math.floor(Math.random() * (width - padding * 2)) + padding;
    const randomY = Math.floor(Math.random() * (height - padding * 2)) + padding;

    const newNode = { id: `node-${nodes.length + 1}`, type, x: randomX, y: randomY };
    setNodes([...nodes, newNode]);
  };

  return (
    <Box
      ref={canvasRef}
      sx={{
        width: '100%',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => setConnecting(false)} 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {renderEdges()}
        {renderTemporaryEdge()}
      </svg>

      {nodes.map((node) => (
        <div
          key={node.id}
          style={{
            position: 'absolute',
            top: node.y - nodeSize / 2,
            left: node.x - nodeSize / 2,
            width: nodeSize,
            height: nodeSize,
            backgroundColor: node.type === 'circle' ? 'blue' : 'green',
            borderRadius: node.type === 'circle' ? '50%' : '0',
            cursor: 'pointer',
          }}
          onClick={() => handleNodeClick(node)}
          onContextMenu={(e) => handleNodeRightClick(e, node)}
          onMouseDown={(e) => handleMouseDown(e, node)}
        />
      ))}
    </Box>
  );
};

export default Canvas;
