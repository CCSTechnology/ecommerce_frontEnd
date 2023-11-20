import React from 'react'
import { Box, Pagination } from '@mui/material'
import './style.css'

function CardPagination({ totalRecords, handlePageChanges, page }) {
    return (
        <Box container className="footer" >
            <Pagination
                color="primary"
                shape="rounded"
                variant="outlined"
                count={totalRecords && totalRecords > 5 ? Math.ceil(totalRecords / 5) : 1}
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

export default CardPagination