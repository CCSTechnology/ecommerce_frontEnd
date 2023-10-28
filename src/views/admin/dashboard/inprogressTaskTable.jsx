import React from "react";
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
} from "@mui/material";
import TableRowsLoader from "../../../components/TableLoader";

const InProgressTaskTable = (props) => {
  const { tableData, loading } = props;

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>New Products</Typography>
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
            {/* <TableRowsLoader rowsNum={5} colsNum={6} />  */}

            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              {/* <TableCell align="left">{data.status}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Box sx={{ my: 2 }}>
                    <Typography>No data found</Typography>
                </Box>
             */}
    </Box>
  );
};

export default InProgressTaskTable;
