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
  const { product } = props;

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>New Products</Typography>
      <TableContainer className="rolesPageTable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="left">Product Name</TableCell>
              <TableCell align="left">Category Name</TableCell>
              <TableCell align="left">Cost</TableCell>
              <TableCell align="left">Description</TableCell>
              {/* <TableCell align="left">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRowsLoader rowsNum={5} colsNum={6} />  */}
            {product?.data?.data?.data.map((item, index) => (
              <TableRow>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="left">{item.product_name}</TableCell>
                <TableCell align="left">{item.categoryname}</TableCell>
                <TableCell align="left">{item.cost}</TableCell>
                <TableCell align="left">{item.description}</TableCell>

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

export default InProgressTaskTable;
