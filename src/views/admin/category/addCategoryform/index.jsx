import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authEndPoints } from "../../../../helpers/endpoints";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { categoryForm } from "../../../../helpers/validate";
import {
  addCategoryData,
  editCategoryData,
  viewCategoryData,
} from "../../../../redux/api/admin/categoryService";
import { commonListData } from "../../../../redux/api/admin/productService";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import ImageUploadComponent from "../../../../components/reusableFormFields/ImageUpload";
import SelectField from "../../../../components/reusableFormFields/selectField";
import FormLoader from "../../../../components/formLoader";

const AddCategoryForm = (props, disabled) => {
  const { onClick, initialData = null, type } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [adminsrole, setadminsRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  const initialvalue = useSelector(
    (state) => state?.adminCategory?.viewCategory?.data?.data
  );
  console.log(initialvalue);

  const formLoading = useSelector(
    (state) => state?.adminCategory?.viewCategory?.loading
  );
  const [essential, setEssential] = useState({
    cateLists: [],
  });
  console.log(essential, "essential");

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
    defaultValues: type === "add" ? {} : initialvalue,
    resolver: yupResolver(categoryForm),
    mode: "onChange",
  });

  // Add Directory Api
  const handleAddCategory = async (values) => {
    console.log(values);

    const parameters = {
      url: `${authEndPoints.category.categoryAdd}`,
      data: values,
    };
    try {
      const response = await dispatch(addCategoryData(parameters)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const handleEditCategory = async (values) => {
    const parameters = {
      url: `${authEndPoints.category.editCategory(initialvalue?.id)}`,
      data: values,
    };
    try {
      const response = await dispatch(editCategoryData(parameters)).unwrap();
      onClick();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  // view product
  const viewCategoryList = async () => {
    const parameters = {
      url: `${authEndPoints.category.categoryView(initialData)}`,
    };
    try {
      const res = await dispatch(viewCategoryData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  //Essential Api
  const essentialListApi = async () => {
    const value = "category";
    const parameters = {
      url: `${authEndPoints.product.listCommon(value)}`,
    };
    try {
      const response = await dispatch(commonListData(parameters)).unwrap();
      setEssential(response.data);
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // delete image
  const handleDeleteImage = () => {
    setValue("image", null);
    setImages(null);
  };

  useEffect(() => {
    essentialListApi();
  }, []);

  useEffect(() => {
    if (initialData) {
      const Img = initialData.image ? initialData.image : "";
      setImages(Img);
    }
  }, []);

  useEffect(() => {
    if (type === "edit") {
      viewCategoryList();
    }
  }, [type]);

  useEffect(() => {
    if (type !== "add") {
      if (initialvalue) {
        // const { date, start_time, end_time, created_by, created_at, ...others } = initialValue;
        // const prevData = {
        // 	...others,
        // 	date: dayjs(date, "YYYY-MM-DD"),
        // 	start_time: dayjs(start_time, "hh:mm A"),
        // 	end_time: dayjs(end_time, "hh:mm A"),
        // };
        reset(initialvalue);
      } else {
        reset();
      }
    } else {
      reset();
    }
  }, [initialvalue]);

  return (
    <Box sx={{ mx: 2 }}>
      {formLoading ? (
        <FormLoader />
      ) : (
        <form
          onSubmit={
            type === "add"
              ? handleSubmit(handleAddCategory)
              : handleSubmit(handleEditCategory)
          }
        >
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="label"
                control={control}
                Controller={Controller}
                label="Name"
                error={errors?.label?.message}
              />
            </Grid>
          </Grid>

          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              {essential?.category && (
                <SelectField
                  name="parent_id"
                  control={control}
                  label="Category"
                  Controller={Controller}
                  data={essential?.category}
                  error={errors?.category?.message}
                  // disabled={type === "edit" && true}
                />
              )}
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12} className="address-employee">
              <ImageUploadComponent
                control={control}
                Controller={Controller}
                name="category_image"
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
        </form>
      )}
    </Box>
  );
};

export default AddCategoryForm;
