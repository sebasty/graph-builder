// src/components/Canvas.js
import React, { useContext, useEffect } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Box } from '@mui/material';

const Canvas = () => {
  const { nodes, edges, setSelectedNode, removeNode, connecting, setConnecting, selectedNode, addEdge, temporaryEdge, setTemporaryEdge } = useContext(GraphContext);

  // Handle node click to select it or create an edge
  const handleNodeClick = (node) => {
    if (connecting) {
      if (!selectedNode) {
        setSelectedNode(node);  // First node selected for connection
      } else {
        addEdge(selectedNode, node); // Second node selected, create edge
        setSelectedNode(null); // Reset the selected node after creating an edge
        setConnecting(false);  // Exit connection mode
        setTemporaryEdge(null); // Reset the temporary edge after creating the connection
      }
    } else {
      setSelectedNode(node);  // Select the node normally
    }
  };

  // Handle right-click (to remove the node)
  const handleNodeRightClick = (event, node) => {
    event.preventDefault();
    removeNode(node.id);  // Remove the node on right-click
  };

  // Draw edges between nodes
  const renderEdges = () => {
    return edges.map((edge) => {
      const startNode = edge.startNode;
      const endNode = edge.endNode;

      // Calculate the line coordinates (for connecting nodes)
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

  // Render temporary edge line between selected nodes
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
          strokeDasharray="4"  // Dashed line for temporary edge
        />
      );
    }
    return null;
  };

  const nodeSize = 50;

  return (
    <Box
      sx={{
        width: '800px',
        height: '500px',
        border: '1px solid black',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => setConnecting(false)}  // Optionally close connection mode when clicking anywhere outside
    >
      {/* Render SVG container to draw lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {renderEdges()} {/* Render edges */}
        {renderTemporaryEdge()} {/* Render temporary edge if in connection mode */}
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
          onClick={() => handleNodeClick(node)}  // Select node or create edge
          onContextMenu={(e) => handleNodeRightClick(e, node)}  // Remove node on right-click
        />
      ))}
    </Box>
  );
};

export default Canvas;
