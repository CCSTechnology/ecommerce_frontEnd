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
  Badge,
} from "@mui/material";
import TableRowsLoader from "../../../components/TableLoader";
import { Link } from "react-router-dom";

const CompleteTaskTable = (props) => {
  const { tableData, loading, orderList } = props;
  console.log(orderList);

  return (
    <Box>
      <Typography sx={{ mb: 2 }}>New Orders</Typography>
      <TableContainer className="rolesPageTable">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="left">Order No</TableCell>
              <TableCell align="left">Invoice No</TableCell>
              <TableCell align="left">Customer Name</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Order Status</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              {/* <TableCell align="left">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRowsLoader rowsNum={5} colsNum={6} /> */}
            {orderList?.data?.data?.data
              ?.filter((row) => row.paid_status === "Paid")
              ?.slice(0, 5)
              ?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell sx={{ background: "white" }}>
                    <Link
                      to={`/admin/orders/${row.id}`}
                      style={{
                        background: "white",
                        color: "#951e76",
                        textDecoration: "underline",
                      }}
                    >
                      {row?.order_no}
                    </Link>
                  </TableCell>

                  <TableCell>{row?.invoice_no}</TableCell>
                  {/* <TableCell>{row?.guest?.name}</TableCell> */}
                  <TableCell>
                    {row?.guest?.name ?? (row?.customer_id && row?.customer_id)}
                  </TableCell>
                  <TableCell>{row?.amount}</TableCell>

                  <TableCell>
                    <Badge
                      className={
                        row.status == "Pending"
                          ? "pending"
                          : row.status == "Completed"
                          ? "completed"
                          : "cancelled "
                      }
                    >
                      {row?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        row.paid_status == "Unpaid"
                          ? "cancelled"
                          : row.paid_status == "Paid"
                          ? "completed"
                          : "pending"
                      }
                    >
                      {row?.paid_status}
                    </Badge>
                  </TableCell>
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

export default CompleteTaskTable;
