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
  addMetricData,
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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function MetricForm({ handleClose, setMetricData, onClick }) {
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
    // defaultValues: type === "add" ? {} : initialvalue,
    // resolver: yupResolver(productForm),
    mode: "onChange",
  });

  const handleFormSubmit = async (values) => {
    const parameters = {
      url: `${authEndPoints.product.metricAdd}`,
      data: values,
    };

    try {
      const response = await dispatch(addMetricData(parameters)).unwrap();
      successAlert(response.message);
      handleClose();
      onClick();
    } catch (error) {
      errorAlert(error.error);
    }
  };

  return (
    // <Box>
    //   <Box px={3}>
    <Box sx={{ mx: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={5} sx={{ mb: 2 }}>
          <Grid item xs={6} direction={"column"}>
            <TextFormField
              name="metric"
              control={control}
              Controller={Controller}
              label="Name"
              error={errors?.metric?.message}
            />
          </Grid>
        </Grid>
        <Button type="submit">save</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </form>
    </Box>
    //   </Box>
    // </Box>
  );
}

export default MetricForm;
