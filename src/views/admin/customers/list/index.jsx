import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../../../../components/searchInput";
import TablePagination from "../../../../components/Pagination";
import TableHeaders from "./tableHeaders";
import { authEndPoints } from "../../../../helpers/endpoints";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import { useDebounce } from "use-debounce";
import Slide from "@mui/material/Slide";
import DeleteModal from "../../../../components/deleteModal";
import TableRowsLoader from "../../../../components/TableLoader";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
// import { approvedChangeData } from "redux/api/services/approvedService";
import TopBreaccrumb from "../../../../components/TopBreadcrumb";
import {
  customerListData,
  deleteCustomerData,
} from "../../../../redux/api/admin/customerService";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Customers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const [page, setPage] = useState(1);
  const [delid, setDelId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [directoryPage, setDirectoryPage] = useState("employee");
  // const role = localStorage.getItem("roleName");
  const [addType, setAddType] = useState(null);

  //   const stateValues = useSelector((state) => {
  //     return {
  //       deleteLoading: state.adminCustomer.deleteCustomer.loading,
  //     };
  //   });

  const dataCustomer = useSelector(
    (state) => state?.adminCustomer?.listCustomer
  );
  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const handlePageChanges = (_event, pageValue) => {
    setPage(pageValue);
  };

  const handleClickOpen = () => {
    setSingleData(null);
    setOpen(true);
    setAddType("add");
  };

  const handleClose = () => {
    setOpen(false);
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

  //   const handleCheck = async (values, e) => {
  //     console.log(e);
  //     const { id, is_approved } = values;
  //     console.log(is_approved);
  //     if (is_approved === 0) {
  //       const formData = {
  //         is_approved: e.target.checked ? 1 : is_approved,
  //       };
  //       const parameters = {
  //         url: `${authEndPoints.approved.approvedData(id)}`,
  //         data: formData,
  //       };
  //       try {
  //         const response = await dispatch(
  //           approvedChangeData(parameters)
  //         ).unwrap();
  //         successAlert(response.message);
  //         customerListApi();
  //       } catch (error) {
  //         errorAlert(error.error);
  //       }
  //     }
  //   };

  //   const delteApiFn = async () => {
  //     const parameters = {
  //       url: `${authEndPoints.employee.removeEmployee(delid)}`,
  //     };
  //     try {
  //       const response = await dispatch(deleteCustomerData(parameters)).unwrap();
  //       setDeleteModalOpen(false);
  //       successAlert(response.message);
  //       customerListApi();
  //     } catch (errors) {
  //       errorAlert(errors?.error);
  //     }
  //   };

  // customerlist Api
  const customerListApi = async () => {
    const parameter = {
      url: `${authEndPoints.customer.customerList}?per_page=10&page=${page}&search=${searchKey}`,
    };
    try {
      const res = await dispatch(customerListData(parameter)).unwrap();
      console.log(res);
      setCustomerData(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await customerListApi(); // Call handleAddDirectory to add directory data
  };

  const handleChange = (event) => {
    setDirectoryPage(event.target.value);
  };

  useEffect(() => {
    customerListApi();
  }, [page, searchValue]);

  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Customers"} to={`/admin/dashboard`} />
        <Grid container spacing={0}>
          <Grid item xs={12}>
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
                  <Button className="AddBtn" onClick={handleClickOpen}>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <TableContainer className="rolesPageTable">
              <Table>
                <TableHeaders />

                <TableBody>
                  {dataCustomer?.loading ? (
                    <TableRowsLoader rowsNum={10} colsNum={10} />
                  ) : (
                    dataCustomer?.data?.data?.data?.map((item, i) => (
                      <TableRow key={item.id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.first_name}</TableCell>
                        <TableCell>{item.last_name}</TableCell>
                        <TableCell sx={{ textTransform: "lowercase" }}>
                          {item.email}
                        </TableCell>
                        <TableCell>+61{item.mobile}</TableCell>

                        <TableCell align="center">
                          <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                            label=""
                            checked={item.is_approved}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction={"row"} gap={2}>
                            <Link to={`/admin/customers/${item.id}`}>
                              <VisibilityIcon
                                className="table-icons"
                                sx={{ color: "black" }}
                              />
                            </Link>
                            <DeleteIcon
                              className="table-icons"
                              onClick={() => deleteDirectory(item.id)}
                            />
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {dataCustomer?.data?.data?.data?.length === 0 ? (
              <Box sx={{ my: 2 }}>
                <Typography>No Data Found</Typography>
              </Box>
            ) : (
              <TablePagination
                totalRecords={dataCustomer?.data?.data?.total}
                handlePageChanges={handlePageChanges}
                page={page}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Customers;
// onChange={(e) => handleCheck(item, e)}
