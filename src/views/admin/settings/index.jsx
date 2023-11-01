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
  Typography,
} from "@mui/material";
import SearchInput from "../../../components/searchInput";
import TopBreaccrumb from "../../../components/TopBreadcrumb";
import React, { useEffect, useRef, useState } from "react";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import MultipleImageUpload from "../../../components/reusableFormFields/multipleImageUpload";

import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import ImageUploadComponent from "../../../components/reusableFormFields/ImageUpload";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { authEndPoints } from "../../../helpers/endpoints";

import {
  ContentViewAboutus,
  featuredDataAdd,
  featuredDataDelete,
  featuredDataList,
  searchFeatureList,
  settingImageAdd,
  settingImageDelete,
  settingImageView,
} from "../../../redux/api/admin/settingService";
import { errorAlert, successAlert } from "../../../helpers/globalFunctions";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../../../components/reusableFormFields/selectField";
import TextFormField from "../../../components/reusableFormFields/TextField";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../../../components/deleteModal";
import SettingForm from "./addImageform";
import Editor from "../../../components/editor";
import EditorField from "../../../components/editor";
import EditorForm from "./editiorForm";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Settings() {
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
  console.log(contentData);
  const imageData = useSelector(
    (state) => state?.adminSetting?.settingImageView
  );

  const dataFetaure = useSelector(
    (state) => state?.adminSetting?.featuredDataList
  );

  const searchFeatureData = useSelector(
    (state) => state?.adminSetting?.searchFeatureList?.data?.data
  );

  const imageUrl = process.env.REACT_APP_IMG_URL;
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

  const handleExpand = (row) => {
    setHomeData(row);
    setExpanded(!expanded);
  };

  const handleChange = (event, newValue) => {
    setValueData(newValue);
  };

  const editDirectory = (row) => {
    setOpen(true);
    setAddType("edit");
    setSingleData(row);
  };

  const deleteDirectory = (id) => {
    setDeleteModalOpen(true);
    setDelId(id);
  };

  const deleteDirectoryModalClose = () => {
    setDeleteModalOpen(false);
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
  const handleClickOpen = () => {
    setOpen(true);
    setAddType("add");
  };

  const handleFeatureOpen = () => {
    setOpenFeature(true);
    //  setAddType("add");
  };

  const settingImageDataView = async () => {
    const parameters = {
      url: `${authEndPoints.setting.imageSetting}`,
    };
    try {
      const res = await dispatch(settingImageView(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
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
      url: `${authEndPoints.setting.searchFeature}`,
    };
    try {
      const res = await dispatch(searchFeatureList(parameters)).unwrap();
      setSerachList(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  const delteApiFn = async () => {
    const parameters = {
      url: `${authEndPoints.setting.imageSettingDelete(delid)}`,
    };
    try {
      const response = await dispatch(settingImageDelete(parameters)).unwrap();
      setDeleteModalOpen(false);
      successAlert(response.message);
      settingImageDataView();
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
  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await settingImageDataView(); // Call handleAddDirectory to add directory data
  };

  const handleAddProduct = async (values) => {
    const { value } = values;

    const parameters = {
      url: `${authEndPoints.setting.dataFeatureAdd}`,
      data: { product_id: value },
    };
    try {
      const response = await dispatch(featuredDataAdd(parameters)).unwrap();
      featuredData();
      featureSearchList();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const contentView = async () => {
    const parameters = {
      url: `${authEndPoints.setting.viewContent(homeData)}`,
    };
    try {
      const res = await dispatch(ContentViewAboutus(parameters)).unwrap();
      setContentData(res);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  useEffect(() => {
    if (homeData) {
      contentView();
    }
  }, [homeData]);

  useEffect(() => {
    settingImageDataView();
    featuredData();
    featureSearchList();
  }, []);
  return (
    <Box>
      <Box className="indexBox">
        <TopBreaccrumb title={"Settings"} to={`/admin/dashboard`} />
        <Stack
          direction={{ lg: "row", sm: "column" }}
          gap={2}
          alignItems={"center"}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={valueData}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Upload Images"
                    value="1"
                    sx={{ color: "#951e76" }}
                  />
                  <Tab
                    label="About Us content Upload"
                    value="2"
                    sx={{ color: "#951e76" }}
                  />
                  <Tab
                    label="Featured Products"
                    value="3"
                    sx={{ color: "#951e76" }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ my: 3 }}>
                  <Stack
                    direction={{ lg: "row", sm: "column" }}
                    gap={2}
                    alignItems={"end"}
                    justifyContent={"end"}
                  >
                    <Stack direction={{ lg: "row", sm: "column" }} gap={2}>
                      <Button className="AddBtn" onClick={handleClickOpen}>
                        Add
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
                <TableContainer className="rolesPageTable">
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>S.No</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="left">URL</TableCell>
                        <TableCell align="left">Actions</TableCell>
                        {/* <TableCell align="left">Status</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {imageData?.data?.data?.map((item, index) => (
                        <TableRow>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{item.type}</TableCell>
                          <TableCell align="left">
                            <img
                              src={imageUrl + item.image}
                              width="200px"
                            ></img>
                          </TableCell>
                          <TableCell align="left">{item.url}</TableCell>
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
                                onClick={() => editDirectory(item.id)}
                              />
                              <DeleteIcon
                                className="table-icons"
                                onClick={() => deleteDirectory(item.id)}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value="2">
                <Box sx={{ my: 3 }}>
                  <Stack direction={{ lg: "row", sm: "column" }} gap={2}>
                    <Stack direction={{ lg: "row", sm: "column" }} gap={8}>
                      <Grid md={4}>
                        <Button
                          className="AddBtn"
                          onClick={() => handleExpand("product")}
                        >
                          Products
                        </Button>
                      </Grid>
                      <Grid md={4}>
                        <Button
                          className="AddBtn"
                          onClick={() => handleExpand("category")}
                        >
                          Categories
                        </Button>
                      </Grid>
                      <Grid md={4}>
                        <Button
                          className="AddBtn"
                          onClick={() => handleExpand("about")}
                        >
                          Contents
                        </Button>
                      </Grid>
                    </Stack>
                  </Stack>
                </Box>
                {expanded && <EditorForm contentHome={contentData} />}
              </TabPanel>
              <TabPanel value="3">
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
                <TableContainer className="rolesPageTable">
                  <Table aria-label="simple table">
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
                          <TableCell align="left">
                            {item.product_name}
                          </TableCell>

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
              </TabPanel>
            </TabContext>
          </Box>
        </Stack>
        {/* </Stack> */}
        {/* </Box> */}
        {deleteModalOpen && (
          <DeleteModal
            open={deleteModalOpen}
            close={() => deleteDirectoryModalClose()}
            title={"Delete Product"}
            content={"Are you sure want to delete this Image?"}
            submit={delteApiFn}
            // loading={stateValues.deleteLoading}
          />
        )}

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
                <Box> "Add Image"</Box>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </Stack>
            </DialogTitle>
            <SettingForm
              typeSelect={addType}
              onClick={handleButtonClick}
              initialData={singleData}
            />
          </Dialog>
        ) : null}

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
                    {searchList?.data && (
                      <SelectField
                        name="value"
                        control={control}
                        label="Product Name"
                        Controller={Controller}
                        data={searchList?.data}
                        error={errors?.value?.message}

                        // disabled={type === "edit" && true}
                      />
                    )}
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
}

export default Settings;
