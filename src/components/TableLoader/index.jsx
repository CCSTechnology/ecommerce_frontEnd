import { TableRow, TableCell, Skeleton } from '@mui/material';
import React from 'react'

function TableRowsLoader({ rowsNum, colsNum }) {
    return [...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
            {
                [...Array(colsNum)].map((row) => (
                    <TableCell component="th" scope="row" sx={{ bgcolor: 'white' }}>
                        <Skeleton animation="wave" variant="text" />
                    </TableCell>
                ))
            }
        </TableRow>
    ));
}

export default TableRowsLoader