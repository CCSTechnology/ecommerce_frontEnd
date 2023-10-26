import React from "react";
import { Box, Table, TableContainer, TableBody, TableRow, TableCell, TableHead, Typography } from "@mui/material";
import TableRowsLoader from 'components/TableLoader'

const CompleteTaskTable = (props) => {

    const { tableData, loading } = props

    return (
        <Box>
            <Typography sx={{ mb: 2 }}>Completed Task</Typography>
            <TableContainer className="rolesPageTable">
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Job</TableCell>
                            <TableCell align="left">Task Location</TableCell>
                            <TableCell align="left">Assignee</TableCell>
                            <TableCell align="left">Job Type</TableCell>
                            {/* <TableCell align="left">Status</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {loading ?
                            (<TableRowsLoader rowsNum={5} colsNum={6} />) : (
                                tableData?.completed?.map((data, i) => (
                                    <TableRow key={data.id}>

                                        <TableCell align="left">{i + 1}</TableCell>
                                        <TableCell align="left">{data.name}</TableCell>
                                        <TableCell align="left">{data.address}</TableCell>
                                        <TableCell align="left">{data.user_name}</TableCell>
                                        <TableCell align="left">{data.type === "recurring" ? "Task" : "Quick Job"}</TableCell>
                                        {/* <TableCell align="left">{data.status}</TableCell> */}
                                    </TableRow>
                                )
                                )
                            )}


                    </TableBody>
                </Table>
            </TableContainer>
            {tableData?.completed?.length === 0 &&
                <Box sx={{ my: 2 }}>
                    <Typography>No data found</Typography>
                </Box>
            }
        </Box>
    );
};

export default CompleteTaskTable;
