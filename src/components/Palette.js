// src/components/Palette.js
import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Button, Stack } from '@mui/material';

const Palette = () => {
  const { addNode, removeNode, selectedNode, setSelectedNode } = useContext(GraphContext);

  // Handle the remove button
  const handleRemoveSelectedNode = () => {
    if (selectedNode) {
      removeNode(selectedNode.id); // Remove the node
      setSelectedNode(null); // Deselect the node after removal
    } else {
      alert('No node selected'); // Show an alert if no node is selected
    }
  };

  // Handle adding a node
  const handleAddNode = (type) => {
    addNode(type); // Add a new node to the graph
  };

  // Handle clicking a node to select it
  const handleNodeClick = (node) => {
    setSelectedNode(node); // Set the selected node
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Button variant="contained" onClick={() => handleAddNode('circle')}>
        Add Circle
      </Button>
      <Button variant="contained" onClick={() => handleAddNode('square')}>
        Add Square
      </Button>
      <Button 
        variant="contained" 
        color="error" 
        onClick={handleRemoveSelectedNode}
        disabled={!selectedNode}  // Disable if no node is selected
      >
        Remove Selected Node
      </Button>
    </Stack>
  );
};

export default Palette;
