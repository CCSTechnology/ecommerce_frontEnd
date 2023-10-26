import { TableHead, TableRow, TableCell } from '@mui/material'
import { CATEGORY_HEADER, } from 'constants/tableHeader'
import React from 'react'

function TableHeader() {
    const header = CATEGORY_HEADER;
    return (
        <>
            {!!header.length && (
                <TableHead sx={{ '& th': { border: 0 } }}>
                    <TableRow className="tableHeader" sx={{ '& td': { border: 0 } }}>
                        {header.map(h => (
                            <TableCell
                                width={h.width}
                                key={h.id} >
                                {h.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            )}
        </>
    )
}

export default TableHeader