import React from 'react'
import { Box, Pagination } from '@mui/material'
import './style.css'

function TablePagination({ totalRecords, handlePageChanges, page }) {
    return (
        <Box container className="footer" >
            <Pagination
                color="primary"
                shape="rounded"
                variant="outlined"
                count={totalRecords && totalRecords > 10 ? Math.ceil(totalRecords / 10) : 1}
                page={page}
                onChange={handlePageChanges}
                showFirstButton
                showLastButton
                siblingCount={2}
                boundaryCount={2}
                data-testid="paginationItem"
            />
        </Box>
    )
}

export default TablePagination