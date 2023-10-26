import { TableCell, TableRow, TableHead } from '@mui/material'
import React from 'react'
import { EMPLOYEES_HEADER } from "constants/tableHeader"

const TableHeaders = () => {
  const header = EMPLOYEES_HEADER;
  return (
    <>
      {!!header.length && (
        <TableHead sx={{ '& th': { border: 0 } }}>
          <TableRow className="tableHeader" sx={{ '& td': { border: 0 } }}>
            {
              header.map(item => (
                <TableCell key={item.id} width={item.width}>
                  {item.label}
                </TableCell>
              ))
            }

          </TableRow>
        </TableHead>
      )}
    </>
  )
}

export default TableHeaders