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
import AddProductForm from "../addProductform";
import {
  deleteProductData,
  productListData,
} from "../../../../redux/api/admin/productService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductList() {
  const [open, setOpen] = React.useState(false);
  const [delid, setDelId] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const [page, setPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [addType, setAddType] = useState(null);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state?.adminProduct?.listProduct);
  const [directoryPage, setDirectoryPage] = useState("admin");

  const stateValues = useSelector((state) => {
    return {
      deleteLoading: state.adminProduct?.listProduct?.loading,
    };
  });

  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  //list api
  const productsListApi = async () => {
    const parameters = {
      url: `${authEndPoints.product.list}?Perpage=10&page=${page}`,
    };
    try {
      const res = await dispatch(productListData(parameters)).unwrap();
      console.log(res);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await productsListApi(); // Call handleAddDirectory to add directory data
  };

  const handleChange = (event) => {
    setDirectoryPage(event.target.value);
  };

  useEffect(() => {
    productsListApi();
  }, [page, searchValue]);

  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Products"} to={`/admin/dashboard`} />
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
            {/* <FormControl size="small" className="directorySelect">
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={directoryPage}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'employee'}>Employee</MenuItem>
                                </Select>
                            </FormControl> */}
          </Stack>
        </Box>
        <TableContainer className="rolesPageTable">
          <Table>
            <TableHeader />
            <TableBody>
              {productList?.loading ? (
                <TableRowsLoader rowsNum={10} colsNum={9} />
              ) : (
                productList?.data?.data?.data?.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.categoryname}</TableCell>
                    <TableCell>{row.cost}</TableCell>
                    <TableCell align="center">
                      <Stack direction={"row"} gap={2}>
                        <Link to={`/admin/products/${row.unique_label}`}>
                          <VisibilityIcon
                            className="table-icons"
                            sx={{ color: "black" }}
                          />
                        </Link>

                        <EditIcon
                          className="table-icons"
                          onClick={() => editDirectory(row.unique_label)}
                        />
                        <DeleteIcon
                          className="table-icons"
                          onClick={() => deleteDirectory(row.id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {productList?.data?.data?.data?.length === 0 ? (
          <Box sx={{ my: 2 }}>
            <Typography>No Data Found</Typography>
          </Box>
        ) : (
          <TablePagination
            totalRecords={productList?.data?.data?.total}
            handlePageChanges={handlePageChanges}
            page={page}
          />
        )}
        {deleteModalOpen && (
          <DeleteModal
            open={deleteModalOpen}
            close={() => deleteDirectoryModalClose()}
            title={"Delete Product"}
            content={"Are you sure want to delete this Product?"}
            submit={delteApiFn}
            loading={stateValues.deleteLoading}
          />
        )}

        {open === true ? (
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box> {singleData ? "Edit Product" : "Add Product"}</Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>

            <AddProductForm
              onClick={handleButtonClick}
              initialData={singleData}
              type={addType}
            />
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
}

export default ProductList;
