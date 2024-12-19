import React, { useContext, useState, useEffect } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Box } from '@mui/material';

const Canvas = () => {
  const { 
    nodes, edges, setNodes, setEdges, 
    setSelectedNode, removeNode, 
    connecting, setConnecting, 
    selectedNode, addEdge, temporaryEdge, setTemporaryEdge 
  } = useContext(GraphContext);

  const [isDragging, setIsDragging] = useState(false); 
  const [draggedNode, setDraggedNode] = useState(null); 
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // Track the offset between mouse click and node position

  const nodeSize = 50;

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

  // Handle mouse down event for dragging
  const handleMouseDown = (event, node) => {
    // Prevent text selection or other default behavior during drag
    event.preventDefault();

    // Set dragging state and initialize offset
    setIsDragging(true);
    setDraggedNode(node);
    setDragStartPosition({ x: event.clientX, y: event.clientY });

    // Set offset between mouse click and the top-left corner of the node
    setOffset({
      x: event.clientX - node.x,
      y: event.clientY - node.y,
    });
  };

  // Handle mouse move for dragging logic
  const handleMouseMove = (event) => {
    if (isDragging && draggedNode) {
      // Calculate the new position based on mouse movement and offset
      const dx = event.clientX - dragStartPosition.x;
      const dy = event.clientY - dragStartPosition.y;

      // Update the node's position smoothly by adding the offset to current mouse position
      const updatedNode = { 
        ...draggedNode, 
        x: event.clientX - offset.x, 
        y: event.clientY - offset.y 
      };

      // Update the nodes in the state
      setNodes(nodes.map((node) => (node.id === draggedNode.id ? updatedNode : node)));

      // Update the edges that connect to this node
      setEdges(edges.map((edge) => {
        if (edge.startNode.id === draggedNode.id) {
          return { ...edge, startNode: updatedNode };
        }
        if (edge.endNode.id === draggedNode.id) {
          return { ...edge, endNode: updatedNode };
        }
        return edge;
      }));

      // Update the starting point for the next mouse move
      setDragStartPosition({ x: event.clientX, y: event.clientY });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  // Render edges between nodes
  const renderEdges = () => {
    return edges.map((edge) => {
      const startNode = edge.startNode;
      const endNode = edge.endNode;

      const x1 = startNode.x;
      const y1 = startNode.y;
      const x2 = endNode.x;
      const y2 = endNode.y;

      return (
        <line
          key={edge.id}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="2"
        />
      );
    });
  };

  const renderTemporaryEdge = () => {
    if (temporaryEdge) {
      const x1 = temporaryEdge.startNode.x;
      const y1 = temporaryEdge.startNode.y;
      const x2 = temporaryEdge.endNode.x;
      const y2 = temporaryEdge.endNode.y;

      return (
        <line
          key="temporary-edge"
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="4"
        />
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        width: '800px',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden',
      }}
      onClick={() => setConnecting(false)}  // Stop connection mode on canvas click
      onMouseMove={handleMouseMove} // Track mouse movement for drag
      onMouseUp={handleMouseUp} // End dragging when mouse is released
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
          onMouseDown={(e) => handleMouseDown(e, node)} // Allow dragging when mouse is pressed down
        />
      ))}
    </Box>
  );
};

export default Canvas;
