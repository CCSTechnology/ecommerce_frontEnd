import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
  Typography,
  MenuItem,
  FormHelperText,
  Avatar,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Controller, get, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import TextFormField from "../reusableFormFields/TextField";
import FormLoader from "../formLoader";

const AddAddressForm = (props, disabled) => {
  const { onClick, initialData = null, type } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [adminsrole, setadminsRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  const initialvalue = useSelector(
    (state) => state?.adminProduct?.viewProduct?.data?.data?.product
  );

  const formLoading = useSelector(
    (state) => state?.adminProduct?.viewProduct?.loading
  );
  const [essential, setEssential] = useState({
    cateLists: [],
  });

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
    resolver: yupResolver(),
    mode: "onChange",
  });

  // const viewDirectory = async () => {
  // 	const parameters = {
  // 		url: `${authEndPoints.directory.viewDirectory(initialData?.id)}`,
  // 	};
  // 	try {
  // 		await dispatch(viewDirectoryData(parameters)).unwrap();
  // 	} catch (errors) {
  // 		errorAlert(errors?.error);
  // 	}
  // };

  // Add Directory Api
  const handleAddProduct = async (values) => {
    // console.log(values);
    // const parameters = {
    //   url: `${authEndPoints.product.productAdd}`,
    //   data: values,
    // };
    // try {
    //   const response = await dispatch(addProductData(parameters)).unwrap();
    //   onClick();
    //   successAlert(response.message);
    // } catch (error) {
    //   errorAlert(error.error);
    //   console.log(errors);
    // }
  };

  const handleEditProduct = async (values) => {
    // const parameters = {
    //   url: `${authEndPoints.product.editProduct(initialvalue?.id)}`,
    //   data: values,
    // };
    // try {
    //   const response = await dispatch(editProductData(parameters)).unwrap();
    //   onClick();
    //   successAlert(response.message);
    // } catch (error) {
    //   errorAlert(error.error);
    //   console.log(errors);
    // }
  };

  // view product
  //   const viewProduct = async () => {
  //     const parameters = {
  //       url: `${authEndPoints.product.productView(initialData)}`,
  //     };
  //     try {
  //       const res = await dispatch(viewProductData(parameters)).unwrap();
  //     } catch (errors) {
  //       errorAlert(errors?.error);
  //     }
  //   };

  //Essential Api
  //   const essentialListApi = async () => {
  //     const value = "category";
  //     const parameters = {
  //       url: `${authEndPoints.product.listCommon(value)}`,
  //     };
  //     try {
  //       const response = await dispatch(commonListData(parameters)).unwrap();
  //       setEssential(response.data);
  //     } catch (errors) {
  //       errorAlert(errors?.error);
  //     }
  //   };

  // visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // delete image
  const handleDeleteImage = () => {
    setValue("image", null);
    setImages(null);
  };

  //   useEffect(() => {
  //     essentialListApi();
  //   }, []);

  //   useEffect(() => {
  //     if (initialData) {
  //       const Img = initialData.image ? initialData.image : "";
  //       setImages(Img);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     if (type === "edit") {
  //       viewProduct();
  //     }
  //   }, [type]);

  //   useEffect(() => {
  //     if (type !== "add") {
  //       if (initialvalue) {

  //         reset(initialvalue);
  //       } else {
  //         reset();
  //       }
  //     } else {
  //       reset();
  //     }
  //   }, [initialvalue]);

  return (
    <Box sx={{ mx: 2 }}>
      {formLoading ? (
        <FormLoader />
      ) : (
        <form
          onSubmit={
            type === "add"
              ? handleSubmit(handleAddProduct)
              : handleSubmit(handleEditProduct)
          }
        >
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="line1"
                control={control}
                Controller={Controller}
                label="Line1"
                error={errors?.line1?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="street_name"
                control={control}
                Controller={Controller}
                label="Street Name"
                error={errors?.line1?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="city"
                control={control}
                Controller={Controller}
                label="City"
                error={errors?.city?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="state"
                control={control}
                Controller={Controller}
                label="State"
                error={errors?.state?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="country"
                control={control}
                Controller={Controller}
                label="Country"
                error={errors?.country?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="zipcode"
                control={control}
                Controller={Controller}
                label="Zipcode"
                error={errors?.zipcode?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="address"
                control={control}
                Controller={Controller}
                label="Address"
                error={errors?.address?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="zipcode"
                control={control}
                Controller={Controller}
                label="Zipcode"
                error={errors?.zipcode?.message}
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

export default AddAddressForm;
