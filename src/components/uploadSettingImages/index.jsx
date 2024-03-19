import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Controller, get, useFieldArray, useForm } from "react-hook-form";

import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";

import { useDebounce } from "use-debounce";
import SettingForm from "../../views/admin/settings/addImageform";
import TopBreaccrumb from "../TopBreadcrumb";
import { authEndPoints } from "../../helpers/endpoints";
import {
  settingImageDelete,
  settingImageView,
} from "../../redux/api/admin/settingService";
import { errorAlert, successAlert } from "../../helpers/globalFunctions";
import DeleteModal from "../deleteModal";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploadSettingImages = () => {
  const dispatch = useDispatch();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [delid, setDelId] = useState(null);

  const [addType, setAddType] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [dataListFeature, setDataListFeature] = useState(null);

  const [open, setOpen] = useState(false);

  const [searchList, setSerachList] = useState({
    cateLists: [],
  });

  const [searchKey, setSearchKey] = useState("");
  const [searchValue] = useDebounce(searchKey, 1000);
  const imageData = useSelector(
    (state) => state?.adminSetting?.settingImageView
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
        <TopBreaccrumb title={"Upload Images"} to={`/admin/dashboard`} />
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
                  <Button className="AddBtn" onClick={handleClickOpen}>
                    Add
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <TableContainer
              className="rolesPageTable"
              style={{ marginBottom: "20px" }}
            >
              <Table
                size="small"
                aria-label="a dense table"
                className="order-table-list"
              >
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
                        <img src={imageUrl + item.image} width="200px"></img>
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
          </Box>
        </Stack>

        {deleteModalOpen && (
          <DeleteModal
            open={deleteModalOpen}
            close={() => deleteDirectoryModalClose()}
            title={"Delete Product"}
            content={"Are you sure want to delete this Image?"}
            submit={delteApiFn}
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
                <Box>{addType === "edit" ? "Edit Image" : "Add Image"}</Box>
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
};

export default UploadSettingImages;
