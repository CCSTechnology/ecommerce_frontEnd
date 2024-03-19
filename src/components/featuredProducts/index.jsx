import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

import { Controller, get, useFieldArray, useForm } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDebounce } from "use-debounce";
import TopBreaccrumb from "../TopBreadcrumb";
import { authEndPoints } from "../../helpers/endpoints";
import {
  featuredDataAdd,
  featuredDataDelete,
  featuredDataList,
  searchFeatureList,
} from "../../redux/api/admin/settingService";
import DeleteModal from "../deleteModal";
import { errorAlert, successAlert } from "../../helpers/globalFunctions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const [valueData, setValueData] = useState("1");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [delid, setDelId] = useState(null);
  const [delidFeature, setDelIdFeature] = useState(null);
  const [addType, setAddType] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [dataListFeature, setDataListFeature] = useState(null);
  const [deleteModalOpenFeature, setDeleteModalOpenFeature] = useState(false);
  const [open, setOpen] = useState(false);
  const [openFeature, setOpenFeature] = useState(false);
  const [homeData, setHomeData] = useState(null);
  const [searchList, setSerachList] = useState({
    cateLists: [],
  });
  const [expanded, setExpanded] = useState(false);
  const [contentData, setContentData] = useState(null);
  console.log(searchList?.data);
  console.log(dataListFeature);
  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const imageData = useSelector(
    (state) => state?.adminSetting?.settingImageView
  );

  console.log(openFeature);

  const dataFetaure = useSelector(
    (state) => state?.adminSetting?.featuredDataList
  );

  const searchFeatureData = useSelector(
    (state) => state?.adminSetting?.searchFeatureList?.data?.data
  );

  const imageUrl = import.meta.env.VITE_APP_IMG_URL;
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // cancel search
  const cancelSearch = () => {
    setSearchKey("");
  };

  //on search
  const onSearch = (e) => {
    setSearchKey(e.target.value);
  };

  const deleteDirectoryFeature = (id) => {
    setDeleteModalOpenFeature(true);
    setDelIdFeature(id);
  };

  const deleteDirectoryModalFeatureClose = () => {
    setDeleteModalOpenFeature(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFeatureClose = () => {
    setOpenFeature(false);
  };

  const handleFeatureOpen = () => {
    setOpenFeature(true);
    //  setAddType("add");
  };

  const featuredData = async () => {
    const parameters = {
      url: `${authEndPoints.setting.dataFeature}`,
    };
    try {
      const res = await dispatch(featuredDataList(parameters)).unwrap();
      setDataListFeature(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const featureSearchList = async () => {
    const parameters = {
      url: `${authEndPoints.setting.searchFeature}?search=${searchKey}`,
    };
    try {
      const res = await dispatch(searchFeatureList(parameters)).unwrap();
      console.log(res);
      setSerachList(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const delteApiFeatureFn = async () => {
    const parameters = {
      url: `${authEndPoints.setting.dataFeatureDelete(delidFeature)}`,
    };
    try {
      const response = await dispatch(featuredDataDelete(parameters)).unwrap();
      setDeleteModalOpenFeature(false);
      successAlert(response.message);
      featuredData();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const handleAddProduct = async (values) => {
    const { value } = values;

    const parameters = {
      url: `${authEndPoints.setting.dataFeatureAdd}`,
      data: { product_id: value },
    };
    try {
      const response = await dispatch(featuredDataAdd(parameters)).unwrap();
      featureSearchList();
      featuredData();
      reset();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  useEffect(() => {
    featuredData();
  }, []);

  useEffect(() => {
    featureSearchList();
  }, [searchValue]);
  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Featured Products"} to={`/admin/dashboard`} />
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <Box sx={{ my: 3 }}>
              <Stack
                direction={{ lg: "row", sm: "column" }}
                gap={2}
                alignItems={"end"}
                justifyContent={"end"}
              >
                <Stack direction={{ lg: "row", sm: "column" }} gap={2}>
                  <Button className="AddBtn" onClick={handleFeatureOpen}>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <TableContainer
              className="rolesPageTable"
              style={{ marginBottom: "30px" }}
            >
              <Table
                size="small"
                aria-label="a dense table"
                className="order-table-list"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>S.No</TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Product Image</TableCell>
                    {/* <TableCell align="left">URL</TableCell> */}
                    <TableCell align="left">Actions</TableCell>
                    {/* <TableCell align="left">Status</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataFetaure?.data?.data?.map((item, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">{item.product_name}</TableCell>

                      <TableCell align="left">
                        <img
                          src={imageUrl + item.file_name}
                          width="200px"
                        ></img>
                      </TableCell>
                      {/* <TableCell align="left"></TableCell> */}
                      <TableCell align="center">
                        <Stack
                          direction={"row"}
                          gap={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EditIcon
                            className="table-icons"
                            // onClick={() => editDirectory(item.id)}
                          />
                          <DeleteIcon
                            className="table-icons"
                            onClick={() => deleteDirectoryFeature(item.id)}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
        {/* </Stack> */}
        {/* </Box> */}

        {deleteModalOpenFeature && (
          <DeleteModal
            open={deleteModalOpenFeature}
            close={() => deleteDirectoryModalFeatureClose()}
            title={"Delete Product"}
            content={"Are you sure want to delete this Product?"}
            submit={delteApiFeatureFn}
            // loading={stateValues.deleteLoading}
          />
        )}

        {openFeature === true ? (
          <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={openFeature}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleFeatureClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box>Add Products</Box>
                <IconButton onClick={handleFeatureClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>

            <form onSubmit={handleSubmit(handleAddProduct)}>
              {/* <form onSubmit={handleSubmit(handleAddProduct)}> */}
              <Box sx={{ mx: 2 }}>
                <Grid container spacing={5} sx={{ mb: 2 }}>
                  <Grid item xs={6} direction={"column"}>
                    {/* {searchList?.data && (
                      <SelectField
                        name="value"
                        control={control}
                        label="Product Name"
                        Controller={Controller}
                        data={searchList?.data}
                        error={errors?.value?.message}
                      />
                    )} */}
                    <Controller
                      name="value" // Replace with your form field name
                      control={control}
                      defaultValue={null}
                      render={({ field }) => (
                        <Autocomplete
                          {...field}
                          disablePortal
                          id="combo-box-demo"
                          options={searchList?.data}
                          getOptionLabel={(option) => option.label}
                          onChange={(e, value) =>
                            field.onChange(value?.value || null)
                          }
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Product Name"
                              className="featured-add"
                            />
                          )}
                          className="featured-add1"
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap={5}
                  sx={{ p: 1 }}
                >
                  <LoadingButton
                    loadingPosition="center"
                    loading={isSubmitting}
                    variant="contained"
                    type="submit"
                    className="submitBtnn"
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </Box>
            </form>
          </Dialog>
        ) : null}
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
