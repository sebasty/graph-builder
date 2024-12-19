// src/components/Canvas.js
import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Box } from '@mui/material';

const Canvas = () => {
  const { nodes, setSelectedNode, removeNode } = useContext(GraphContext);

  // Handle clicking a node (to select it)
  const handleNodeClick = (node) => {
    setSelectedNode(node);  // Set the clicked node as selected
  };

  // Handle right-click (to remove the node)
  const handleNodeRightClick = (event, node) => {
    event.preventDefault();
    removeNode(node.id);  // Remove the node on right-click
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
      }}
    >
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
          onClick={() => handleNodeClick(node)}  // Select node on click
          onContextMenu={(e) => handleNodeRightClick(e, node)}  // Remove node on right-click
        />
      ))}
    </Box>
  );
};

export default Canvas;
