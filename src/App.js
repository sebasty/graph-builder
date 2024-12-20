import React, { useState } from 'react';
import { Container } from '@mui/material';
import Palette from './components/Palette';
import Canvas from './components/Canvas';
import NodeTable from './components/NodeTable';

const App = () => {
  const [nodeType, setNodeType] = useState('circle');

  return (
    <Container>
      <Palette setNodeType={setNodeType} />
      <Canvas />
      <NodeTable />
    </Container>
  );
};

export default App;
