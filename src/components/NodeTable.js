// src/components/NodeTable.js
import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const NodeTable = () => {
  const { selectedNode } = useContext(GraphContext);

  if (!selectedNode) return <p>Select a node to see details.</p>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Property</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>X Coordinate</TableCell>
          <TableCell>{selectedNode.x}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Y Coordinate</TableCell>
          <TableCell>{selectedNode.y}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>{selectedNode.type}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default NodeTable;
