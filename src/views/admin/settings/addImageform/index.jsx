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
import React, { useEffect, useRef, useState } from "react";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import ImageUploadComponent from "../../../../components/reusableFormFields/ImageUpload";
import {
  settingImageAdd,
  settingImageData,
  settingImageEdit,
} from "../../../../redux/api/admin/settingService";
import { authEndPoints } from "../../../../helpers/endpoints";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";

const SettingForm = (props, disabled) => {
  const { onClick, initialData = null, typeSelect } = props;
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [type, setType] = React.useState("");

  const initialValue = useSelector(
    (state) => state?.adminSetting?.settingImageData?.data?.data
  );

  const imageUrl = import.meta.env.VITE_APP_IMG_URL;

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
    defaultValues: typeSelect === "add" ? {} : initialValue,
    mode: "onChange",
  });

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleAddProduct = async (values) => {
    const parameters = {
      url: `${authEndPoints.setting.imageSettingAdd}`,
      data: values,
    };
    try {
      const response = await dispatch(settingImageAdd(parameters)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const handleEditProduct = async (values) => {
    console.log(values);
    const parameters = {
      url: `${authEndPoints.setting.imageSettingEdit(initialValue.id)}`,
      data: values,
    };
    try {
      const response = await dispatch(settingImageEdit(parameters)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };
  const viewSettingImage = async () => {
    const parameters = {
      url: `${authEndPoints.setting.imageView(initialData)}`,
    };
    try {
      const res = await dispatch(settingImageData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };
  useEffect(() => {
    if (typeSelect === "edit") {
      viewSettingImage();
    }
  }, [type]);

  useEffect(() => {
    if (typeSelect !== "add") {
      if (initialValue) {
        reset(initialValue);
      } else {
        reset();
      }
    } else {
      reset();
    }
  }, [initialValue]);
  return (
    <Box sx={{ mx: 2 }}>
      {/* <FormLoader /> */}

      <form
        onSubmit={
          typeSelect === "add"
            ? handleSubmit(handleAddProduct)
            : handleSubmit(handleEditProduct)
        }
      >
        {/* <form onSubmit={handleSubmit(handleAddProduct)}> */}
        <Box sx={{ mx: 2 }}>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="url"
                control={control}
                Controller={Controller}
                label="URL"
                error={errors?.url?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={6} direction={"column"}>
              {/* <Select
                fullWidth
                variant="outlined"
                size="medium"
                value={type}
                onChange={handleChangeType}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                name="type"
                style={{ fontSize: "14px", color: "#9E9E9E" }}
              >
                <MenuItem value="" disabled>
                  Select Banner Type
                </MenuItem>
                <MenuItem value="top">Top</MenuItem>
                <MenuItem value="bottom">Bottom</MenuItem>
              </Select> */}
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <>
                    {" "}
                    <InputLabel
                      id="type-label"
                      sx={{ fontSize: "13px", mb: 1 }}
                    >
                      Banner Type
                    </InputLabel>
                    <Select
                      fullWidth
                      variant="outlined"
                      size="medium"
                      {...field} // Spread the field props
                      IconComponent={KeyboardArrowDownIcon}
                      displayEmpty
                      style={{ fontSize: "13px", color: "#9E9E9E" }}
                      className="image-edit-content"
                    >
                      <MenuItem value="" disabled>
                        Select Banner Type
                      </MenuItem>
                      <MenuItem value="top">Top</MenuItem>
                      <MenuItem value="bottom">Bottom</MenuItem>
                    </Select>
                  </>
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
            <Grid item xs={12} md={12} className="address-employee">
              <ImageUploadComponent
                control={control}
                Controller={Controller}
                name="image"
                label=" Image"
                watch={watch}
                setValue={setValue}
              />
            </Grid>
          </Grid>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
            sx={{ p: 3 }}
          >
            <LoadingButton
              loadingPosition="center"
              loading={isSubmitting}
              variant="contained"
              type="submit"
              className="submitBtnn"
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </form>
    </Box>
  );
};

export default SettingForm;
