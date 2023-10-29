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
// import TableRowsLoader from "components/TableLoader";

const UpComingTaskTable = (props) => {
  const { customer } = props;

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>New Customers</Typography>
      <TableContainer className="rolesPageTable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Mobile</TableCell>
              {/* <TableCell align="left">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRowsLoader rowsNum={5} colsNum={6} /> */}
            {customer?.data?.data?.data.map((item, index) => (
              <TableRow>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{item.first_name}</TableCell>
                <TableCell align="left">{item.last_name}</TableCell>
                <TableCell align="left">{item.email}</TableCell>
                <TableCell align="left">{item.mobile}</TableCell>
                {/* <TableCell align="left">{data.status}</TableCell> */}
              </TableRow>
            ))}
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

export default UpComingTaskTable;
