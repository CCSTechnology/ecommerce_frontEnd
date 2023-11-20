import React from 'react';
import { Box, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import TableHeader from 'views/pages/forms/tableHeader';

function PermissionCardLoader({ rowsNum, colsNum }) {
  return < TableRow >

    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />


  </ TableRow >;


}

export default PermissionCardLoader;
