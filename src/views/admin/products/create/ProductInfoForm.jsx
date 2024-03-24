/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import Slide from "@mui/material/Slide";
import FormLoader from "../../../../components/formLoader";
import TextFormField from "../../../../components/reusableFormFields/TextField";
import SelectField from "../../../../components/reusableFormFields/selectField";
import ImageUploadComponent from "../../../../components/reusableFormFields/ImageUpload";
import TextMultiField from "../../../../components/reusableFormFields/TextMultiField";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addProductData,
  commonListData,
  editProductData,
  viewProductData,
} from "../../../../redux/api/admin/productService";
import { productForm } from "../../../../helpers/validate";
import { LoadingButton } from "@mui/lab";
import { authEndPoints } from "../../../../helpers/endpoints";
import BenefitsForm from "./BenefitForm";
import NutritionalForm from "./NutritionalForm";
import { errorAlert, successAlert } from "../../../../helpers/globalFunctions";
import { useParams } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductInfoForm({
  handleNext,
  steps,
  activeStep,
  handleBack,
  setProductId,
  type,
}) {
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
  console.log(type);
  const url = window.location.href;
  const parts = url.split("/");
  const productName = parts[parts.length - 1];

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
    resolver: yupResolver(productForm),
    mode: "onChange",
  });

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

  // view product
  const viewProduct = async () => {
    const parameters = {
      url: `${authEndPoints.product.productView(productName)}`,
    };
    try {
      const res = await dispatch(viewProductData(parameters)).unwrap();
    } catch (errors) {
      errorAlert(errors?.error);
    }
  };

  // delete image
  const handleDeleteImage = () => {
    setValue("image", null);
    setImages(null);
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    const { weight, ...data } = values;
    const value = {
      ...data,
      weight: weight / 1000,
    };
    console.log(value);
    const parameters = {
      url: `${authEndPoints.product.productAdd}`,
      data: value,
    };
    try {
      const response = await dispatch(addProductData(parameters)).unwrap();
      successAlert(response.message);
      setProductId(response);
      handleNext();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  const handleEditProduct = async (values) => {
    console.log(values);
    const { weight, ...data } = values;
    const value = {
      ...data,
      weight: weight / 1000,
    };
    console.log(value);
    const parameters = {
      url: `${authEndPoints.product.editProduct(initialvalue?.id)}`,
      data: value,
    };
    console.log(parameters);
    try {
      const response = await dispatch(editProductData(parameters)).unwrap();
      successAlert(response.message);
    } catch (error) {
      errorAlert(error.error);
      console.log(errors);
    }
  };

  const handleNextButtonClick = () => {
    // Call the parent component's handleNext function to move to the next step
    handleNext();
  };

  useEffect(() => {
    if (productName) {
      const Img = productName.image ? productName.image : "";
      setImages(Img);
    }
  }, []);

  useEffect(() => {
    essentialListApi();
  }, []);

  useEffect(() => {
    if (type === "edit") {
      viewProduct();
    }
  }, [type]);

  useEffect(() => {
    if (type !== "add") {
      if (initialvalue) {
        const { weight, ...restOfValues } = initialvalue;
        const value = {
          ...restOfValues,
          weight: weight * 1000,
        };
        reset(value);
      } else {
        reset();
      }
    } else {
      reset();
    }
  }, [initialvalue]);

  return (
    // <Box>
    //   <Box px={3}>
    <Box sx={{ mx: 2 }}>
      {formLoading ? (
        <FormLoader />
      ) : (
        <form
          onSubmit={
            type === "add"
              ? handleSubmit(handleFormSubmit)
              : handleSubmit(handleEditProduct)
          }
        >
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="product_name"
                control={control}
                Controller={Controller}
                label="Name"
                error={errors?.product_name?.message}
              />
            </Grid>
            <Grid item xs={6}>
              {essential?.category && (
                <SelectField
                  name="category"
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

          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6} direction={"column"}>
              <TextFormField
                name="cost"
                control={control}
                Controller={Controller}
                label="Cost"
                error={errors?.cost?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextFormField
                name="weight"
                control={control}
                Controller={Controller}
                label="Weight In Grams"
                error={errors?.weight?.message}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <TextMultiField
                control={control}
                Controller={Controller}
                name="description"
                label="Description"
                error={errors?.description?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <ImageUploadComponent
                control={control}
                Controller={Controller}
                name="file_name"
                label=" Image"
                watch={watch}
                setValue={setValue}
              />
            </Grid>
          </Grid>

          {/* <Grid container spacing={5} sx={{ mb: 2 }}></Grid> */}
          <Box sx={{ mt: 5 }} display={"flex"} justifyContent={"flex-end"}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, background: "#951e76", color: "white" }}
              className="product-stepper-button"
            >
              Back
            </Button>
            {type === "edit" ? (
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                sx={{ background: "#951e76", color: "white" }}
                className="product-stepper-button1"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Update"}
              </LoadingButton>
            ) : (
              <LoadingButton
                loadingPosition="center"
                loading={isSubmitting}
                variant="contained"
                type="submit"
                sx={{ background: "#951e76", color: "white" }}
                className="product-stepper-button1"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Save"}
              </LoadingButton>
            )}

            {type === "edit" && (
              <Button
                variant="contained"
                onClick={handleNextButtonClick}
                sx={{ background: "#951e76", color: "white", ml: 2 }}
                className="product-stepper-button1"
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      )}
    </Box>
    //   </Box>
    // </Box>
  );
}

export default ProductInfoForm;
