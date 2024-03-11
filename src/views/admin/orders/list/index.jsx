/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Button,
  Dialog,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import TableRowsLoader from "../../../../components/TableLoader";
import TableHeader from "./tableHeader";
import SearchInput from "../../../../components/searchInput";
import { useDebounce } from "use-debounce";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "../../../../components/Pagination";
import DeleteModal from "../../../../components/deleteModal";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  deleteProductData,
  productListData,
} from "../../../../redux/api/admin/productService";
import {
  downLoadOrderData,
  orderListData,
} from "../../../../redux/api/admin/orderService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// export const handlePdfDownload = (blob, filename, type) => {
//   const url = window.URL.createObjectURL(blob);
//   if (type === "download") {
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename; // Specify the filename here
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     console.log("Success");
//   } else {
//     // const url = window.URL.createObjectURL(blob);

//     window.open(url, "_blank");

//     window.URL.revokeObjectURL(url);
//   }
// };

export const handlePdfDownload = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename; // Specify the filename here
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  console.log("Success");
};

export const handleViewDownload = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);

  window.open(url, "_blank");

  window.URL.revokeObjectURL(url);
};

function OrdersList() {
  const [open, setOpen] = React.useState(false);
  const [delid, setDelId] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [addType, setAddType] = useState(null);
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state?.adminOrder?.listOrder);
  const [directoryPage, setDirectoryPage] = useState("admin");
  console.log(orderList);
  const stateValues = useSelector((state) => {
    return {
      deleteLoading: state.adminProduct?.listProduct?.loading,
    };
  });

  const apiUrl = import.meta.env.VITE_APP_MAIN_URL;

  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  //list api
  const orderListApi = async () => {
    const parameters = {
      url: `${authEndPoints.order.list}`,
    };
    try {
      const res = await dispatch(orderListData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const downloadPdfApi = async (type) => {
    const parameters = {
      url: `${authEndPoints.order.download}`,
    };
    try {
      const blob = await dispatch(downLoadOrderData(parameters)).unwrap();
      console.log(blob);
      if (type === "download") {
        handlePdfDownload(blob, "Invoice.pdf");
      } else {
        handleViewDownload(blob, "Invoice.pdf");
      }
      // handleViewDownload(blob, "Invoice.pdf");
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handlePageChanges = (_event, pageValue) => {
    setPage(pageValue);
  };

  const handleClickOpen = () => {
    setSingleData(null);
    setOpen(true);
    setAddType("add");
  };

  const deleteDirectory = (id) => {
    setDelId(id);
    setDeleteModalOpen(true);
  };

  const editDirectory = (row) => {
    setSingleData(row);
    setOpen(true);
    setAddType("edit");
  };

  const deleteDirectoryModalClose = () => {
    setDeleteModalOpen(false);
  };

  const delteApiFn = async () => {
    const parameters = {
      url: `${authEndPoints.product.deleteProductList(delid)}`,
    };
    try {
      const response = await dispatch(deleteProductData(parameters)).unwrap();
      setDeleteModalOpen(false);
      successAlert(response.message);
      productsListApi();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // const handleDownloadClick = (id) => {
  //   // Construct the URL
  //   const url = apiUrl + `/createpdf/${id}`;

  //   // Open a new tab or window with the URL
  //   window.open(url, "_blank");
  // };

  useEffect(() => {
    orderListApi();
  }, []);

  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Orders"} to={`/admin/dashboard`} />
        <Box sx={{ my: 3 }}>
          <Stack
            direction={{ lg: "row", sm: "column" }}
            gap={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={{ lg: "row", sm: "column" }}
              gap={2}
              alignItems={"center"}
            >
              <SearchInput
                sx={{
                  border: "1px solid #303067",
                  borderRadius: "20px",
                  height: "32.69px",
                  "&.Mui-focused ": {
                    border: "1px solid #6473ff",
                  },
                  width: { xs: "100%", sm: "340px" },
                }}
                value={searchKey || ""}
                onChange={(e) => onSearch(e)}
                cancelSearch={cancelSearch}
              />
            </Stack>
          </Stack>
        </Box>
        <TableContainer className="rolesPageTable">
          <Table>
            <TableHeader />
            <TableBody>
              {orderList?.loading ? (
                <TableRowsLoader rowsNum={10} colsNum={9} />
              ) : (
                orderList?.data?.data?.data?.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row?.date}</TableCell>
                    <TableCell>{row?.order_no}</TableCell>
                    <TableCell>{row?.invoice_no}</TableCell>
                    <TableCell>{row?.customer?.first_name}</TableCell>
                    <TableCell>{row?.amount}</TableCell>
                    <TableCell>{row?.total_tax}</TableCell>
                    <TableCell>{row?.total_weight}</TableCell>
                    <TableCell>{row?.courier_name}</TableCell>
                    <TableCell>{row?.shipping_cost}</TableCell>
                    <TableCell>{row?.grand_total}</TableCell>
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
                    <TableCell align="center">
                      <Stack direction={"row"} gap={2}>
                        <VisibilityIcon
                          className="table-icons"
                          sx={{ color: "black" }}
                          onClick={() => downloadPdfApi("view")}
                        />

                        <FileDownloadIcon
                          className="table-icons"
                          onClick={() => downloadPdfApi("download")}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default OrdersList;
