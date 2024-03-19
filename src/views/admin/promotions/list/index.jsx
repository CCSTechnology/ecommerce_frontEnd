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
import AddProductForm from "../addPromotionform";

import {
  deleteProductData,
  productListData,
} from "../../../../redux/api/admin/productService";
import {
  deletePromotion,
  listPromotion,
  viewPromotion,
} from "../../../../redux/api/admin/promotionService";
import AddPromotionForm from "../addPromotionform";
import AddProductPromotionForm from "../promotionView/addProductPromotionForm";

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
  const promotionList = useSelector(
    (state) => state?.adminPromotion?.listPromotion
  );
  console.log(promotionList);
  const [directoryPage, setDirectoryPage] = useState("admin");

  const stateValues = useSelector((state) => {
    return {
      deleteLoading: state.adminProduct?.listProduct?.loading,
    };
  });
  const promotionTable = useSelector(
    (state) => state.adminPromotion.viewPromotion
  );
  console.log(promotionTable);

  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  //list api
  const promotionListApi = async () => {
    const parameters = {
      url: `${authEndPoints.promotion.list}?Perpage=10&page=${page}&search=${searchKey}`,
    };
    try {
      const res = await dispatch(listPromotion(parameters)).unwrap();
      console.log(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const viewPromotionAPi = async () => {
    const parameters = {
      url: `${authEndPoints.promotion.promotionView(1)}`,
    };
    try {
      const res = await dispatch(viewPromotion(parameters)).unwrap();
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
      url: `${authEndPoints.promotion.promotionDelete(delid)}`,
    };
    try {
      const response = await dispatch(deletePromotion(parameters)).unwrap();
      setDeleteModalOpen(false);
      successAlert(response.message);
      promotionListApi();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await promotionListApi(); // Call handleAddDirectory to add directory data
  };

  const handleChange = (event) => {
    setDirectoryPage(event.target.value);
  };

  useEffect(() => {
    promotionListApi();
  }, [page, searchValue]);
  useEffect(() => {
    viewPromotionAPi();
  }, []);
  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Promotions"} to={`/admin/dashboard`} />
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
              alignItems={"end"}
            >
              {/* <SearchInput
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
              /> */}
              <Button className="AddBtn" onClick={handleClickOpen}>
                Add New Promotion
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
          <Table
            size="small"
            aria-label="a dense table"
            className="order-table-list"
          >
            <TableHeader />
            <TableBody>
              {promotionTable?.loading ? (
                <TableRowsLoader rowsNum={10} colsNum={9} />
              ) : (
                promotionTable?.data?.data?.productdetails.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell className="product-center">{i + 1}</TableCell>
                    <TableCell className="product-center">
                      {row.products.product_name}
                    </TableCell>
                    <TableCell className="product-center">
                      {row.products.cost}
                    </TableCell>
                    <TableCell className="product-center">
                      {row.percentage}
                    </TableCell>
                    <TableCell className="product-center">
                      {row.products.promotion_cost_customer}
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction={"row"} gap={2}>
                        {/* <Link to={`/admin/promotions/${row.id}`}>
                          <VisibilityIcon
                            className="table-icons"
                            sx={{ color: "black" }}
                          />
                        </Link> */}

                        {/* <EditIcon
                          className="table-icons"
                          onClick={() => editDirectory(row.id)}
                        /> */}
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
        {promotionTable?.data?.data?.productdetails.length === 0 ? (
          <Box sx={{ my: 2 }}>
            <Typography>No Data Found</Typography>
          </Box>
        ) : (
          <TablePagination
            totalRecords={promotionTable?.data?.data?.productdetails.total}
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
                <Box> Add Product for Promotion</Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>

            <AddProductPromotionForm onClick={handleClose} />
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
}

export default ProductList;
