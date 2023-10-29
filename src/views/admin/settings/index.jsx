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
import { Editor } from "@tinymce/tinymce-react";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import ImageUploadComponent from "../../../components/reusableFormFields/ImageUpload";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { authEndPoints } from "../../../helpers/endpoints";
import {
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Settings() {
  const dispatch = useDispatch();
  const [valueData, setValueData] = useState("1");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const editorRef = useRef(null);
  const [delid, setDelId] = useState(null);
  const [addType, setAddType] = useState(null);
  const [singleData, setSingleData] = useState(null);

  const [open, setOpen] = useState(false);
  const imageData = useSelector(
    (state) => state?.adminSetting?.settingImageView
  );
  const imageUrl = process.env.REACT_APP_IMG_URL;

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
    setAddType("add");
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
  const handleButtonClick = async () => {
    handleClose(); // Call handleClose to close the form
    await settingImageDataView(); // Call handleAddDirectory to add directory data
  };

  useEffect(() => {
    settingImageDataView();
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
                  <Tab label="Item Three" value="3" sx={{ color: "#951e76" }} />
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
                <Editor
                  apiKey="your-api-key"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>Online Document Editor.</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins:
                      "powerpaste casechange searchreplace autolink directionality advcode visualblocks visualchars image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker editimage help formatpainter permanentpen charmap tinycomments linkchecker emoticons advtable export print autosave",
                    toolbar:
                      "undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image addcomment showcomments  | alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent | removeformat",
                    height: "700px",
                    toolbar_sticky: true,
                    icons: "thin",
                    skin: "material-classic",
                    icons: "material",
                    content_style: "material-classic",
                  }}
                />
                <button onClick={log}>Log editor content</button>
              </TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
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
      </Box>
    </Box>
  );
}

export default Settings;
