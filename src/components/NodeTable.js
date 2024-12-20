import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Box } from '@mui/material';

const NodeTable = () => {
  const { selectedNode } = useContext(GraphContext);

  return (
    <Box sx={{ minHeight: '200px' }}> {/* Ensure a minimum height to prevent layout shift */}
      {!selectedNode ? (
        <p>Select a node to see details.</p>
      ) : (
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ width: '100%' }}>
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
        </TableContainer>
      )}
    </Box>
  );
};

export default NodeTable;
