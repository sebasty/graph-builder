import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Button, Stack } from '@mui/material';

const Palette = () => {
  const { addNode, removeNode, selectedNode, setSelectedNode, setConnecting, connecting } = useContext(GraphContext);

  // Handle the remove button
  const handleRemoveSelectedNode = () => {
    if (selectedNode) {
      removeNode(selectedNode.id);
      setSelectedNode(null);
    } else {
      alert('No node selected');
    }
  };

  // Handle adding a node
  const handleAddNode = (type) => {
    addNode(type);
  };

  // Toggle the connection mode
  const toggleConnectionMode = () => {
    setConnecting((prev) => !prev); // Toggle connection mode on/off
  };

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }}  // Stack vertically on small screens, horizontally on larger screens
      spacing={2} 
      sx={{ mb: 2 }}
    >
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
        disabled={!selectedNode}
      >
        Remove Selected Node
      </Button>
      <Button 
        variant="contained" 
        onClick={toggleConnectionMode}
        color={connecting ? "success" : "primary"}
      >
        {`Connect Nodes: ${connecting ? 'On' : 'Off'}`}
      </Button>
    </Stack>
  );
};

export default Palette;
